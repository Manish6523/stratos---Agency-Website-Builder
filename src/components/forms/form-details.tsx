"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Loading from "../global/loading";
import { upsertForm } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/ModalProvider";
import { toast } from "sonner";
import { useEffect } from "react";

const FormDetailsSchema = z.object({
  name: z.string().min(1, "Form name is required"),
  description: z.string().optional(),
});

type Props = {
  subaccountId: string;
  defaultValues?: {
    id?: string;
    name: string;
    description?: string;
  };
};

export default function FormDetailsForm({
  subaccountId,
  defaultValues,
}: Props) {
  const { setClose } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormDetailsSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormDetailsSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const isLoading = form.formState.isSubmitting;
  const { errors } = form.formState;

  const handleSubmit = async (values: z.infer<typeof FormDetailsSchema>) => {
    // Logging the form values before submission
    console.log("Form Values:", values);
    
    try {
      const response = await upsertForm(subaccountId, {
        id: defaultValues?.id,
        name: values.name,
        description: values.description,
      });
      toast.success(
        defaultValues?.id ? "Form updated successfully" : "Form created successfully"
      );
      setClose();
      if (!defaultValues?.id && response?.id) {
        router.push(
          `/subaccount/${subaccountId}/automations/forms/${response.id}`
        );
      } else {
        router.refresh();
      }
    } catch {
      toast.error("Could not save form details");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Form Details</CardTitle>
        <CardDescription>
          Give your form a name and an optional description. You can add fields
          after creating it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Form Name Field */}
            <FormItem>
              <FormLabel>Form Name</FormLabel>
              <Input
                {...form.register("name")}
                placeholder="e.g. Contact Request"
                disabled={isLoading}
              />
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>

            {/* Description Field */}
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <Textarea
                {...form.register("description")}
                placeholder="Brief description of what this form is for..."
                className="resize-none"
                rows={3}
                disabled={isLoading}
              />
              {errors.description && (
                <FormMessage>{errors.description.message}</FormMessage>
              )}
            </FormItem>

            <Button className="mt-4" disabled={isLoading} type="submit">
              {isLoading ? (
                <Loading />
              ) : defaultValues?.id ? (
                "Update Form"
              ) : (
                "Create Form"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}