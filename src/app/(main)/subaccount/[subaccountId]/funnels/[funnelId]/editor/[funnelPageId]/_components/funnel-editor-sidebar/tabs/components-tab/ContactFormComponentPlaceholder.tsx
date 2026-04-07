import { EditorBtns } from '@/lib/constants'
import { Contact2Icon } from 'lucide-react'

type Props = {}

export default function ContactFormComponentPlaceholder({}: Props) {
 const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'contactForm')}
      className=" h-10 w-10 bg-muted rounded-lg flex items-center justify-center"
    >
      <Contact2Icon
        size={20}
        className="text-muted-foreground"
      />
    </div>
  )
}
