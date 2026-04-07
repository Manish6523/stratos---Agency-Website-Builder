"use client";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { upsertFunnelPage } from "@/lib/queries";
import { FunnelsForSubAccount } from "@/lib/types";
import { useModal } from "@/providers/ModalProvider";
import { Check, ExternalLink, LucideEdit } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  DragDropContext,
  DragStart,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import Link from "next/link";
import FunnelPagePlaceholder from "@/components/icons/funnel-page-placeholder";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FunnelPage } from "../../../../../../../../generated/prisma/client";
import { toast } from "sonner";
import FunnelStepCard from "./funnel-step-card";
import CustomModal from "@/components/global/custom-modal";
import FunnelPageForm from "@/components/forms/funnel-page-form";
import FunnelEditor from "../editor/[funnelPageId]/_components/funnel-editor";
import EditorProvider from "@/providers/editor/editor-provider";
import { useRouter } from "next/navigation";

type Props = {
  funnel: FunnelsForSubAccount;
  subaccountId: string;
  pages: FunnelPage[];
  funnelId: string;
};

export default function FunnelSteps({
  funnelId,
  funnel,
  pages,
  subaccountId,
}: Props) {
  const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>(
    pages[0],
  );
  const { setOpen } = useModal();
  const [pagesState, setPagesState] = useState(pages);
  const router = useRouter();
  console.log(clickedPage?.id)
  useEffect(() => {
    setPagesState(pages);
    setClickedPage((prev) => {
      if (!prev) return prev;
      return pages.find((p) => p.id === prev.id) || prev;
    });
  }, [pages]);
  const onDragStart = (event: DragStart) => {
    //current chosen page
    const { draggableId } = event;
    const value = pagesState.find((page) => page.id === draggableId);
  };

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;

    //no destination or same position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    //change state
    const newPageOrder = [...pagesState]
      .toSpliced(source.index, 1)
      .toSpliced(destination.index, 0, pagesState[source.index])
      .map((page, idx) => {
        return { ...page, order: idx };
      });

    setPagesState(newPageOrder);
    newPageOrder.forEach(async (page, index) => {
      try {
        await upsertFunnelPage(
          subaccountId,
          {
            id: page.id,
            order: index,
            name: page.name,
          },
          funnelId,
        );
      } catch (error) {
        console.log(error);
        toast("Failed", {
          description: "Could not save page order",
        });
        return;
      }
    });

    toast("Success", {
      description: "Saved page order",
    });
  };

  return (
    <AlertDialog>
      <div className="flex border lg:flex-row! flex-col bg-background ">
        <aside className="md:sticky top-0 z-20 h-[calc(100vh-80px)] flex-[0.3] bg-background p-6 flex flex-col justify-between">
          <ScrollArea className="h-full">
            <div className="flex gap-4 items-center">
              <Check />
              Funnel Steps
            </div>
            {pagesState.length ? (
              <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Droppable
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                  droppableId="funnels"
                  direction="vertical"
                  key="funnels"
                >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {pagesState.map((page, idx) => (
                        <div
                          className="relative"
                          key={page.id}
                          onClick={() => setClickedPage(page)}
                        >
                          <FunnelStepCard
                            funnelPage={page}
                            index={idx}
                            key={page.id}
                            activePage={page.id === clickedPage?.id}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                No Pages
              </div>
            )}
          </ScrollArea>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setOpen(
                <CustomModal
                  title=" Create or Update a Funnel Page"
                  subHeading="Funnel Pages allow you to create step by step processes for customers to follow"
                >
                  <FunnelPageForm
                    subaccountId={subaccountId}
                    funnelId={funnelId}
                    order={pagesState.length}
                  />
                </CustomModal>,
              );
            }}
          >
            Create New Steps
          </Button>
        </aside>
        <aside className="flex-[0.7] bg-muted md:p-0 ">
          {!!pages.length ? (
            <Card className="h-full flex justify-between flex-col rounded-none pb-5">
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Page name</p>
                  <CardTitle>{clickedPage?.name}</CardTitle>
                  {clickedPage?.customName && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Custom Title: {clickedPage.customName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Publish</span>
                    <Switch
                      checked={!!clickedPage?.published}
                      onCheckedChange={async (val) => {
                        try {
                          if (!clickedPage?.id) return;
                          
                          setPagesState((prev) =>
                            prev.map((p) =>
                              p.id === clickedPage.id
                                ? { ...p, published: val }
                                : p
                            )
                          );
                          setClickedPage((prev) =>
                            prev ? { ...prev, published: val } : prev
                          );

                          await upsertFunnelPage(
                            subaccountId,
                            {
                              ...clickedPage,
                              published: val,
                            },
                            funnelId,
                          );
                          toast("Success", {
                            description: "Saved page status",
                          });
                          router.refresh();
                        } catch (error) {
                          toast("Failed", {
                            description: "Could not change status",
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </CardHeader>
                <CardDescription className="flex flex-col gap-4 md:px-4 px-3 mt-2 overflow-hidden">
                  <div className=" relative border-2 rounded-lg overflow-clip">
                    <div
                      onClick={() => {
                        if (clickedPage?.id) {
                          router.push(`/subaccount/${subaccountId}/funnels/${funnelId}/editor/${clickedPage.id}`);
                        }
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="dynamic-zoom max-h-[800px] group-hover:opacity-30 scale aspect-video overflow-hidden pointer-events-none">
                        {clickedPage?.id && (() => {
                          // Check if the page content is empty (only body with no children)
                          let isEmpty = true;
                          try {
                            if (clickedPage.content) {
                              const parsed = JSON.parse(clickedPage.content as string);
                              if (Array.isArray(parsed)) {
                                const body = parsed.find((el: any) => el.id === "__body");
                                isEmpty = !body || !Array.isArray(body.content) || body.content.length === 0;
                              }
                            }
                          } catch { isEmpty = true; }

                          if (isEmpty) {
                            return <FunnelPagePlaceholder />;
                          }

                          return (
                            <EditorProvider
                              subaccountId={subaccountId}
                              funnelId={funnelId}
                              pageDetails={clickedPage}
                            >
                              <FunnelEditor funnelPageId={clickedPage.id} liveMode={true} />
                            </EditorProvider>
                          );
                        })()}
                      </div>
                      <LucideEdit
                        size={50}
                        className="text-muted-foreground! absolute top-1/2 left-1/2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                      />
                    </div>

                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_SCHEME}${funnel.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${clickedPage?.pathName}`}
                      className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink size={15} />
                      <div className="w-64 overflow-hidden overflow-ellipsis ">
                        {process.env.NEXT_PUBLIC_SCHEME}
                        {funnel.subDomainName}.{process.env.NEXT_PUBLIC_DOMAIN}/
                        {clickedPage?.pathName}
                      </div>
                    </Link>
                  </div>

                  <FunnelPageForm
                    subaccountId={subaccountId}
                    defaultData={clickedPage}
                    funnelId={funnelId}
                    order={clickedPage?.order || 0}
                  />
                </CardDescription>
            </Card>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-muted-foreground">
              Create a page to view page settings.
            </div>
          )}
        </aside>
      </div>
    </AlertDialog>
  );
}
