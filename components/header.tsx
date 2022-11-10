import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header>
          <div className="container">
            <div className="flex items-center h-14 border-b container">
              <Link href="/">
                <a className='flex'>
                  <Image src="/logo.svg" width={105} height={40} alt="Logoipsum" />
                </a>
              </Link>
              <span className="flex-1" />
              <span className='bg-slate-300 rounded-full w-9 h-9'></span>
            </div>
          </div>
        </header>
  )
}

export default Header