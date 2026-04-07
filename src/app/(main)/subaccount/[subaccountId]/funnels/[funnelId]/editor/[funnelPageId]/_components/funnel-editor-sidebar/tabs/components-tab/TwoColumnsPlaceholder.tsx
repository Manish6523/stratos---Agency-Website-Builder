import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const TwoColumnsPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, '2Col')}
      className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 3" className="text-muted-foreground">
        <rect x="2" y="3" width="9" height="18" rx="3" />
        <rect x="13" y="3" width="9" height="18" rx="3" />
      </svg>
    </div>
  )
}

export default TwoColumnsPlaceholder
