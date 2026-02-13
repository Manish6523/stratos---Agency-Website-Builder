"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { createMedia, saveActivityLogsNotification } from "@/lib/queries";
import FileUpload from "../global/file-upload";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

type Props = {
  subaccountId: string;
};

const formSchema = z.object({
  link: z.string().min(1, { message: "Media File is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

type FormData = z.infer<typeof formSchema>;

export default function UploadMediaForm({ subaccountId }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
      name: "",
    },
  });

  // Watch the link value for the FileUpload component
  const fileLink = watch("link");

  const onSubmit = async (values: FormData) => {
    try {
      const response = await createMedia(subaccountId, values);
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Uploaded a media file | ${response.name}`,
        subAccountId: subaccountId,
      });
      router.refresh();
      toast.success("Success", { description: "Uploaded media" });
    } catch (error) {
      toast.error("Failure", { description: "Could not upload media" });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Media Information</CardTitle>
        <CardDescription>Enter the details for your file</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* File Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              File Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter name of the file"
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.name && (
              <p className="text-sm font-medium text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Media File Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Media File
            </label>
            <FileUpload
              apiEndpoint="subaccountLogo"
              value={fileLink}
              onChange={(url) => setValue("link", url || "")}
            />
            {errors.link && (
              <p className="text-sm font-medium text-destructive">
                {errors.link.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              "Upload Media"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
