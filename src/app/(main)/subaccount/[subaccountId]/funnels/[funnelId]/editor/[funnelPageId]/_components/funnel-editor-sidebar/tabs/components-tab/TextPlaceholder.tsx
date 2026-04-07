import { EditorBtns } from '@/lib/constants'
import { TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const TextPlaceholder = (props: Props) => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, 'text')
      }}
      className=" h-10 w-10 bg-muted rounded-lg flex items-center justify-center"
    >
      <TypeIcon
        size={20}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default TextPlaceholder
