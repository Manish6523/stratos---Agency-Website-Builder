"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  deleteAgency,
  initUser,
  saveActivityLogsNotification,
  updateAgencyDetails,
  upsertAgency,
} from "@/lib/queries";
import { Button } from "../ui/button";
import Loading from "../global/loading";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { v4 } from "uuid";
import { toast } from "sonner";
import FileUpload from "../global/file-upload";
import { NumberInput } from "@tremor/react";
import { Switch } from "../ui/switch"; // Import Switch

type AgencyData = {
  id?: string;
  name?: string;
  customerId?: string;
  companyEmail?: string;
  agencyLogo?: string;
  companyPhone?: string;
  whiteLabel?: boolean;
  address?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  country?: string;
  goal?: number;
};

type Props = {
  data?: AgencyData;
};

export default function AgencyDetails({ data }: Props) {
  const router = useRouter();
  const [isDeletingAgency, startDeletingAgency] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: data?.name || "",
    companyEmail: data?.companyEmail || "",
    companyPhone: data?.companyPhone || "",
    whiteLabel: data?.whiteLabel ?? false,
    address: data?.address || "",
    city: data?.city || "",
    zipCode: data?.zipCode || "",
    state: data?.state || "",
    country: data?.country || "",
    agencyLogo: data?.agencyLogo || "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        companyEmail: data.companyEmail || "",
        companyPhone: data.companyPhone || "",
        whiteLabel: data.whiteLabel ?? false,
        address: data.address || "",
        city: data.city || "",
        zipCode: data.zipCode || "",
        state: data.state || "",
        country: data.country || "",
        agencyLogo: data.agencyLogo || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name || formData.name.trim().length < 2) {
        toast.error("Agency name must be at least 2 characters");
        setIsLoading(false);
        return;
      }
      if (!formData.agencyLogo || formData.agencyLogo.trim() === "") {
        toast.error("Please upload an agency logo");
        setIsLoading(false);
        return;
      }

      await initUser({ role: "AGENCY_OWNER" });

      const agencyData = {
        id: data?.id ? data.id : v4(),
        customerId: data?.customerId || "",
        name: formData.name.trim(),
        address: formData.address.trim(),
        agencyLogo: formData.agencyLogo.trim(),
        city: formData.city.trim(),
        companyPhone: formData.companyPhone.trim(),
        country: formData.country.trim(),
        state: formData.state.trim(),
        whiteLabel: formData.whiteLabel,
        zipCode: formData.zipCode.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        companyEmail: formData.companyEmail.trim(),
        connectAccountId: "",
        goal: 5,
      };

      const response = await upsertAgency(agencyData);

      if (response) {
        toast.success("Agency details saved!");
        router.refresh();
      }
    } catch (e) {
      console.log("ERROR: ", e);
      toast.error("Could not save your agency");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAgency = () => {
    if (data?.id) {
      startDeletingAgency(async () => {
        try {
          await deleteAgency(data.id as string);
          toast("Deleted your agency and all subaccounts");
          router.refresh();
        } catch (e) {
          console.log("ERROR: ", e);
          toast("Could not delete your agency");
        }
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for you business. You can edit agency settings
            later from the agency settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Agency Logo</label>
              <FileUpload
                apiEndpoint="agencyLogo"
                onChange={(value) => setFormData(prev => ({ ...prev, agencyLogo: value || '' }))}
                value={formData.agencyLogo}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Agency Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your agency name"
                  disabled={isLoading}
                  required
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="companyEmail" className="block text-sm font-medium mb-2">Agency Email</label>
                <input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  readOnly
                  className="w-full px-3 py-2 border border-input bg-muted rounded-md cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label htmlFor="companyPhone" className="block text-sm font-medium mb-2">Agency Phone Number</label>
              <input
                id="companyPhone"
                name="companyPhone"
                type="tel"
                value={formData.companyPhone}
                onChange={handleChange}
                placeholder="Phone"
                disabled={isLoading}
                required
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* WHITELABEL SWITCH SECTION */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="whiteLabel" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Whitelabel Agency
                </label>
                <p className="text-sm text-muted-foreground">
                  Whitelabel mode shows your logo to sub accounts by default.
                </p>
              </div>
              <Switch
                id="whiteLabel"
                checked={formData.whiteLabel}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, whiteLabel: checked }))}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 st..."
                disabled={isLoading}
                required
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                <input id="city" name="city" type="text" value={formData.city} onChange={handleChange} required className="w-full px-3 py-2 border border-input bg-background rounded-md" />
              </div>
              <div className="flex-1">
                <label htmlFor="state" className="block text-sm font-medium mb-2">State</label>
                <input id="state" name="state" type="text" value={formData.state} onChange={handleChange} required className="w-full px-3 py-2 border border-input bg-background rounded-md" />
              </div>
              <div className="flex-1">
                <label htmlFor="zipCode" className="block text-sm font-medium mb-2">Zipcode</label>
                <input id="zipCode" name="zipCode" type="text" value={formData.zipCode} onChange={handleChange} required className="w-full px-3 py-2 border border-input bg-background rounded-md" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="block text-sm font-medium">Country</label>
              <input id="country" name="country" type="text" value={formData.country} onChange={handleChange} required className="w-full px-3 py-2 border border-input bg-background rounded-md" />
            </div>

            {data?.id && (
              <div className="flex flex-col gap-2 pt-4">
                <label className="block text-sm font-medium">Create A Goal</label>
                <p className="text-sm text-muted-foreground">✨ Set your sub-account growth targets.</p>
                <NumberInput
                  defaultValue={data?.goal}
                  onValueChange={async (val) => {
                    if (!data?.id) return;
                    await updateAgencyDetails(data.id, { goal: val });
                    await saveActivityLogsNotification({
                      agencyId: data.id,
                      description: `Updated the agency goal to | ${val} Sub Account`,
                      subAccountId: undefined,
                    });
                    router.refresh();
                  }}
                  min={1}
                  className="bg-background border border-input"
                />
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full md:w-max">
              {isLoading ? <Loading /> : "Save Agency Information"}
            </Button>
          </form>

          {data?.id && (
            <div className="flex flex-col md:flex-row items-center justify-between rounded-lg border border-destructive gap-4 p-4 mt-8">
              <div className="flex flex-col gap-1">
                <div className="font-bold text-destructive">Danger Zone</div>
                <div className="text-muted-foreground text-sm">
                  Deleting your agency cannot be undone. All subaccount data will be lost.
                </div>
              </div>
              <AlertDialogTrigger
                disabled={isLoading || isDeletingAgency}
                className="text-red-600 p-2 px-4 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all whitespace-nowrap"
              >
                {isDeletingAgency ? "Deleting..." : "Delete Agency"}
              </AlertDialogTrigger>
            </div>
          )}

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the Agency and all sub accounts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={isDeletingAgency}
                className="bg-destructive hover:bg-destructive"
                onClick={handleDeleteAgency}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </CardContent>
      </Card>
    </AlertDialog>
  );
}