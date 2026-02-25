import FunnelDetails from '@/components/forms/funnel-details'
import { Funnel } from '../../../../../../../../generated/prisma/client'
type Props = {
  subaccountId: string
  defaultData: Funnel
}

export default function FunnelSettings({ subaccountId, defaultData }: Props) {

  return (
    <FunnelDetails
      subAccountId={subaccountId}
      defaultData={defaultData}
    />
  )
}
