import BlurPage from "@/components/global/blur-page";
import { db } from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLanesWithTicketAndTags, getPipelineDetails, updateLanesOrder, updateTicketsOrder } from "@/lib/queries";
import { LaneDetail } from "@/lib/types";
import { redirect } from "next/navigation";
import React from "react";
import PipelineInfoBar from "../_components/PipelineInfoBar";
import PipelineView from "../_components/PipelineView";
import PipelineSettings from "../_components/PipelineSettings";

type Props = {
  params: Promise<{
    subaccountId: string;
    pipelineId: string;
  }>;
};

const PipelineIdPage = async ({ params }: Props) => {
  const { subaccountId, pipelineId } = await params;
  const pipelineDetails = await getPipelineDetails(pipelineId);

  if (!pipelineDetails) {
    return redirect(`/subaccount/${subaccountId}/pipelines`);
  }

  const pipelines = await db.pipeline.findMany({
    where: {
      subAccountId: subaccountId,
    },
  });

  const lanes = (await getLanesWithTicketAndTags(pipelineId)) as LaneDetail[];

  // Convert Prisma Decimal `value` fields to plain numbers and deep-clone objects
  const mapTicket = (t: any) => ({
    ...t,
    value: t?.value != null ? (typeof t.value === 'object' && typeof t.value.toNumber === 'function' ? t.value.toNumber() : Number(t.value)) : t.value,
    Assigned: t?.Assigned ? { ...t.Assigned } : t.Assigned,
    Customer: t?.Customer ? { ...t.Customer } : t.Customer,
    Tags: t?.Tags ? t.Tags.map((tag: any) => ({ ...tag })) : t.Tags,
    createdAt: t?.createdAt ? new Date(t.createdAt) : t?.createdAt,
    updatedAt: t?.updatedAt ? new Date(t.updatedAt) : t?.updatedAt,
  });

  const sanitizedLanes = lanes.map((lane: any) => ({
    ...lane,
    Tickets: lane?.Tickets ? lane.Tickets.map(mapTicket) : [],
  })) as LaneDetail[];

  const sanitizedPipelineDetails = pipelineDetails ? { ...pipelineDetails } : pipelineDetails;

  return (
    <BlurPage>
      <Tabs className="w-full" defaultValue="view">
        <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
          <PipelineInfoBar
            pipelineId={pipelineId}
            subaccountId={subaccountId}
            pipelines={pipelines}
          />
          <div>
            <TabsTrigger value="view">Pipeline View</TabsTrigger>

            <TabsTrigger value="settings">Settings</TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="view">
          <PipelineView
            lanes={sanitizedLanes}
            pipelineDetails={sanitizedPipelineDetails}
            pipelineId={pipelineId}
            subaccountId={subaccountId}
            updateLanesOrder={updateLanesOrder}
            updateTicketsOrder={updateTicketsOrder}
          />
        </TabsContent>
    
        <TabsContent value="settings">
          <PipelineSettings
            pipelineId={pipelineId}
            subaccountId={subaccountId}
            pipelines={pipelines}
          />
        </TabsContent>
      </Tabs>
    </BlurPage>
  );
};

export default PipelineIdPage;
