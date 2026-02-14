import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    subaccountId: string;
  }>;
};

const Pipelines = async ({ params }: Props) => {
  const { subaccountId } = await params;
  const pipelineExists = await db.pipeline.findFirst({
    where: {
      subAccountId: subaccountId,
    },
  });
  if (pipelineExists) {
    return redirect(
      `/subaccount/${subaccountId}/pipelines/${pipelineExists?.id}`,
    );
  }

  return <div>Pipelines</div>;
};

export default Pipelines;
