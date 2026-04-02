"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormsList } from "@/lib/types";
import {
  FileText,
  Layers,
  MoreVertical,
  Pencil,
  Trash2,
  ToggleRight,
  Plus,
} from "lucide-react";
import { formatDate } from "date-fns/format";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteForm, toggleFormPublished } from "@/lib/queries";
import CreateFormButton from "./create-form-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  forms: FormsList;
  subaccountId: string;
};

export default function FormBuilderTab({ forms, subaccountId }: Props) {
  const router = useRouter();

  const handleDelete = async (formId: string) => {
    try {
      await deleteForm(formId);
      toast.success("Form deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete form");
    }
  };

  const handleTogglePublished = async (
    formId: string,
    currentState: boolean
  ) => {
    try {
      await toggleFormPublished(formId, !currentState);
      toast.success(
        currentState ? "Form unpublished" : "Form published"
      );
      router.refresh();
    } catch {
      toast.error("Failed to update form status");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Forms</h2>
          <p className="text-muted-foreground text-sm">
            Create and manage custom forms for your funnels
          </p>
        </div>
        <CreateFormButton subaccountId={subaccountId} />
      </div>

      {forms.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted rounded-full p-6 mb-4">
              <FileText className="size-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No forms yet</h3>
            <p className="text-muted-foreground max-w-md text-sm mb-6">
              Create your first custom form to start collecting data from your
              funnel visitors. You can add fields like phone, message, dropdown
              menus and more.
            </p>
            <CreateFormButton subaccountId={subaccountId} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {forms.map((form) => (
            <Card
              key={form.id}
              className="group relative hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() =>
                router.push(
                  `/subaccount/${subaccountId}/automations/forms/${form.id}`
                )
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <FileText className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{form.name}</CardTitle>
                      {form.description && (
                        <CardDescription className="text-xs mt-0.5 line-clamp-1">
                          {form.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      onClick={(e) => e.stopPropagation()}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-md"
                    >
                      <MoreVertical className="size-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/subaccount/${subaccountId}/automations/forms/${form.id}`
                          );
                        }}
                      >
                        <Pencil className="size-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePublished(form.id, form.published);
                        }}
                      >
                        <ToggleRight className="size-4 mr-2" />
                        {form.published ? "Unpublish" : "Publish"}
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={(e) => e.preventDefault()}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="size-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent
                          onClick={(e) => e.stopPropagation()}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Form</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete &quot;{form.name}
                              &quot;? This action cannot be undone and all form
                              fields will be permanently removed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDelete(form.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Layers className="size-3.5" />
                    {form.FormFields.length} field
                    {form.FormFields.length !== 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={form.published ? "default" : "secondary"}
                      className={
                        form.published
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20"
                          : ""
                      }
                    >
                      {form.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Created {formatDate(form.createdAt, "MMM dd, yyyy")}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Add New Form Card */}
          <Card
            className="border-dashed hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 cursor-pointer flex items-center justify-center min-h-[160px]"
            onClick={() => {
              const btn = document.getElementById("create-form-trigger");
              btn?.click();
            }}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Plus className="size-8" />
              <span className="text-sm font-medium">New Form</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
