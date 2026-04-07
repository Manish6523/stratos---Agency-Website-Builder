import { EditorBtns } from '@/lib/constants'

type Props = {}

export default function ContainerPlaceholder({ }: Props) {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'container')}
      className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" className="text-muted-foreground">
        <rect x="3" y="3" width="18" height="18" rx="4" />
      </svg>
    </div>
  )
}
