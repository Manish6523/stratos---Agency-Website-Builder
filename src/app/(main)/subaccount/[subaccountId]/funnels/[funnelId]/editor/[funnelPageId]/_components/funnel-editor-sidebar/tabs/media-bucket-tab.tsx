'use client'
import MediaComponent from '@/components/media'
import { getMedia } from '@/lib/queries'
import { GetMediaFiles } from '@/lib/types'
import React, { useEffect, useState } from 'react'

type Props = {
  subaccountId: string
}

export default function MediaBucketTab({ subaccountId }: Props) {
  const [data, setdata] = useState<GetMediaFiles>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(subaccountId)
      setdata(response)
    }
    fetchData()
  }, [subaccountId])

  return (
    <div className="h-full overflow-auto px-3 pb-4">
      <MediaComponent
        data={data}
        subaccountId={subaccountId}
        isSidebar={true}
      />
    </div>
  )
}
