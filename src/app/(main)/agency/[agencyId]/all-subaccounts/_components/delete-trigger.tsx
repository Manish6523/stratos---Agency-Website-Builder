"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const DeleteTrigger = () => {
  return (
    <AlertDialogTrigger asChild>
      <Button
        size="sm"
        variant="destructive"
        className="w-20 hover:bg-red-600 text-white z-10"
        onClick={(e) => e.stopPropagation()}
      >
        Delete
      </Button>
    </AlertDialogTrigger>
  );
};
