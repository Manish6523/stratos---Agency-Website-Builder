import BlurPage from "@/components/global/blur-page";
import PipelineValue from "@/components/global/pipeline-value";
import SubaccountFunnelChart from "@/components/global/subaccount-funnel-chart";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  Contact2,
  DollarSign,
  Inbox,
  LayoutGrid,
  Users,
} from "lucide-react";
import React from "react";
import { formatDate } from "date-fns/format";

type Props = {
  params: Promise<{ subaccountId: string }>;
  searchParams: Promise<{ code: string }>;
};

const SubaccountPageId = async ({ params }: Props) => {
  const param = await params;

  const currency = "₹";

  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: param.subaccountId,
    },
  });

  const currentYear = new Date().getFullYear();

  if (!subaccountDetails) return;

  // ── Dynamic data queries ──────────────────────────────────

  const [
    funnels,
    contacts,
    tickets,
    formSubmissions,
    pipelines,
  ] = await Promise.all([
    db.funnel.findMany({
      where: { subAccountId: param.subaccountId },
      include: { FunnelPages: true },
    }),
    db.contact.findMany({
      where: { subAccountId: param.subaccountId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    db.ticket.findMany({
      where: {
        Lane: {
          Pipeline: {
            subAccountId: param.subaccountId,
          },
        },
      },
      include: { Customer: true, Lane: true },
      orderBy: { createdAt: "desc" },
    }),
    db.formSubmission.findMany({
      where: { subAccountId: param.subaccountId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    db.pipeline.count({
      where: { subAccountId: param.subaccountId },
    }),
  ]);

  // ── Computed metrics ──────────────────────────────────────

  const totalTicketValue = tickets.reduce(
    (sum, t) => sum + (Number(t.value) || 0),
    0
  );

  const closedTickets = tickets.filter(
    (t) => t.Lane?.name?.toLowerCase().includes("close") ||
      t.Lane?.name?.toLowerCase().includes("won") ||
      t.Lane?.name?.toLowerCase().includes("done") ||
      t.Lane?.name?.toLowerCase().includes("complete")
  );
  const closedValue = closedTickets.reduce(
    (sum, t) => sum + (Number(t.value) || 0),
    0
  );

  const openTickets = tickets.filter(
    (t) => !closedTickets.includes(t)
  );
  const potentialValue = openTickets.reduce(
    (sum, t) => sum + (Number(t.value) || 0),
    0
  );

  const totalContacts = await db.contact.count({
    where: { subAccountId: param.subaccountId },
  });

  const totalSubmissions = await db.formSubmission.count({
    where: { subAccountId: param.subaccountId },
  });

  const funnelPerformanceMetrics = funnels.map((funnel) => ({
    ...funnel,
    totalFunnelVisits: funnel.FunnelPages.reduce(
      (total, page) => total + page.visits,
      0
    ),
  }));

  const totalPageVisits = funnelPerformanceMetrics.reduce(
    (sum, f) => sum + f.totalFunnelVisits,
    0
  );

  // ── Merge recent activity (contacts + submissions) ────────

  type ActivityItem = {
    id: string;
    type: "contact" | "submission";
    name: string;
    email: string;
    createdAt: Date;
    source?: string | null;
  };

  const recentActivity: ActivityItem[] = [
    ...contacts.map((c) => ({
      id: c.id,
      type: "contact" as const,
      name: c.name,
      email: c.email,
      createdAt: c.createdAt,
      source: null,
    })),
    ...formSubmissions.map((s) => ({
      id: s.id,
      type: "submission" as const,
      name: s.name,
      email: s.email,
      createdAt: s.createdAt,
      source: s.source,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <BlurPage>
      <div className="relative h-full">
        <div className="flex flex-col gap-4 pb-6">
          {/* ── Top Stats Row ─────────────────────── */}
          <div className="flex gap-4 flex-col xl:flex-row!">
            <Card className="flex-1 relative">
              <CardHeader>
                <CardDescription>Closed Revenue</CardDescription>
                <CardTitle className="text-4xl">
                  {closedValue
                    ? `${currency}${closedValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : `${currency}0.00`}
                </CardTitle>
                <small className="text-xs text-muted-foreground">
                  From {closedTickets.length} closed ticket{closedTickets.length !== 1 ? "s" : ""}
                </small>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Total value of tickets in closed/won pipeline stages.
              </CardContent>
              <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <Card className="flex-1 relative">
              <CardHeader>
                <CardDescription>Pipeline Value</CardDescription>
                <CardTitle className="text-4xl">
                  {potentialValue
                    ? `${currency}${potentialValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : `${currency}0.00`}
                </CardTitle>
                <small className="text-xs text-muted-foreground">
                  From {openTickets.length} open ticket{openTickets.length !== 1 ? "s" : ""}
                </small>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Total potential revenue from active pipeline tickets.
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <PipelineValue subaccountId={param.subaccountId} />
          </div>

          {/* ── Quick Stats Row ───────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm font-medium">Contacts</CardDescription>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalContacts}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm font-medium">Submissions</CardDescription>
                <Inbox className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSubmissions}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm font-medium">Funnels</CardDescription>
                <LayoutGrid className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{funnels.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm font-medium">Page Visits</CardDescription>
                <Contact2 className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPageVisits.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* ── Charts Row ────────────────────────── */}
          <div className="flex gap-4 flex-col xl:flex-row!">
            <Card className="relative">
              <CardHeader>
                <CardDescription>Funnel Performance</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground flex flex-col gap-12 justify-between">
                <SubaccountFunnelChart data={funnelPerformanceMetrics} />
                <div className="lg:w-[150px]">
                  Total page visits across all funnels. Hover over to get more
                  details on funnel page performance.
                </div>
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>

            {/* ── Ticket Breakdown ────────────────── */}
            <Card className="p-4 flex-1">
              <CardHeader>
                <CardTitle>Ticket Breakdown</CardTitle>
                <CardDescription>
                  {tickets.length} total ticket{tickets.length !== 1 ? "s" : ""} across {pipelines} pipeline{pipelines !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tickets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <DollarSign className="size-10 mb-3 opacity-30" />
                    <p className="text-sm">No tickets yet. Create your first pipeline ticket to see data here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Value</span>
                      <span className="font-semibold">
                        {currency}{totalTicketValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Closed / Won</span>
                      <span className="font-semibold text-emerald-600">
                        {closedTickets.length} ticket{closedTickets.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">In Progress</span>
                      <span className="font-semibold text-blue-600">
                        {openTickets.length} ticket{openTickets.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {totalTicketValue > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                          <span>Closed rate</span>
                          <span>
                            {tickets.length > 0
                              ? Math.round((closedTickets.length / tickets.length) * 100)
                              : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all"
                            style={{
                              width: `${tickets.length > 0 ? (closedTickets.length / tickets.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── Recent Activity Row ───────────────── */}
          <div className="flex gap-4 xl:flex-row! flex-col">
            <Card className="p-4 flex-1 h-[450px] overflow-scroll relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Recent Activity
                  {recentActivity.length > 0 && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      {recentActivity.length} latest
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <Table>
                <TableHeader className="sticky! top-0!">
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead className="w-[250px]">Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="font-medium truncate">
                  {recentActivity.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground py-8"
                      >
                        No recent activity. Contacts and form submissions will appear here.
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentActivity.map((item) => (
                      <TableRow key={`${item.type}-${item.id}`}>
                        <TableCell>
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {item.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.email}
                        </TableCell>
                        <TableCell>
                          {item.type === "contact" ? (
                            <Badge variant="secondary" className="text-xs">Contact</Badge>
                          ) : (
                            <Badge className="bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20 text-xs">
                              Submission
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {formatDate(item.createdAt, "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </BlurPage>
  );
};

export default SubaccountPageId;
