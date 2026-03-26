"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Loading from "../global/loading";
import { saveActivityLogsNotification, sendInvitation } from "@/lib/queries";
import { toast } from "sonner";

interface SendInvitationProps {
  agencyId: string;
  subAccounts?: { id: string; name: string }[];
}

const userDataSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["AGENCY_ADMIN", "SUBACCOUNT_USER", "SUBACCOUNT_GUEST"]),
  subAccountId: z.string().optional(),
});

type FormData = z.infer<typeof userDataSchema>;

const SendInvitation: React.FC<SendInvitationProps> = ({ agencyId, subAccounts }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      email: "",
      role: "SUBACCOUNT_USER",
      subAccountId: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const res = await sendInvitation(values.role, values.email, agencyId, values.subAccountId);
      if (!res.success) {
        if (res.status === "ALREADY_IN_AGENCY") {
          toast.error("Error", {
            description: "This email is already in an agency",
          });
        } else {
          toast.error("Error", {
            description: res.error || "Invitation already sent to this email",
          });
        }
        return;
      } else if (res.success && res.status === "SENT") {
        toast.success("Success", { description: "Invitation sent" });
        await saveActivityLogsNotification({
          agencyId: agencyId,
          description: `Invited ${values.email}`,
          subAccountId: undefined,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", { description: "Could not send invitation" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitation</CardTitle>
        <CardDescription>
          Send an invite to a new user. They will receive an email to join your
          agency.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email")}
              placeholder="Email address"
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.email?.message && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Role Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">User Role</label>
            <select
              {...register("role")}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="AGENCY_ADMIN">Agency Admin</option>
              <option value="SUBACCOUNT_USER">Sub Account User</option>
              <option value="SUBACCOUNT_GUEST">Sub Account Guest</option>
            </select>
            {errors.role?.message && (
              <p className="text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* SubAccount Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Assigned Subaccount (Optional)</label>
            <select
              {...register("subAccountId")}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">None / Agency Wide</option>
              {subAccounts?.map((subAccount) => (
                <option key={subAccount.id} value={subAccount.id}>
                  {subAccount.name}
                </option>
              ))}
            </select>
            {errors.subAccountId?.message && (
              <p className="text-xs text-red-500">{errors.subAccountId.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? <Loading /> : "Send Invitation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SendInvitation;
