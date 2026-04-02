import BlurPage from "@/components/global/blur-page";
import { getFormById } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";
import FormEditor from "./_components/form-editor";

type Props = {
  params: Promise<{ subaccountId: string; formId: string }>;
};

const FormEditorPage = async ({ params }: Props) => {
  const { subaccountId, formId } = await params;

  const form = await getFormById(formId);

  if (!form) {
    return redirect(`/subaccount/${subaccountId}/automations`);
  }

  return (
    <BlurPage>
      <FormEditor form={form} subaccountId={subaccountId} />
    </BlurPage>
  );
};

export default FormEditorPage;
