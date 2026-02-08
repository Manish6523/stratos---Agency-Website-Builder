import { useModal } from "@/providers/ModalProvider";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type Props = {
  title: string;
  subHeading: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function CustomModal({
  title,
  subHeading,
  children,
  defaultOpen,
}: Props) {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="overflow-auto md:max-h-165 md:h-fit h-[95vh] bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subHeading}</DialogDescription>
        </DialogHeader>
          {children}
      </DialogContent>
    </Dialog>
  );
}
