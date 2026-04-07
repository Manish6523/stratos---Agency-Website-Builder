"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 } from "uuid";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { useModal } from "@/providers/ModalProvider";
import { saveActivityLogsNotification, upsertFunnel } from "@/lib/queries";
import FileUpload from "../global/file-upload";
import { Loader2 } from "lucide-react";
interface FunnelDetailsProps {
  defaultData?: any;
  subAccountId: string;
}

const FunnelDetails: React.FC<FunnelDetailsProps> = ({
  defaultData,
  subAccountId,
}) => {
  const router = useRouter();
  const { setClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Standard State Approach
  const [formData, setFormData] = useState({
    name: defaultData?.name || "",
    description: defaultData?.description || "",
    favicon: defaultData?.favicon || "",
    subDomainName: defaultData?.subDomainName || "",
  });

  // Keep state in sync if defaultData updates
  useEffect(() => {
    if (defaultData) {
      setFormData({
        name: defaultData.name || "",
        description: defaultData.description || "",
        favicon: defaultData.favicon || "",
        subDomainName: defaultData.subDomainName || "",
      });
    }
  }, [defaultData]);

  // 2. The handleChange logic for standard inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Manual Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subAccountId) return;

    if (!formData.name.trim()) {
      toast.error("Validation Error", { description: "Name is required" });
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Validation Error", { description: "Description is required" });
      return;
    }
    if (formData.subDomainName.length < 4) {
      toast.error("Validation Error", { description: "Subdomain must be at least 4 characters" });
      return;
    }
    if (formData.subDomainName.length > 16) {
      toast.error("Validation Error", { description: "Subdomain must be no more than 16 characters" });
      return;
    }
    if (!/^[a-z0-9-]+$/.test(formData.subDomainName)) {
      toast.error("Validation Error", { description: "Subdomain can only contain small letters and hyphens (no spaces)" });
      return;
    }
    if (!formData.favicon.trim()) {
      toast.error("Validation Error", { description: "Favicon is required" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await upsertFunnel(
        subAccountId,
        { ...formData, liveProducts: defaultData?.liveProducts || "[]" },
        defaultData?.id || v4(),
      );

      if (response && "error" in response) {
        toast.error("Limit Reached", { description: response.error as string });
        return;
      }

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Update funnel | ${response.name}`,
        subAccountId,
      });

      if (response) {
        toast.success("Success", { description: "Saved funnel details" });
        setClose();
        router.refresh();
      }
    } catch (error) {
      toast.error("Error", { description: "Could not save funnel details" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex-1 w-full">
      <CardHeader>
        <CardTitle>Funnel Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Funnel Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Funnel Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell us more..."
              value={formData.description}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="subDomainName">Sub domain</Label>
            <Input
              id="subDomainName"
              name="subDomainName"
              placeholder="Sub domain for funnel"
              value={formData.subDomainName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          {/* 4. Using FileUpload exactly as before, but linked to our manual state */}
          <div className="flex flex-col gap-2">
            <Label>Favicon</Label>
            <div className="mx-auto md:mx-0">
              <FileUpload
                apiEndpoint="subaccountLogo"
                value={formData.favicon}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, favicon: url }))
                }
              />
            </div>
          </div>

          <Button className="w-20 mt-4" disabled={isLoading} type="submit">
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2" /> Saving...
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FunnelDetails;
