import { getFunnel } from "@/lib/queries";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import React from 'react'
import BlurPage from "@/components/global/blur-page";
import FunnelSteps from "./_components/funnel-step";
import FunnelSettings from "./_components/funnel-setting";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ funnelId: string; subaccountId: string }>;
}

export default async function FunnelPage({ params }: Props) {
  const {funnelId, subaccountId} = await params
  const funnelPages = await getFunnel(funnelId);

  if (!funnelPages) return redirect(`/subaccount/${subaccountId}/funnels`)

  return (
    <BlurPage>
      <Link
        href={`/subaccount/${subaccountId}/funnels`}
        className="flex items-center gap-2 mb-4 text-muted-foreground"
      >
        <ArrowLeft className="size-4"/>
        Back
      </Link>
      <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
      <Tabs
        defaultValue="steps"
        className="w-full"
      >
        <TabsList className="w-full flex justify-between">
          <TabsTrigger className="cursor-pointer" value="steps">Steps</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps
            funnel={funnelPages}
            subaccountId={subaccountId}
            pages={funnelPages.FunnelPages}
            funnelId={funnelId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
            subaccountId={subaccountId}
            defaultData={funnelPages}
          />
        </TabsContent>
      </Tabs>
    </BlurPage>
  )
}
