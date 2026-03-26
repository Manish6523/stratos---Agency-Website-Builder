import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { XCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifyPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const token = params.token;

  // 1. Check for token
  if (!token) {
    return (
      <VerifyLayout>
        <StatusIcon type="error" />
        <Header 
          title="Invalid Link" 
          description="This invitation link is incomplete or broken. Please contact your administrator." 
        />
        <FooterLink href="/" label="Back to Home" />
      </VerifyLayout>
    );
  }

  // 2. Fetch invitation
  const invitation = await db.invitation.findUnique({
    where: { id: token },
    include: { Agency: true },
  });

  // 3. Handle Expired/Missing Invitation
  if (!invitation || invitation.status !== "PENDING") {
    return (
      <VerifyLayout>
        <StatusIcon type="warning" />
        <Header 
          title="Link Expired" 
          description="This invitation has already been used or revoked." 
        />
        <FooterLink href="/agency/sign-in" label="Sign In to Dashboard" />
      </VerifyLayout>
    );
  }

  const user = await currentUser();

  // 4. Handle Unauthenticated (Show Invite Info)
  if (!user) {
    const redirectPath = encodeURIComponent(`/verify?token=${token}`);
    return (
      <VerifyLayout>
        <StatusIcon type="info" />
        <Header 
          title="You're Invited!" 
          description={
            <>
              <span className="font-semibold text-slate-900">{invitation.Agency.name}</span> has invited you to join as a{" "}
              <span className="text-primary font-medium capitalize">
                {invitation.role.toLowerCase().replace(/_/g, " ")}
              </span>.
            </>
          } 
        />
        <div className="w-full space-y-3 mt-8">
          <Link 
            href={`/agency/sign-up?redirect_url=${redirectPath}`} 
            className={cn(buttonVariants(), "w-full h-12 text-md bg-[#C2A878] hover:bg-[#b39764]")}
          >
            Create Account
          </Link>
          <Link 
            href={`/agency/sign-in?redirect_url=${redirectPath}`} 
            className={cn(buttonVariants({ variant: "outline" }), "w-full h-12 text-md")}
          >
            Sign In
          </Link>
        </div>
      </VerifyLayout>
    );
  }

  // 5. Process Acceptance
  try {
    const existingUser = await db.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    });

    if (existingUser?.agencyId) {
      return (
        <VerifyLayout>
          <StatusIcon type="warning" />
          <Header title="Already Member" description="You are already associated with an agency dashboard." />
          <FooterLink href="/agency" label="Go to Dashboard" />
        </VerifyLayout>
      );
    }

    const tx: any[] = [
      db.user.upsert({
        where: { email: user.emailAddresses[0].emailAddress },
        update: { agencyId: invitation.agencyId, role: invitation.role },
        create: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
          avatarUrl: user.imageUrl,
          agencyId: invitation.agencyId,
          role: invitation.role,
        },
      }),
      db.invitation.delete({ where: { id: invitation.id } }),
      db.notification.create({
        data: {
          notification: `${user.firstName || "A user"} joined the team`,
          userId: user.id,
          agencyId: invitation.agencyId,
        },
      }),
    ];

    if (invitation.subAccountId) {
      tx.push(
        db.permissions.create({
          data: {
            access: true,
            email: user.emailAddresses[0].emailAddress,
            subAccountId: invitation.subAccountId,
          },
        })
      );
    }

    await db.$transaction(tx);

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: { role: invitation.role },
    });

  } catch (error) {
    console.error("Verification Error:", error);
    return (
      <VerifyLayout>
        <StatusIcon type="error" />
        <Header title="Verification Failed" description="We couldn't process your request. Please try again later." />
        <FooterLink href={`/verify?token=${token}`} label="Retry" />
      </VerifyLayout>
    );
  }

  redirect(`/agency`);
}

// --- UI Components ---

function VerifyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50/50 p-6 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      <Card className="w-full max-w-[420px] shadow-2xl border-none bg-white/90 backdrop-blur-md relative z-10">
        <CardContent className="flex flex-col items-center text-center p-12">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

function StatusIcon({ type }: { type: "error" | "warning" | "info" | "success" }) {
  const variants = {
    error: "bg-red-50 text-red-500 ring-red-100/50",
    warning: "bg-amber-50 text-amber-500 ring-amber-100/50",
    success: "bg-emerald-50 text-emerald-500 ring-emerald-100/50",
    info: "bg-blue-50 text-blue-500 ring-blue-100/50",
  };

  const Icon = {
    error: XCircle,
    warning: AlertTriangle,
    success: CheckCircle2,
    info: Info,
  }[type];

  return (
    <div className={cn("flex h-20 w-20 items-center justify-center rounded-full ring-[12px] mb-10", variants[type])}>
      <Icon className="h-10 w-10" strokeWidth={1.5} />
    </div>
  );
}

function Header({ title, description }: { title: string; description: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="text-lg leading-relaxed text-slate-500 max-w-[280px] mx-auto">
        {description}
      </p>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="w-full pt-10">
      <Link 
        href={href} 
        className={cn(
          buttonVariants({ variant: "default" }), 
          "w-full h-12 text-md font-medium bg-[#C2A878] hover:bg-[#b39764] text-white shadow-lg shadow-[#C2A878]/20 transition-all active:scale-[0.98]"
        )}
      >
        {label}
      </Link>
    </div>
  );
}