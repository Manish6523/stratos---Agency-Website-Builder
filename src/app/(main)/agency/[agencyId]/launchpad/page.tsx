import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{
    agencyId: string;
  }>;
  searchParams: Promise<{ code: string }>;
};

const LaunchPadPage = async ({ params, searchParams }: Props) => {
  const { agencyId } = await params;
  const { code } = await searchParams;

  const agencyDetails = await db.agency.findUnique({
    where: { id: agencyId },
  });

  if (!agencyDetails) return null;

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-200">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Let's get started!</CardTitle>
            <CardDescription>
              Follow the steps below to get your account setup
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Step 1: Mobile Shortcut */}
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src="/appstore.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Save the website as a shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>

            {/* Step 2: Stripe Connection */}
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src="/stripelogo.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>
                  Connect your stripe account to accept payments and see your
                  dashboard.
                </p>
              </div>
              <Button>Connect</Button>
            </div>

            {/* Step 3: Business Details */}
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src={agencyDetails.agencyLogo}
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Fill in all your business details</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={50}
                  className="text-primary p-2 shrink-0"
                />
              ) : (
                <Link href={`/agency/${agencyId}/settings`}>
                  <Button>Start</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPadPage;
