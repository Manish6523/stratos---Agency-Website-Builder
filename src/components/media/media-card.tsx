"use client"
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import { Copy, MoreVertical, Trash, Calendar } from "lucide-react";
import { deleteMedia, saveActivityLogsNotification } from "@/lib/queries";
import { toast } from "sonner";
import { Media } from "../../../generated/prisma";

type Props = {
  file: Media;
}

export default function MediaCard({ file }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog>
      <DropdownMenu>
        <article className="group relative w-full aspect-square overflow-hidden rounded-xl bg-muted border border-border/50 transition-all hover:shadow-xl">
          {/* Image Container */}
          <Image
            src={file.link}
            fill
            alt={file.name}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Top-right Action Menu Overlay */}
          <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenuTrigger asChild>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 cursor-pointer">
                <MoreVertical size={18} />
              </div>
            </DropdownMenuTrigger>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-2 group-hover:translate-y-0 transition-transform">
            <p className="text-white font-semibold truncate text-sm">
              {file.name}
            </p>
            <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Calendar size={12} className="text-gray-300" />
              <p className="text-[10px] text-gray-300">
                {file.createdAt.toDateString()}
              </p>
            </div>
          </div>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(file.link)
                toast.success('Copied!', { description: 'Link saved to clipboard' })
              }}
            >
              <Copy size={14} /> Copy Link
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2 cursor-pointer text-destructive focus:text-destructive">
                <Trash size={14} /> Delete File
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </article>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Permanent Delete</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the file from our servers forever. Any subaccounts referencing this URL will see a broken image.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive/90"
            onClick={async () => {
              setLoading(true)
              const response = await deleteMedia(file.id)
              await saveActivityLogsNotification({
                agencyId: undefined,
                description: `Deleted a media file | ${response?.name}`,
                subAccountId: response.subAccountId,
              })
              toast.success('Deleted', { description: 'File removed successfully' })
              setLoading(false)
              router.refresh()
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}