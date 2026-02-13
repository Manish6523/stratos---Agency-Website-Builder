import React from 'react'

type Props = {
  params: Promise<{
    subaccountId: string
  }>
}
  
const SubaccountPageId = async (props: Props) => {
  const { subaccountId } = await props.params;

  return (
    <div>{subaccountId}</div>
  )
}

export default SubaccountPageId