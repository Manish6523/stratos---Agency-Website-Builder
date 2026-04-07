"use client"

import { useModal } from '@/providers/ModalProvider'
import React from 'react'
import { Button } from '../ui/button'
import CustomModal from '../global/custom-modal'
import UploadMediaForm from '../forms/upload-media'

type Props = {
  subaccountId: string
  className?: string
}

const MediaUploadButton = ({subaccountId, className}: Props) => {
  const {isOpen, setOpen, setClose} = useModal()
  return (
    <Button
      className={className}
      onClick={()=>{
        setOpen(<CustomModal 
          title='Upload Media' 
        subHeading='Upload a files to your media bucket.'>
          <UploadMediaForm subaccountId={subaccountId} />
        </CustomModal>)
      }}
    >
      upload
    </Button>
  )
}

export default MediaUploadButton