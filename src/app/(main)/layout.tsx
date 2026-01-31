import { ClerkProvider } from '@clerk/nextjs'
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
