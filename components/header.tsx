import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../context/auth'
import Sidebar from './sidebar'
import UserMenu from './user-menu'
import { Bars3Icon } from '@heroicons/react/24/outline'

const Header = () => {
  const {user, isLoading} = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  if (isLoading) {
    return null;
  }

  const closeModal = () => {
    setIsSidebarOpen(false);
  }
  const openModal = () => {
    setIsSidebarOpen(true);
  }

  return (
    <>
      <header>
          <div className="container">
            <div className="flex items-center h-14 border-b container">
              <button type='button' className="p-2 mr-1" onClick={openModal}>
                <Bars3Icon className="w-10 h-10" />
              </button>
              <Link href="/">
                <a className='flex'>
                  <Image src="/logo.svg" width={105} height={40} alt="Logoipsum" />
                </a>
              </Link>
              <span className="flex-1" />
              {user ? (<UserMenu />
              ) : (
                <Link href="/login">
                  <a>ログイン</a>
                </Link>
              )}
            </div>
          </div>
        </header>
        <Sidebar isOpen={isSidebarOpen} closeModal={closeModal}/>
      </>
  )
}

export default Header;