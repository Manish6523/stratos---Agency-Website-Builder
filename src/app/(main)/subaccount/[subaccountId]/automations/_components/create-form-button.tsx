"use client";

import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalProvider";
import { Plus } from "lucide-react";
import FormDetailsForm from "@/components/forms/form-details";

type Props = {
  subaccountId: string;
};

export default function CreateFormButton({ subaccountId }: Props) {
  const { setOpen } = useModal();

  const handleCreateForm = () => {
    setOpen(
      <CustomModal
        title="Create New Form"
        subHeading="Design a custom form to collect data from your funnel visitors."
      >
        <FormDetailsForm subaccountId={subaccountId} />
      </CustomModal>
    );
  };

  return (
    <Button onClick={handleCreateForm} id="create-form-trigger" className="gap-2">
      <Plus className="size-4" />
      Create Form
    </Button>
  );
}
