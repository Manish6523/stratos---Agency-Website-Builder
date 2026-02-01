import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React, { Children } from 'react'

const Layout = ({children} : {
    children: React.ReactNode
}) => {
    return (
        <ClerkProvider appearance={{ theme: dark }}>
            {children}
        </ClerkProvider>
    )
}

export default Layout
