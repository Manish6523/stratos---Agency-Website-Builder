"use client"
import { GetMediaFiles } from "@/lib/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import React from "react";
import MediaUploadButton from "./media-upload-button";
import MediaCard from "./media-card";
import { FolderSearch } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  data: GetMediaFiles;
  subaccountId: string;
  isSidebar?: boolean;
};

const MediaComponent = ({ data, subaccountId, isSidebar }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex justify-between items-center gap-2">
        <h1
          className={isSidebar ? "text-sm font-bold truncate" : "text-4xl"}
          onClick={() => {
            router.refresh();
          }}
        >
          Media Bucket
        </h1>
        <MediaUploadButton subaccountId={subaccountId} className={isSidebar ? "h-7 text-[10px] px-2" : ""} />
      </div>

      <Command className="bg-transparent overflow-visible">
        <CommandInput placeholder="Search for file name..." className={isSidebar ? "text-[10px] h-8" : ""} />
        <CommandList className="pb-40 max-h-full">
          <CommandEmpty>No Media Files</CommandEmpty>
          <CommandGroup heading="Media Files">
            <div className="flex flex-wrap gap-4 pt-4">
              {data?.Media.map((file) => (
                <CommandItem
                  key={file.id}
                  className={`p-0 w-full rounded-lg bg-transparent! font-medium! text-white! ${isSidebar ? "" : "max-w-75"}`}
                >
                  <MediaCard file={file} isSidebar={isSidebar} />
                </CommandItem>
              ))}
              {!data?.Media.length && (
                <div className="flex items-center justify-center w-full flex-col">
                  <FolderSearch
                    size={isSidebar ? 50 : 200}
                    className="dark:text-muted text-slate-300 mb-2"
                  />
                  <p className={isSidebar ? "text-muted-foreground text-[10px] text-center" : "text-muted-foreground"}>
                    Empty! no files to show.
                  </p>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default MediaComponent;
