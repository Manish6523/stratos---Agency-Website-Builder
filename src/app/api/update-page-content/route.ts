import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const ADMIN_EMAIL = "ms5392363@gmail.com";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!user || userEmail !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { funnelPageId, content } = await req.json();

    if (!funnelPageId || !content) {
      return NextResponse.json(
        { error: "funnelPageId and content are required" },
        { status: 400 }
      );
    }

    // Validate that content is valid JSON
    try {
      JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "Content is not valid JSON" },
        { status: 400 }
      );
    }

    await db.funnelPage.update({
      where: { id: funnelPageId },
      data: { content },
    });

    const page = await db.funnelPage.findUnique({
      where: { id: funnelPageId },
      select: { funnelId: true, Funnel: { select: { subAccountId: true } } },
    });

    if (page?.Funnel?.subAccountId) {
      revalidatePath(
        `/subaccount/${page.Funnel.subAccountId}/funnels/${page.funnelId}/editor/${funnelPageId}`,
        "page"
      );
      revalidatePath(
        `/subaccount/${page.Funnel.subAccountId}/funnels/${page.funnelId}/editor/${funnelPageId}/code`,
        "page"
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating page content:", error);
    return NextResponse.json(
      { error: "Failed to update page content" },
      { status: 500 }
    );
  }
}
