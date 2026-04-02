"use client";

import { FormWithFields } from "@/lib/types";
import {
  upsertFormField,
  deleteFormField,
  upsertForm,
  toggleFormPublished,
} from "@/lib/queries";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  GripVertical,
  Plus,
  Trash2,
  Eye,
  Save,
  ToggleRight,
  Type,
  Mail,
  Phone,
  AlignLeft,
  List,
  CheckSquare,
  Hash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import FormFieldItem from "./form-field-item";

type FieldType =
  | "TEXT"
  | "EMAIL"
  | "PHONE"
  | "TEXTAREA"
  | "SELECT"
  | "CHECKBOX"
  | "NUMBER";

const FIELD_TYPE_OPTIONS: {
  value: FieldType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "TEXT", label: "Text", icon: Type },
  { value: "EMAIL", label: "Email", icon: Mail },
  { value: "PHONE", label: "Phone", icon: Phone },
  { value: "TEXTAREA", label: "Textarea", icon: AlignLeft },
  { value: "SELECT", label: "Dropdown", icon: List },
  { value: "CHECKBOX", label: "Checkbox", icon: CheckSquare },
  { value: "NUMBER", label: "Number", icon: Hash },
];

type Props = {
  form: FormWithFields;
  subaccountId: string;
};

export default function FormEditor({ form, subaccountId }: Props) {
  const router = useRouter();
  const [fields, setFields] = useState(form.FormFields);
  const [showAddField, setShowAddField] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  // New field state
  const [newField, setNewField] = useState({
    label: "",
    placeholder: "",
    type: "TEXT" as FieldType,
    required: false,
    options: "",
  });

  const handleAddField = async () => {
    if (!newField.label.trim()) {
      toast.error("Field label is required");
      return;
    }

    try {
      setSaving(true);
      const response = await upsertFormField({
        label: newField.label,
        placeholder: newField.placeholder,
        type: newField.type,
        required: newField.required,
        order: fields.length,
        options: newField.type === "SELECT" ? newField.options : undefined,
        formId: form.id,
      });

      setFields([...fields, response]);
      setNewField({
        label: "",
        placeholder: "",
        type: "TEXT",
        required: false,
        options: "",
      });
      setShowAddField(false);
      toast.success("Field added");
    } catch {
      toast.error("Failed to add field");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteField = async (fieldId: string) => {
    try {
      await deleteFormField(fieldId);
      setFields(fields.filter((f) => f.id !== fieldId));
      toast.success("Field removed");
    } catch {
      toast.error("Failed to remove field");
    }
  };

  const handleTogglePublish = async () => {
    try {
      await toggleFormPublished(form.id, !form.published);
      toast.success(form.published ? "Form unpublished" : "Form published");
      router.refresh();
    } catch {
      toast.error("Failed to update form status");
    }
  };

  const handleMoveField = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= fields.length) return;

    const newFields = [...fields];
    [newFields[index], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[index],
    ];

    // Update order
    const updatedFields = newFields.map((f, i) => ({ ...f, order: i }));
    setFields(updatedFields);

    // Persist reorder
    try {
      await Promise.all(
        updatedFields.map((f) =>
          upsertFormField({
            id: f.id,
            label: f.label,
            placeholder: f.placeholder || undefined,
            type: f.type,
            required: f.required,
            order: f.order,
            options: f.options || undefined,
            formId: form.id,
          })
        )
      );
    } catch {
      toast.error("Failed to reorder fields");
    }
  };

  const renderPreviewField = (field: (typeof fields)[0]) => {
    switch (field.type) {
      case "TEXTAREA":
        return (
          <Textarea
            placeholder={field.placeholder || field.label}
            disabled
            className="resize-none"
            rows={3}
          />
        );
      case "SELECT":
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Select..."} />
            </SelectTrigger>
          </Select>
        );
      case "CHECKBOX":
        return (
          <div className="flex items-center gap-2">
            <input type="checkbox" disabled className="rounded" />
            <span className="text-sm">{field.label}</span>
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
            disabled
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              router.push(`/subaccount/${subaccountId}/automations`)
            }
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{form.name}</h1>
              <Badge
                variant={form.published ? "default" : "secondary"}
                className={
                  form.published
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                    : ""
                }
              >
                {form.published ? "Published" : "Draft"}
              </Badge>
            </div>
            {form.description && (
              <p className="text-muted-foreground text-sm mt-1">
                {form.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2"
          >
            <Eye className="size-4" />
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
          <Button
            variant={form.published ? "secondary" : "default"}
            onClick={handleTogglePublish}
            className="gap-2"
          >
            <ToggleRight className="size-4" />
            {form.published ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </div>

      <div
        className={`grid gap-6 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}
      >
        {/* Fields Editor */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Form Fields</CardTitle>
                <CardDescription>
                  Add and configure the fields for your form
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => setShowAddField(!showAddField)}
                className="gap-1.5"
              >
                <Plus className="size-4" />
                Add Field
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add field form */}
            {showAddField && (
              <Card className="mb-4 bg-muted/30 border-dashed">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Field Label</Label>
                      <Input
                        placeholder="e.g. Phone Number"
                        value={newField.label}
                        onChange={(e) =>
                          setNewField({ ...newField, label: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Placeholder</Label>
                      <Input
                        placeholder="e.g. +91 XXXXX XXXXX"
                        value={newField.placeholder}
                        onChange={(e) =>
                          setNewField({
                            ...newField,
                            placeholder: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Field Type</Label>
                      <Select
                        value={newField.type}
                        onValueChange={(val: FieldType) =>
                          setNewField({ ...newField, type: val })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FIELD_TYPE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              <div className="flex items-center gap-2">
                                <opt.icon className="size-4" />
                                {opt.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <Switch
                        checked={newField.required}
                        onCheckedChange={(checked) =>
                          setNewField({ ...newField, required: checked })
                        }
                      />
                      <Label>Required field</Label>
                    </div>
                    {newField.type === "SELECT" && (
                      <div className="space-y-2 col-span-2">
                        <Label>Dropdown Options (comma separated)</Label>
                        <Input
                          placeholder="Option 1, Option 2, Option 3"
                          value={newField.options}
                          onChange={(e) =>
                            setNewField({
                              ...newField,
                              options: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddField(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAddField}
                      disabled={saving}
                      className="gap-1.5"
                    >
                      {saving ? <span className="animate-spin">⏳</span> : <Save className="size-4" />}
                      Save Field
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fields list */}
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted rounded-full p-4 mb-3">
                  <GripVertical className="size-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  No fields added yet. Click &quot;Add Field&quot; to start
                  building your form.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                  <FormFieldItem
                    key={field.id}
                    field={field}
                    index={index}
                    totalFields={fields.length}
                    onDelete={handleDeleteField}
                    onMoveUp={() => handleMoveField(index, "up")}
                    onMoveDown={() => handleMoveField(index, "down")}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Preview */}
        {showPreview && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Preview</CardTitle>
              <CardDescription>
                This is how your form will look to visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>{form.name}</CardTitle>
                  {form.description && (
                    <CardDescription>{form.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        {field.type !== "CHECKBOX" && (
                          <Label>
                            {field.label}
                            {field.required && (
                              <span className="text-destructive ml-1">*</span>
                            )}
                          </Label>
                        )}
                        {renderPreviewField(field)}
                      </div>
                    ))}
                    {fields.length > 0 && (
                      <Button className="mt-2" disabled>
                        Submit
                      </Button>
                    )}
                    {fields.length === 0 && (
                      <p className="text-muted-foreground text-sm text-center py-8">
                        Add fields to see the preview
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
