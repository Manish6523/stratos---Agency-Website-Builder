"use client";
import { useEffect } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loading from "../global/loading";
import { toast } from "sonner";
import {
  deleteFunnelPage,
  getFunnels,
  saveActivityLogsNotification,
  upsertFunnelPage,
} from "@/lib/queries";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { CopyPlusIcon, Trash } from "lucide-react";
import { FunnelPage } from "../../../generated/prisma/client";

type Props = {
  defaultData?: FunnelPage;
  funnelId: string;
  order: number;
  subaccountId: string;
};

export const FunnelPageSchema = z.object({
  name: z.string().min(1),
  pathName: z.string().optional(),
  customName: z.string().optional(),
});

export default function FunnelPageForm({
  defaultData,
  funnelId,
  order,
  subaccountId,
}: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FunnelPageSchema>>({
    resolver: zodResolver(FunnelPageSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      pathName: "",
      customName: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = form;

  useEffect(() => {
    if (defaultData) {
      reset({ name: defaultData.name, pathName: defaultData.pathName, customName: defaultData.customName || "" });
    }
  }, [defaultData, reset]);

  const onSubmit = async (values: z.infer<typeof FunnelPageSchema>) => {
    if (order !== 0 && !values.pathName)
      return setError("pathName", {
        message:
          "Pages other than the first page in the funnel require a path name example 'secondstep'.",
      });
    try {
      const response = await upsertFunnelPage(
        subaccountId,
        {
          ...values,
          id: defaultData?.id || v4(),
          order: defaultData?.order || order,
          pathName: values.pathName || "",
        },
        funnelId,
      );

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a funnel page | ${response?.name}`,
        subAccountId: subaccountId,
      });
      router.refresh();

      toast("Success", {
        description: "Saved Funnel Page Details",
      });
    } catch (error) {
      console.log(error);
      toast("Oppse!", {
        description: "Could Save Funnel Page Details",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Page</CardTitle>
        <CardDescription>
          Funnel pages are flow in the order they are created by default. You
          can move them around to change their order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input
              disabled={isSubmitting}
              placeholder="Name"
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Path Name</Label>
            <Input
              disabled={isSubmitting || order === 0}
              placeholder="Path for the page"
              {...register("pathName")}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.toLowerCase();
              }}
            />
            {errors.pathName?.message && (
              <p className="text-sm text-destructive">
                {errors.pathName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Custom Title (Optional)</Label>
            <Input
              disabled={isSubmitting}
              placeholder="Custom page title"
              {...register("customName")}
            />
          </div>
          <div className="flex items-center sm:flex-row flex-col gap-2">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? <Loading /> : "Save Page"}
            </Button>

            {defaultData?.id && (
              <Button
                variant="destructive"
                disabled={isSubmitting}
                type="button"
                onClick={async () => {
                  const response = await deleteFunnelPage(defaultData.id);
                  await saveActivityLogsNotification({
                    agencyId: undefined,
                    description: `Deleted a funnel page | ${response?.name}`,
                    subAccountId: subaccountId,
                  });
                  router.refresh();
                }}
              >
                {isSubmitting ? <Loading /> : <Trash />}
                delete
              </Button>
            )}
            {defaultData?.id && (
              <Button
                variant={"outline"}
                disabled={isSubmitting}
                style={{
                  border: "1px solid var(--primary)",
                  color: "var(--primary)"
                }}
                type="button"
                onClick={async () => {
                  const response = await getFunnels(subaccountId);
                  const lastFunnelPage = response.find(
                    (funnel) => funnel.id === funnelId,
                  )?.FunnelPages.length;

                  await upsertFunnelPage(
                    subaccountId,
                    {
                      ...defaultData,
                      id: v4(),
                      order: lastFunnelPage ? lastFunnelPage : 0,
                      visits: 0,
                      name: `${defaultData.name} Copy`,
                      pathName: `${defaultData.pathName}copy`,
                      customName: `${defaultData.customName || ""} Copy`,
                      content: defaultData.content,
                    },
                    funnelId,
                  );
                  toast("Success", {
                    description: "Saved Funnel Page Details",
                  });
                  router.refresh();
                }}
              >
                {isSubmitting ? <Loading /> : <CopyPlusIcon />}
                Duplicate
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
