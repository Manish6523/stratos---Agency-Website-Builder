import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Userbutton = () => {
  return (
<UserButton 
  appearance={{
    elements: {
      userButtonPopoverActionButton__manageAccount: {
        display: "none",
      },
    },
  }}
/>  )
}

export default Userbutton