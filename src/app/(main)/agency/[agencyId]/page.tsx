"use client";
import { useParams } from 'next/navigation'
import React from 'react'

const AgentId = () => {
const {agencyId} = useParams();
console.log(agencyId)
  return (
    <div>
      <p>Hello from Agency Page</p>
      <p>Agency ID: {agencyId || 'Not found'}</p>
    </div>
  )
}

export default AgentId