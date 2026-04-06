"use client";

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
import { Badge } from "@/components/ui/badge";
import { FormSubmissionsList } from "@/lib/types";
import {
  Inbox,
  CalendarDays,
  Users,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Globe,
  Mail,
  User,
  Database,
  Braces,
  ListFilter,
} from "lucide-react";
import { formatDate } from "date-fns/format";
import { useState, Fragment } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  submissions: FormSubmissionsList;
  todayCount: number;
  uniqueContacts: number;
  activeForms: number;
  forms?: any[];
};

export default function SubmissionsTab({
  submissions,
  todayCount,
  uniqueContacts,
  activeForms,
  forms,
}: Props) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const stats = [
    {
      label: "Total Submissions",
      value: submissions.length,
      icon: Inbox,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Today",
      value: todayCount,
      icon: CalendarDays,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Unique Contacts",
      value: uniqueContacts,
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Active Forms",
      value: activeForms,
      icon: FileCheck,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
              <div className={cn(stat.bg, stat.color, "p-2 rounded-md")}>
                <stat.icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submissions Table */}
      <Card className="border-none shadow-sm">
        <CardHeader className="px-6">
          <CardTitle className="text-xl font-bold">Recent Submissions</CardTitle>
          <CardDescription>
            Management and details for all funnel form entries.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-muted/50 rounded-full p-6 mb-4">
                <Inbox className="size-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-medium">No submissions found</h3>
              <p className="text-muted-foreground max-w-xs text-sm mt-1">
                Submissions from your funnel contact forms will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="border-t">
              <Table>
                <TableHeader className="bg-muted/50 whitespace-nowrap">
                  <TableRow>
                    <TableHead className="font-semibold px-4 sm:px-6">Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Source</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => {
                    const isExpanded = expandedRow === submission.id;

                    // Safe parse helper
                    let parsedData = {};
                    try {
                      parsedData = submission.formData ? JSON.parse(submission.formData) : {};
                    } catch (e) {
                      parsedData = { error: "Could not parse form data" };
                    }

                    return (
                      <Fragment key={submission.id}>
                        <TableRow
                          className={cn(
                            "cursor-pointer transition-colors px-4 sm:px-6",
                            isExpanded ? "bg-muted/30" : "hover:bg-muted/50"
                          )}
                          onClick={() => setExpandedRow(isExpanded ? null : submission.id)}
                        >
                          <TableCell className="px-4 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 text-primary size-8 flex items-center justify-center rounded-full shrink-0">
                                <User className="size-4" />
                              </div>
                              <span className="font-semibold text-sm truncate max-w-[120px] sm:max-w-[200px]">
                                {submission.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Mail className="size-3.5" />
                              {submission.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            {submission.source ? (
                              <Badge
                                variant="outline"
                                className="font-medium bg-background gap-1 rounded-md py-0.5"
                              >
                                <Globe className="size-3" />
                                {submission.source}
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground italic">
                                Direct
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {formatDate(submission.createdAt, "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell className="text-right px-6">
                            {isExpanded ? (
                              <ChevronUp className="size-4 ml-auto text-primary" />
                            ) : (
                              <ChevronDown className="size-4 ml-auto text-muted-foreground" />
                            )}
                          </TableCell>
                        </TableRow>

                        {isExpanded && (
                          <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                            <TableCell colSpan={5} className="p-0">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Primary Info</h4>
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium">{submission.name}</p>
                                      <p className="text-sm text-muted-foreground">{submission.email}</p>
                                      <p className="text-xs text-muted-foreground mt-2">
                                        ID: <span className="font-mono">{submission.id}</span>
                                      </p>
                                    </div>
                                  </div>
                                  {submission.Contact && (
                                    <div>
                                      <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">CRM Contact</h4>
                                      <Badge variant="secondary" className="font-mono text-[10px]">
                                        {submission.Contact.id}
                                      </Badge>
                                    </div>
                                  )}
                                </div>

                                <div className="md:col-span-2">
                                  <Tabs defaultValue="formatted" className="w-full">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                                      <div className="flex items-center gap-2">
                                        <Database className="size-3.5 text-muted-foreground" />
                                        <h4 className="text-xs font-bold uppercase text-muted-foreground">Payload Data</h4>
                                      </div>
                                      <TabsList className="h-7 text-[10px] p-0.5">
                                        <TabsTrigger value="formatted" className="px-2 py-0.5 text-[10px] h-full gap-1">
                                          <ListFilter className="size-3" /> Formatted
                                        </TabsTrigger>
                                        <TabsTrigger value="raw" className="px-2 py-0.5 text-[10px] h-full gap-1">
                                          <Braces className="size-3" /> Raw JSON
                                        </TabsTrigger>
                                      </TabsList>
                                    </div>
                                    <TabsContent value="formatted" className="mt-0">
                                      <div className="bg-background rounded-lg border shadow-sm max-h-[200px] overflow-auto">
                                        <Table>
                                          <TableBody>
                                            {(() => {
                                              const typedData = parsedData as Record<string, any>;
                                              const entries = Object.entries(typedData).filter(([key]) => key !== "formId");
                                              
                                              if (entries.length === 0) {
                                                return (
                                                  <TableRow>
                                                    <TableCell className="text-muted-foreground text-center py-4 text-xs">
                                                      No data available.
                                                    </TableCell>
                                                  </TableRow>
                                                );
                                              }

                                              return entries.map(([key, value]) => {
                                                const form = forms?.find((f) => f.id === typedData.formId);
                                                const field = form?.FormFields?.find((f: any) => f.id === key);
                                                const label = field ? field.label : key;
                                                
                                                return (
                                                  <TableRow key={key} className="hover:bg-muted/30 border-b last:border-b-0">
                                                    <TableCell className="w-1/3 py-2.5 px-4 text-xs font-medium text-muted-foreground break-all bg-muted/10 border-r">
                                                      {label}
                                                    </TableCell>
                                                    <TableCell className="py-2.5 px-4 text-xs font-semibold break-all">
                                                      {String(value)}
                                                    </TableCell>
                                                  </TableRow>
                                                );
                                              });
                                            })()}
                                          </TableBody>
                                        </Table>
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="raw" className="mt-0">
                                      <pre className="bg-background rounded-lg p-4 text-xs font-mono overflow-auto border shadow-inner max-h-[200px]">
                                        {JSON.stringify(parsedData, null, 2)}
                                      </pre>
                                    </TabsContent>
                                  </Tabs>
                                  <p className="text-[10px] text-muted-foreground mt-2 text-right">
                                    Captured on {formatDate(submission.createdAt, "PPpp")}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}