import { 
  generateUploadButton, 
  generateUploadDropzone, 
  generateReactHelpers 
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Individual factories for better tree-shaking
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// React helpers for custom hooks and manual uploads
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

