import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Database,
  Plus,
  SettingsIcon,
  Sparkles,
  SquareStackIcon,
  LayoutTemplate,
  PanelsTopLeft,
} from "lucide-react";

type Props = {};

export default function TabList({ }: Props) {
  return (
    <TabsList className=" flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-2 ">
      <TabsTrigger
        value="Settings"
        title="Settings"
        className="w-10 h-10 cursor-pointer hover:bg-muted p-3 data-[state=active]:bg-muted"
      >
        <SettingsIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Layers"
        title="Layers"
        className="w-10 h-10 cursor-pointer hover:bg-muted p-3 data-[state=active]:bg-muted"
      >
        <SquareStackIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        title="Components"
        className="data-[state=active]:bg-muted w-10 h-10 cursor-pointer hover:bg-muted p-3"
      >
        <Plus />
      </TabsTrigger>

      <TabsTrigger
        value="Media"
        title="Media bucket"
        className="w-10 h-10 cursor-pointer hover:bg-muted p-3 data-[state=active]:bg-muted"
      >
        <Database />
      </TabsTrigger>

      <TabsTrigger
        value="AI"
        title="AI Builder"
        className="w-10 h-10 hover:bg-muted cursor-pointer p-3 data-[state=active]:bg-muted"
      >
        <Sparkles className="text-primary" />
      </TabsTrigger>
      <TabsTrigger
        value="Templates"
        title="Templates"
        className="w-10 h-10 hover:bg-muted cursor-pointer p-3 data-[state=active]:bg-muted"
      >
        <PanelsTopLeft />
      </TabsTrigger>
      <TabsTrigger
        value="Pages"
        title="Pages"
        className="w-10 h-10 cursor-pointer hover:bg-muted p-3 data-[state=active]:bg-muted"
      >
        <LayoutTemplate />
      </TabsTrigger>
    </TabsList>
  );
}
