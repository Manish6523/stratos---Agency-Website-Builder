"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";

type Props = {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo";
  onChange: (url?: string) => void;
  value?: string;
};

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  // Extracting file type to distinguish between images and PDFs
  const type = value?.split(".").pop();

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        {type !== "pdf" ? (
          /* Image Preview Logic */
          <div className="relative size-60 border rounded-lg overflow-hidden bg-muted/20">
            <Image
              src={value}
              alt="uploaded logo"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          /* PDF Preview Logic */
          <div className="relative flex items-center p-3 rounded-md bg-background/10 border border-indigo-500/20">
            <FileIcon className="size-8 text-indigo-500 fill-indigo-50" />
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 font-medium hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        {/* Remove Button - Resets the field to show the Dropzone again */}
        <Button 
          onClick={() => onChange("")} 
          variant="ghost" 
          type="button" 
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <X className="size-4 mr-2" />
          Remove Media
        </Button>
      </div>
    );
  }

  /* Upload State (Shows when value is empty) */
  return (
    <div className="w-full bg-muted/30 border-2 border-dashed border-muted rounded-xl transition-all hover:bg-muted/50">
      <UploadDropzone 
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          // res[0].url is the hosted UploadThing URL
          onChange(res?.[0].ufsUrl);
        }}
        onUploadError={(error: Error) => {
          console.error("Upload Error:", error);
        }}
        appearance={{
          container: "p-8",
          label: "text-primary hover:text-primary/80",
          button: "bg-primary text-primary-foreground ut-ready:bg-primary/90",
        }}
      />
    </div>
  );
};

export default FileUpload;