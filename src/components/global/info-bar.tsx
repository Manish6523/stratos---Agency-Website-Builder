"use client";
import { NotificationWithUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Bell } from "lucide-react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "../ui/separator";
import { Role } from "../../../generated/prisma";
import Userbutton from "./user-button";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

type Props = {
  notifications: NotificationWithUser | [];
  role?: Role;
  className?: string;
  subAccountId?: string;
};

export default function InfoBar({
  notifications,
  subAccountId,
  className,
  role,
}: Props) {
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [showAll, setShowAll] = useState(true);
  const path = usePathname();

  function handleClick() {
    if (!showAll) setAllNotifications(notifications);
    else {
      if (notifications?.length !== 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
            [],
        );
      }
    }
    setShowAll((prev) => !prev);
  }

  return (
    <>
      <div
        className={cn(
          "fixed z-20 md:left-75 left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b ",
          className,
        )}
      >
        <h1 className="text-2xl font-bold hidden md:block">
          {path.split("/")[3]
            ? path.split("/")[3].charAt(0).toUpperCase() +
              path.split("/")[3].slice(1)
            : "Dashboard"}
        </h1>
        <div className="flex items-center gap-2 ml-auto">
          <Userbutton />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size={"icon"}
                variant={"default"}
                className="rounded-full"
              >
                <Bell size={17} />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="mt-4 mr-4 pr-4 pb-5 overflow-auto"
              showCloseButton={false}
            >
              <SheetHeader className="text-left">
                <SheetTitle className="text-lg font-semibold">
                  Notifications
                </SheetTitle>
                <Separator className="my-2" />
                <SheetDescription className="text-sm text-muted-foreground">
                  Here you can view all your notifications.
                </SheetDescription>
                {(role === "AGENCY_OWNER" || role === "AGENCY_ADMIN") && (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-md">
                    <span className="font-medium">Current Subaccount</span>
                    <Switch onCheckedChange={handleClick} />
                  </div>
                )}
              </SheetHeader>

              {allNotifications?.map((notification) => {
                const [userName, action, details] =
                  notification.notification.split("|");

                return (
                  <div
                    key={notification.id}
                    // 1. Reduce 'p-4' to 'py-2' to shrink vertical space
                    // 2. Use 'px-4' to keep horizontal padding the same
                    className="flex gap-3 py-2 px-4 transition-colors hover:bg-muted/40 rounded-md"
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      {" "}
                      {/* Reduced from h-9 to h-8 */}
                      <AvatarImage src={notification.User.avatarUrl} />
                      <AvatarFallback className="text-[10px]">
                        {notification.User.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col overflow-hidden">
                      <div className="text-sm leading-tight">
                        {" "}
                        {/* 'leading-tight' reduces line height */}
                        <span className="font-medium">{userName}</span>{" "}
                        <span className="text-muted-foreground">{action}</span>{" "}
                        <span className="text-foreground">{details}</span>
                      </div>

                      <time className="text-[10px] text-muted-foreground/60 leading-none mt-0.5">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                );
              })}

              {allNotifications?.length === 0 && (
                <div className="flex items-center justify-center mb-4 text-muted-foreground">
                  You have no notification
                </div>
              )}
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
