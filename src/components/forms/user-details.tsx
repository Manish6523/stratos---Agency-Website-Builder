"use client";
import {
  AuthUserWithAgencySigebarOptionsSubAccounts,
  UserWithPermissionsAndSubAccounts,
} from "@/lib/types";
import { useModal } from "@/providers/ModalProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  changeUserPermissions,
  getAuthUserDetails,
  getUserPermissions,
  saveActivityLogsNotification,
  updateUser,
} from "@/lib/queries";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import FileUpload from "../global/file-upload";
import { Input } from "../ui/input"; // Keeping this as it's a styled native input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Loading from "../global/loading";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { v4 } from "uuid";
import { SubAccount, User } from "../../../generated/prisma";
import { toast } from "sonner";

type Props = {
  id: string | null;
  type: "agency" | "subaccount";
  userData?: Partial<User>;
  subAccounts?: SubAccount[];
};

const UserDetails = ({ id, type, subAccounts, userData }: Props) => {
  const [subAccountPermissions, setSubAccountPermissions] =
    useState<UserWithPermissionsAndSubAccounts | null>(null);
  const { data, setClose } = useModal();
  const [roleState, setRoleState] = useState("");
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [authUserData, setAuthUserData] =
    useState<AuthUserWithAgencySigebarOptionsSubAccounts | null>(null);
  const router = useRouter();

  const userDataSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    avatarUrl: z.string(),
    role: z.enum([
      "AGENCY_OWNER",
      "AGENCY_ADMIN",
      "SUBACCOUNT_USER",
      "SUBACCOUNT_GUEST",
    ]),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: "onChange",
    defaultValues: {
      name: userData ? userData.name : data?.user?.name,
      email: userData ? userData.email : data?.user?.email,
      avatarUrl: userData ? userData.avatarUrl : data?.user?.avatarUrl,
      role: userData ? userData.role : data?.user?.role,
    },
  });

  const avatarUrl = watch("avatarUrl");
  const currentRole = watch("role");

  // Fetch Auth Details
  useEffect(() => {
    if (data.user) {
      const fetchDetails = async () => {
        const response = await getAuthUserDetails();
        if (response) setAuthUserData(response);
      };
      fetchDetails();
    }
  }, [data]);

  // Fetch Permissions
  useEffect(() => {
    if (!data.user) return;
    const getPermissions = async () => {
      const permissions = await getUserPermissions(data.user!.id);
      setSubAccountPermissions(permissions);
    };
    getPermissions();
  }, [data]);

  useEffect(() => {
    if (data.user) reset(data.user);
    if (userData) reset(userData);
  }, [userData, data, reset]);

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    if (!id) return;

    try {
      const updatedUser = await updateUser(values);
      
      // Handle activity logs for subaccounts
      const activeSubaccounts = authUserData?.Agency?.SubAccount.filter((subacc: any) =>
        authUserData.Permissions.find(
          (p: any) => p.subAccountId === subacc.id && p.access
        )
      );

      if (activeSubaccounts) {
        for (const subaccount of activeSubaccounts) {
          await saveActivityLogsNotification({
            agencyId: undefined,
            description: `Updated ${values.name} information`,
            subAccountId: subaccount.id,
          });
        }
      }

      if (updatedUser) {
        toast.success("Success", { description: "Updated User Information" });
        setClose();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Oppse!", { description: "Could not update user information" });
    }
  };

  const onChangePermission = async (
    subAccountId: string,
    val: boolean,
    permissionsId: string | undefined
  ) => {
    if (!data.user?.email) return;
    setLoadingPermissions(true);
    const response = await changeUserPermissions(
      permissionsId || v4(),
      data.user.email,
      subAccountId,
      val
    );

    if (response) {
      toast.success("Success", { description: "The request was successful" });
      // Logic to update local state permissions would go here
      router.refresh();
    } else {
      toast.error("Failed", { description: "Could not update permissions" });
    }
    setLoadingPermissions(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>Add or update your information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Avatar Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Profile picture</label>
            <FileUpload
              apiEndpoint="avatar"
              value={avatarUrl}
              onChange={(url) => setValue("avatarUrl", url || "")}
            />
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">User full name</label>
            <Input
              required
              placeholder="Full Name"
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              placeholder="Email"
              {...register("email")}
              readOnly={userData?.role === "AGENCY_OWNER"}
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Role Field (Using Select for UI consistency, but can be native <select>) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">User Role</label>
            <Select
              onValueChange={(value) => {
                setValue("role", value as any);
                setRoleState(
                  value.includes("SUBACCOUNT") 
                    ? "You need to have subaccounts to assign access to team members." 
                    : ""
                );
              }}
              defaultValue={currentRole}
              disabled={currentRole === "AGENCY_OWNER" || isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AGENCY_ADMIN">Agency Admin</SelectItem>
                {(authUserData?.role === "AGENCY_OWNER" || userData?.role === "AGENCY_OWNER") && (
                  <SelectItem value="AGENCY_OWNER">Agency Owner</SelectItem>
                )}
                <SelectItem value="SUBACCOUNT_USER">Sub Account User</SelectItem>
                <SelectItem value="SUBACCOUNT_GUEST">Sub Account Guest</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">{roleState}</p>
          </div>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loading /> : "Save User Details"}
          </Button>

          {/* Permissions Section */}
          {authUserData?.role === "AGENCY_OWNER" && (
            <div className="pt-4">
              <Separator className="my-4" />
              <label className="text-sm font-medium">User Permissions</label>
              <p className="text-sm text-muted-foreground mb-4">
                Give Sub Account access to team members by turning on access control.
              </p>
              <div className="flex flex-col gap-4">
                {subAccounts?.map((subAccount) => {
                  const perm = subAccountPermissions?.Permissions.find(
                    (p: any) => p.subAccountId === subAccount.id
                  );
                  return (
                    <div
                      key={subAccount.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <p className="text-sm">{subAccount.name}</p>
                      <Switch
                        disabled={loadingPermissions}
                        checked={perm?.access}
                        onCheckedChange={(val) =>
                          onChangePermission(subAccount.id, val, perm?.id)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UserDetails;