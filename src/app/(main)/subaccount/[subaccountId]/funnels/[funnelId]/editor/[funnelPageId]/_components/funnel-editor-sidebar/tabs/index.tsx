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

export default function TabList({}: Props) {
  return (
    <TabsList className="flex items-center flex-col w-full bg-transparent h-fit gap-1">
      <TabsTrigger
        value="Settings"
        title="Settings"
        className="w-8 h-8 cursor-pointer rounded-lg hover:bg-white/10 p-0 data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-colors"
      >
        <SettingsIcon className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="Layers"
        title="Layers"
        className="w-8 h-8 cursor-pointer rounded-lg hover:bg-white/10 p-0 data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-colors"
      >
        <SquareStackIcon className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        title="Components"
        className="w-8 h-8 cursor-pointer rounded-lg hover:bg-white/10 p-0 data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-colors"
      >
        <Plus className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        title="Media"
        className="w-8 h-8 cursor-pointer rounded-lg hover:bg-white/10 p-0 data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-colors"
      >
        <Database className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="AI"
        title="AI Builder"
        className="w-8 h-8 cursor-pointer rounded-lg hover:bg-white/10 p-0 data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-colors"
      >
        <Sparkles className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="Templates"
        title="Templates"
        className="w-8 h-8 cursor-pointer rounded-lg hover:bg-white/10 p-0 data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-colors"
      >
        <PanelsTopLeft className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="Pages"
        title="Pages"
        className="w-8 h-8 cursor-pointer rounded-lg hover:bg-white/10 p-0 data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-colors"
      >
        <LayoutTemplate className="w-4 h-4" />
      </TabsTrigger>
    </TabsList>
  );
}
