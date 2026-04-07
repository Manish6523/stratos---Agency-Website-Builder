import { EditorBtns } from '@/lib/constants'
import Image from 'next/image'

type Props = {}

export default function CheckoutPlaceholder({ }: Props) {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'paymentForm')}
      className=" h-10 w-10 bg-muted rounded-lg flex items-center justify-center"
    >
      <Image
        src="/razorpaylogo.png"
        height={40}
        width={40}
        alt="razorpay logo"
        className="object-cover"
      />
    </div>
  )
}
