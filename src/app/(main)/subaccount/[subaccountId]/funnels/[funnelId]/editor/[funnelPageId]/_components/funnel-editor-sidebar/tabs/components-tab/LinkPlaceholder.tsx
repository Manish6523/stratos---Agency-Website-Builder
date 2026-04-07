import { EditorBtns } from '@/lib/constants'
import { Link2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const LinkPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'link')}
      className=" h-10 w-10 bg-muted rounded-lg flex items-center justify-center"
    >
      <Link2Icon
        size={20}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default LinkPlaceholder
