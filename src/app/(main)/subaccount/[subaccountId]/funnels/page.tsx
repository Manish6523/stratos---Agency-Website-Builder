import React from "react";
import { PlusCircle } from "lucide-react";

import BlurPage from "@/components/global/blur-page";
import { constructMetadata } from "@/lib/utils";
import { getFunnels } from "@/lib/queries";
import FunnelsDataTable from "./data-table";
import { columns } from "./columns";
import FunnelDetails from "@/components/forms/funnel-details";

interface FunnelsPageProps {
  params: Promise<{
    subaccountId: string;
  }>;
}

const FunnelsPageProps: React.FC<FunnelsPageProps> = async ({ params }) => {
  const { subaccountId } = await params;
  const funnels = await getFunnels(subaccountId);

  if (!funnels) return null;

  return (
    <BlurPage>
      <FunnelsDataTable
        actionButtonText={
          <>
            <PlusCircle className="w-4 h-4" />
            Create Funnel
          </>
        }
        modalChildren={<FunnelDetails subAccountId={subaccountId} />}
        filterValue="name"
        columns={columns}
        data={funnels}
      />
    </BlurPage>
  );
};

export default FunnelsPageProps;

export const metadata = constructMetadata({
  title: "Funnels - Stratos",
});
