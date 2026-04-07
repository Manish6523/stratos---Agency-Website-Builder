import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import React from 'react'

type Props = {}

const VideoPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'video')}
      className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center"
    >
      <Youtube
        size={20}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default VideoPlaceholder
