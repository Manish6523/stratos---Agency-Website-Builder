import BlurPage from "@/components/global/blur-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFormSubmissions, getForms } from "@/lib/queries";
import { db } from "@/lib/db";
import { FileText, Inbox } from "lucide-react";
import React from "react";
import SubmissionsTab from "./_components/submissions-tab";
import FormBuilderTab from "./_components/form-builder-tab";

type Props = {
  params: Promise<{ subaccountId: string }>;
};

const AutomationPage = async ({ params }: Props) => {
  const { subaccountId } = await params;

  const [submissions, forms] = await Promise.all([
    getFormSubmissions(subaccountId),
    getForms(subaccountId),
  ]);

  const todaySubmissions = submissions.filter((s) => {
    const today = new Date();
    const created = new Date(s.createdAt);
    return (
      created.getDate() === today.getDate() &&
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );
  });

  const uniqueContacts = new Set(submissions.map((s) => s.email)).size;
  const activeForms = forms.filter((f) => f.published).length;

  return (
    <BlurPage>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold md:hidden p-4">Automations</h1>
        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-4 h-auto p-0 mb-6 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <TabsTrigger
              value="submissions"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 pb-3 pt-2 text-base font-medium gap-2 whitespace-nowrap"
            >
              <Inbox className="size-4" />
              Submissions
              {submissions.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold">
                  {submissions.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="forms"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 pb-3 pt-2 text-base font-medium gap-2 whitespace-nowrap"
            >
              <FileText className="size-4" />
              Form Builder
              {forms.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold">
                  {forms.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <SubmissionsTab
              submissions={submissions}
              todayCount={todaySubmissions.length}
              uniqueContacts={uniqueContacts}
              activeForms={activeForms}
              forms={forms}
            />
          </TabsContent>

          <TabsContent value="forms">
            <FormBuilderTab
              forms={forms}
              subaccountId={subaccountId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </BlurPage>
  );
};

export default AutomationPage;