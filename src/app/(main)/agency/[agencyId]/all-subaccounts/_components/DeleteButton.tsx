"use client";
import { deleteSubAccount, saveActivityLogsNotification } from "@/lib/queries";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  subaccountId: string;
  subaccountName: string;
};

const DeleteButton = ({ subaccountId, subaccountName }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Deleted a subaccount | ${subaccountName}`,
        subAccountId: subaccountId,
      });
      
      await deleteSubAccount(subaccountId);
      
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isDeleting}
      onClick={handleDelete} 
      className={cn(
        buttonVariants({ variant: "destructive" }),
        "flex-1 gap-2 min-w-32" 
      )}
    >
      {isDeleting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        "Delete Sub Account"
      )}
    </button>
  );
};

export default DeleteButton;