"use client";
import React, { useEffect, useState } from "react";
import { useEditor } from "@/providers/editor/editor-provider";
import { getFunnel } from "@/lib/queries";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import clsx from "clsx";
import { Copy, Navigation, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FunnelPage } from "../../../../../../../../../../../../generated/prisma/client";

const PagesTab = () => {
  const { funnelId, subaccountId, pageDetails } = useEditor();
  const [pages, setPages] = useState<FunnelPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const funnel = await getFunnel(funnelId);
        if (funnel && funnel.FunnelPages) {
          setPages(funnel.FunnelPages);
        }
      } catch (error) {
        console.error("Error fetching funnel pages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, [funnelId]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-3 pb-1">
        <h2 className="text-xs font-semibold flex items-center gap-1.5">
          <Navigation size={13} /> Funnel Steps
        </h2>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Navigate between pages
        </p>
      </div>

      <Separator className="my-1" />

      <ScrollArea className="flex-1 px-2">
        {loading ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            Loading pages...
          </div>
        ) : pages.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No pages found.
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 p-1">
            {pages.map((page, index) => {
              const isActive = pageDetails?.id === page.id;

              return (
                <Link
                  key={page.id}
                  href={`/subaccount/${subaccountId}/funnels/${funnelId}/editor/${page.id}`}
                  className={clsx(
                    "flex flex-col p-2 rounded-md border transition-all hover:bg-muted/50 relative group cursor-pointer",
                    {
                      "bg-primary/10 border-primary text-primary": isActive,
                      "bg-background border-border": !isActive,
                    },
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[11px]">
                      {index + 1}. {page.name || "Untitled"}
                    </span>
                  </div>
                  <span className="text-[9px] opacity-50 mt-0.5 truncate max-w-[160px]">
                    /{page.pathName || page.id.slice(0, 8)}
                  </span>

                  {isActive && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </ScrollArea>

      <div className="p-3 pt-2 border-t border-border mt-auto">
        <Button
          className="w-full h-7 text-[10px]"
          variant="outline"
          size="sm"
          onClick={() =>
            window.open(
              `/subaccount/${subaccountId}/funnels/${funnelId}`,
              "_blank",
            )
          }
        >
          <PlusCircle size={12} className="mr-1" />
          Manage Steps
        </Button>
      </div>
    </div>
  );
};

export default PagesTab;
