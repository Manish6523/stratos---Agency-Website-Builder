"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import React from "react";
import TabList from "./tabs";
import SettingsTab from "./tabs/setting-tab";
import MediaBucketTab from "./tabs/media-bucket-tab";
import ComponentsTab from "./tabs/components-tab";

type Props = {
  subaccountId: string;
};

export default function FunnelEditorSidebar({ subaccountId }: Props) {
  const { state } = useEditor();
  const style = {
    marginTop: "70px",
    zIndex: 80,
  };
  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full " defaultValue="Settings">
        <SheetContent
          showCloseButton={false}
          side="right"
          style={style}
          className={clsx(
            "w-16 shadow-none focus:border-none transition-all overflow-hidden",
            { hidden: state.editor.previewMode },
          )}
        >
          <VisuallyHidden>
            <SheetTitle>Editor Sidebar</SheetTitle>
          </VisuallyHidden>
          <TabList />
        </SheetContent>
        <SheetContent
          showCloseButton={false}
          side="right"
          style={{ ...style, zIndex: 40, width: "320px", marginRight: "64px" }}
          className={clsx(
            "w-80 shadow-none p-0 bg-background h-full transition-all overflow-hidden ",
            { hidden: state.editor.previewMode },
          )}
        >
          <VisuallyHidden>
            <SheetTitle>Editor Sidebar Panel</SheetTitle>
          </VisuallyHidden>

          <div className="grid gap-4 h-full pb-26 overflow-auto">
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Media">
              <MediaBucketTab subaccountId={subaccountId} />
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="text-left p-6 ">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  You can drag and drop components on the canvas
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
}
