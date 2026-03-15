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
      <div className="p-6 pb-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Navigation size={18} /> Funnel Steps
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Navigate between the pages in your funnel sequence.
        </p>
      </div>

      <Separator className="my-2" />

      <ScrollArea className="flex-1 px-4">
        {loading ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            Loading pages...
          </div>
        ) : pages.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No pages found.
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-2">
            {pages.map((page, index) => {
              const isActive = pageDetails?.id === page.id;

              return (
                <Link
                  key={page.id}
                  href={`/subaccount/${subaccountId}/funnels/${funnelId}/editor/${page.id}`}
                  className={clsx(
                    "flex flex-col p-3 rounded-lg border transition-all hover:bg-muted/50 relative group cursor-pointer",
                    {
                      "bg-primary/10 border-primary text-primary": isActive,
                      "bg-background border-border": !isActive,
                    },
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {index + 1}. {page.name || "Untitled Page"}
                    </span>
                  </div>
                  <span className="text-xs opacity-60 mt-1 truncate max-w-[200px]">
                    /subaccount/{subaccountId}/funnels/{funnelId}/editor/
                    {page.id}
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

      <div className="p-6 pt-4 border-t border-border mt-auto">
        <Button
          className="w-full"
          variant="outline"
          onClick={() =>
            window.open(
              `/subaccount/${subaccountId}/funnels/${funnelId}`,
              "_blank",
            )
          }
        >
          <PlusCircle size={16} className="mr-2" />
          Manage Steps
        </Button>
      </div>
    </div>
  );
};

export default PagesTab;
