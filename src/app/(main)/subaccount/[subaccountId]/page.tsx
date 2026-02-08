'use client'
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const SubAccountMainPage = (props: Props) => {
    const {subaccountId} = useParams()
  return (
    <div>{subaccountId}</div>
  )
}

export default SubAccountMainPage