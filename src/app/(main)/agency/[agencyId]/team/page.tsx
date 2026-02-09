import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import DataTable from "./data-table";
import { PlusCircle } from "lucide-react";
import { columns } from "./columns";
import SendInvitation from "@/components/forms/send-invitation";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const TeamPage = async ({ params }: Props) => {
  const { agencyId } = await params;
  const authUser = await currentUser();

  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });

  if (!authUser) return null;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <PlusCircle size={15} />
          Add Team Member
        </>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      filterValue="name"
      columns={columns}
      data={teamMembers}
    ></DataTable>
  );
};

export default TeamPage;
