import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'

const Layout = ({children}:{
    children: ReactNode
}) => {
  return (
    <div>
        <Header />
        
        <main>
            {children}
        </main>
        
        <Footer />
    </div>
  )
}

export default Layout