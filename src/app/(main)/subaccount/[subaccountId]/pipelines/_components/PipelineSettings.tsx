'use client'
import React from 'react'
import PipelineInfobar from './PipelineInfoBar'
import CreatePipelineForm from '@/components/forms/CreatePipelineForm'
import { Button } from '@/components/ui/button'
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
import { deletePipeline, saveActivityLogsNotification } from '@/lib/queries'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Pipeline } from '../../../../../../../generated/prisma'

type Props = {
  pipelineId: string
  subaccountId: string
  pipelines: Pipeline[]
}

export default function PipelineSettings({ pipelines, pipelineId, subaccountId }: Props) {
  const router = useRouter()

  return (
    <AlertDialog>
      <div>
        <div className="flex items-center justify-between mb-4">
          <AlertDialogTrigger asChild>
            <Button variant={'destructive'}>Delete Pipeline</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    const response = await deletePipeline(pipelineId)
                    await saveActivityLogsNotification({
                      agencyId: undefined,
                      description: `Deleted a pipeline | ${response.name}`,
                      subAccountId: subaccountId,
                    })
                    toast.success('Deleted', {
                      description: 'Pipeline is deleted',
                    })
                    router.replace(`/subaccount/${subaccountId}/pipelines`)
                  } catch (error) {
                    toast.error('Oppse!', {
                      description: 'Could not delete pipeline',
                    })
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </div>

        <CreatePipelineForm
          subaccountId={subaccountId}
          defaultData={pipelines.find((p) => p.id === pipelineId)}
        />
      </div>
    </AlertDialog>
  )
}
