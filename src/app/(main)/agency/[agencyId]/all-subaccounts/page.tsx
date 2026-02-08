import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAuthUserDetails } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateSubAccountButton from "./_components/CreateSubAccountButton";
import DeleteButton from "./_components/DeleteButton";
import { DeleteTrigger } from "./_components/delete-trigger";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const AllSubAccountsPage = async ({ params }: Props) => {
  const { agencyId } = await params;
  const user = await getAuthUserDetails();

  if (!user || !user.Agency) return null;

  return (
    <div className="flex flex-col gap-4">
      <CreateSubAccountButton
        user={user}
        id={agencyId}
        className="w-50 self-end m-6"
      />
      <Command className="rounded-lg bg-transparent border border-border">
        <CommandInput placeholder="Search Account..." />
        <CommandList className="max-h-full pb-40">
          <CommandEmpty>No Sub accounts found.</CommandEmpty>

          <CommandGroup
            heading={user.Agency.SubAccount.length > 0 ? "Sub Accounts" : ""}
          >
            {user.Agency.SubAccount.map((subaccount) => (
              <AlertDialog key={subaccount.id}>
                <CommandItem className="h-32 bg-transparent! my-2 text-primary border border-border p-4 rounded-lg hover:bg-accent/50! cursor-pointer transition-all flex justify-between items-center group">
                  <Link
                    href={`/subaccount/${subaccount.id}`}
                    className="flex gap-4 w-full h-full"
                  >
                    <div className="relative w-32 h-full">
                      <Image
                        src={subaccount.subAccountLogo}
                        alt="subaccount logo"
                        fill
                        className="rounded-md object-contain bg-muted/50 p-1"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-bold text-lg">{subaccount.name}</p>
                      <span className="text-muted-foreground text-xs">
                        {subaccount.address}
                      </span>
                    </div>
                  </Link>

                  <DeleteTrigger />
                </CommandItem>

                <AlertDialogContent>
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-2xl font-bold">
                      Delete "{subaccount.name}"?
                    </AlertDialogTitle>
                    <AlertDescription className="pt-2">
                      <div className="text-sm text-muted-foreground leading-relaxed text-left">
                        This action is{" "}
                        <span className="text-red-500 font-semibold">
                          permanent
                        </span>
                        . You are about to remove this sub-account and all
                        associated data. This
                        <span className="text-red-500 font-semibold">
                          {" "}
                          cannot be undone
                        </span>
                        .
                      </div>
                    </AlertDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center gap-2 mt-4">
                    <AlertDialogCancel className="mb-0">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      asChild
                      className="p-0 border-none bg-transparent hover:bg-transparent"
                    >
                      <DeleteButton
                        subaccountId={subaccount.id}
                        subaccountName={subaccount.name}
                      />
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default AllSubAccountsPage;
