"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditorBtns } from "@/lib/constants";
import {
  createFormSubmission,
  getFunnel,
  getFormById,
  saveActivityLogsNotification,
  upsertContact,
} from "@/lib/queries";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { FileText, Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type FormField = {
  id: string;
  label: string;
  placeholder: string | null;
  type: "TEXT" | "EMAIL" | "PHONE" | "TEXTAREA" | "SELECT" | "CHECKBOX" | "NUMBER";
  required: boolean;
  order: number;
  options: string | null;
};

type Props = {
  element: EditorElement;
};

const CustomFormComponent = ({ element }: Props) => {
  const { dispatch, state, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();

  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formName, setFormName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formId = !Array.isArray(element.content) ? element.content?.formId : undefined;

  const fetchForm = useCallback(async () => {
    if (!formId) return;
    setLoading(true);
    try {
      const form = await getFormById(formId as string);
      if (form) {
        setFormFields(form.FormFields as FormField[]);
        setFormName(form.name);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [formId]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    e.stopPropagation();
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("componentId", element.id);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  const goToNextPage = async () => {
    if (!state.editor.liveMode) return;
    const funnelPages = await getFunnel(funnelId);
    if (!funnelPages || !pageDetails) return;
    if (funnelPages.FunnelPages.length > pageDetails.order + 1) {
      const nextPage = funnelPages.FunnelPages.find(
        (page) => page.order === pageDetails.order + 1
      );
      if (!nextPage) return;
      router.replace(
        `${process.env.NEXT_PUBLIC_SCHEME}${funnelPages.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${nextPage.pathName}`
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.editor.liveMode) return;

    const nameField = fieldValues["name"] || fieldValues["Name"] || "";
    const emailField = fieldValues["email"] || fieldValues["Email"] || "";

    // Find name and email from form fields
    let submitterName = nameField;
    let submitterEmail = emailField;

    formFields.forEach((field) => {
      const val = fieldValues[field.id] || "";
      if (
        field.type === "EMAIL" ||
        field.label.toLowerCase().includes("email")
      ) {
        submitterEmail = submitterEmail || val;
      }
      if (field.label.toLowerCase().includes("name")) {
        submitterName = submitterName || val;
      }
    });

    if (!submitterEmail) {
      toast.error("Please provide an email address");
      return;
    }

    setSubmitting(true);
    try {
      const contact = await upsertContact({
        name: submitterName || submitterEmail.split("@")[0],
        email: submitterEmail,
        subAccountId: subaccountId,
      });

      const funnelData = await getFunnel(funnelId);
      const sourceName = [funnelData?.name, pageDetails?.name]
        .filter(Boolean)
        .join(" › ");

      await createFormSubmission({
        name: submitterName || submitterEmail.split("@")[0],
        email: submitterEmail,
        formData: JSON.stringify({ ...fieldValues, formId }),
        source: sourceName || undefined,
        funnelId: funnelId,
        funnelPageId: pageDetails?.id,
        subAccountId: subaccountId,
        contactId: contact?.id,
      });

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `A contact submitted form "${formName}" | ${submitterEmail}`,
        subAccountId: subaccountId,
      });

      setSubmitSuccess(true);
      toast.success("Form submitted successfully!");
      await goToNextPage();
    } catch {
      toast.error("Could not submit the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const options = field.options
      ? field.options.split(",").map((o) => o.trim())
      : [];

    switch (field.type) {
      case "TEXTAREA":
        return (
          <Textarea
            placeholder={field.placeholder || field.label}
            value={fieldValues[field.id] || ""}
            onChange={(e) =>
              setFieldValues((prev) => ({ ...prev, [field.id]: e.target.value }))
            }
            required={field.required}
            rows={3}
            className="resize-none"
            disabled={!state.editor.liveMode}
          />
        );
      case "SELECT":
        return (
          <Select
            value={fieldValues[field.id] || ""}
            onValueChange={(val) =>
              setFieldValues((prev) => ({ ...prev, [field.id]: val }))
            }
            disabled={!state.editor.liveMode}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Select..."} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "CHECKBOX":
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`field-${field.id}`}
              checked={fieldValues[field.id] === "true"}
              onChange={(e) =>
                setFieldValues((prev) => ({
                  ...prev,
                  [field.id]: String(e.target.checked),
                }))
              }
              required={field.required}
              disabled={!state.editor.liveMode}
              className="rounded"
            />
            <label htmlFor={`field-${field.id}`} className="text-sm">
              {field.label}
            </label>
          </div>
        );
      default:
        return (
          <Input
            type={
              field.type === "EMAIL"
                ? "email"
                : field.type === "PHONE"
                  ? "tel"
                  : field.type === "NUMBER"
                    ? "number"
                    : "text"
            }
            placeholder={field.placeholder || field.label}
            value={fieldValues[field.id] || ""}
            onChange={(e) =>
              setFieldValues((prev) => ({ ...prev, [field.id]: e.target.value }))
            }
            required={field.required}
            disabled={!state.editor.liveMode}
          />
        );
    }
  };

  const styles = element.styles;
  const isSelected = state.editor.selectedElement.id === element.id;
  const isLive = state.editor.liveMode;

  return (
    <div
      style={styles}
      id={element.id}
      draggable={!isLive && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, "customForm")}
      onClick={handleOnClickBody}
      className={clsx(
        "p-[2px] w-[400px] my-[5px]  relative text-[16px] transition-all",
        {
          "border-blue-500!": isSelected,
          "border-solid!": isSelected,
          "border-dashed border border-slate-300": !isLive,
        }
      )}
    >
      {isSelected && !isLive && (
        <Badge className="absolute -top-[23px] border rounded-none rounded-t-lg tracking-normal font-sans">
          {element.name}
        </Badge>
      )}

      {/* Editor placeholder (no form selected) */}
      {!formId && !isLive && (
        <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30 text-center">
          <FileText className="size-8 text-muted-foreground/60" />
          <div>
            <p className="font-medium text-sm text-muted-foreground">
              Custom Form
            </p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              Select a form in the Settings panel →
            </p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {formId && loading && (
        <div className="flex items-center justify-center py-10 gap-2 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          <span className="text-sm">Loading form...</span>
        </div>
      )}

      {/* Form rendered */}
      {formId && !loading && formFields.length > 0 && (
        <Card className="w-full ">
          <CardHeader>
            {formName && <CardTitle>{formName}</CardTitle>}
            <CardDescription>Please provide your details below</CardDescription>
          </CardHeader>
          <CardContent>
            {submitSuccess && isLive ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                <div className="bg-emerald-500/10 text-emerald-600 rounded-full p-4">
                  <FileText className="size-8" />
                </div>
                <p className="font-semibold text-lg">Thank you!</p>
                <p className="text-muted-foreground text-sm">
                  Your submission has been received.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                {formFields.map((field) => (
                  <div key={field.id} className="flex flex-col gap-1.5">
                    {field.type !== "CHECKBOX" && (
                      <Label htmlFor={`field-${field.id}`}>
                        {field.label}
                        {field.required && (
                          <span className="text-destructive ml-1">*</span>
                        )}
                      </Label>
                    )}
                    {renderField(field)}
                  </div>
                ))}
                <Button
                  type="submit"
                  disabled={submitting || !isLive}
                  className="mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {/* Form selected but no fields */}
      {formId && !loading && formFields.length === 0 && !state.editor.liveMode && (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center px-4">
          <FileText className="size-6 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            This form has no fields yet.{" "}
            <span className="font-medium">
              Add fields in Automations → Form Builder.
            </span>
          </p>
        </div>
      )}

      {isSelected && !isLive && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg text-white! tracking-normal font-sans">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
};

export default CustomFormComponent;
