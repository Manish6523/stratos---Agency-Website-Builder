import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Database,
  Plus,
  SettingsIcon,
  Sparkles,
  SquareStackIcon,
} from "lucide-react";

type Props = {};

export default function TabList({}: Props) {
  return (
    <TabsList className=" flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-2 ">
      <TabsTrigger
        value="Settings"
        className="w-10 h-10 cursor-pointer p-3 data-[state=active]:bg-muted"
      >
        <SettingsIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="data-[state=active]:bg-muted w-10 h-10 cursor-pointer p-3"
      >
        <Plus />
      </TabsTrigger>

      <TabsTrigger
        value="Layers"
        className="w-10 h-10 cursor-pointer p-3 data-[state=active]:bg-muted"
      >
        <SquareStackIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        className="w-10 h-10 cursor-pointer p-3 data-[state=active]:bg-muted"
      >
        <Database />
      </TabsTrigger>
      <TabsTrigger
        value="AI"
        className="w-10 h-10 cursor-pointer p-3 data-[state=active]:bg-muted"
      >
        <Sparkles />
      </TabsTrigger>
    </TabsList>
  );
}
