import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import {
  Contact,
  SubAccount,
  Ticket,
} from "../../../../../../generated/prisma";
import { formatDate } from "date-fns/format";
import React from "react";
import CraeteContactButton from "./_components/create-contact-button";
import BlurPage from "@/components/global/blur-page";

type Props = {
  params: Promise<{ subaccountId: string }>;
};

export default async function SubaccountContactsPage({ params }: Props) {
  const { subaccountId } = await params;
  type SubAccountWithContacts = SubAccount & {
    Contact: (Contact & { Ticket: Ticket[] })[];
  };

  const contacts = (await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },

    include: {
      Contact: {
        include: {
          Ticket: {
            select: {
              value: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  })) as SubAccountWithContacts;

  const allContacts = contacts.Contact;

  const formatTotal = (tickets: Ticket[]) => {
    if (!tickets || !tickets.length) return "₹0.00";
    const amt = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "INR",
    });

    const laneAmt = tickets.reduce(
      (sum, ticket) => sum + (Number(ticket?.value) || 0),
      0,
    );

    return amt.format(laneAmt);
  };
  return (
    <BlurPage>
      <h1 className="text-4xl md:hidden p-4">Contacts</h1>
      <CraeteContactButton subaccountId={subaccountId} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-50">Name</TableHead>
            <TableHead className="w-75">Email</TableHead>
            <TableHead className="w-50">Active</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {allContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage alt="@shadcn" />
                  <AvatarFallback className="bg-primary text-white">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>
                {formatTotal(contact.Ticket) === "₹0.00" ? (
                  <Badge variant={"destructive"}>Inactive</Badge>
                ) : (
                  <Badge className="bg-emerald-700">Active</Badge>
                )}
              </TableCell>
              <TableCell>
                {formatDate(contact.createdAt, "MM/dd/yyyy")}
              </TableCell>
              <TableCell className="text-right">
                {formatTotal(contact.Ticket)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BlurPage>
  );
}
