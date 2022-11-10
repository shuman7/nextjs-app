import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../context/auth'
import UserMenu from './user-menu'

const Header = () => {
  const {user, isLoading} = useAuth();


  if (isLoading) {
    return null;
  }
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
              {user ? (<UserMenu />) : (<Link href="/login"><a>ログイン</a></Link>)}
            </div>
          </div>
        </header>
  )
}

export default Header