import { Menu, Transition } from '@headlessui/react'
import { forwardRef, Fragment, ReactNode, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {logout} from '../lib/auth'
import { useAuth } from '../context/auth'
import { UserIcon } from '@heroicons/react/24/outline'

const items = [
    {
        label: 'プロフィール',
        href: '/profile'
    },
    {
        label: '設定',
        href: '/settings'
    },
]

const MyLink = forwardRef<
    HTMLAnchorElement, 
    {
        href: string;
        className: string;
        children: ReactNode;
    }
    >((props, ref) => {
        let { href, children, className,  ...rest } = props;
        return (
            <Link href={href}>
                <a ref={ref} {...rest} className={className}>
                    {children}
                </a>
            </Link>
        )
  })

  MyLink.displayName = 'MyLink'

const UserMenu = () => {
    const {user} = useAuth();
    if (!user) {
        return null;
    }

  return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="bg-slate-300 block rounded-full w-9 h-9 overflow-hidden relative">
              { user.avatarURL ? (
                <img 
                    src={ user.avatarURL } 
                    className="w-full h-full object-cover block" 
                    alt="ユーザープロフィール画像"
                />
                ) : <UserIcon className="w-6 h-6 object-cover block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              }
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
                {items.map((item) => (
                    <Menu.Item key={item.label}>
                        {({ active }) => (
                            <MyLink 
                                className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                href={item.href}
                            >
                                {item.label}
                            </MyLink>
                    )}
                  </Menu.Item>
                ))}
            </div>
            <div className="px-1 py-1">
                <Menu.Item>
                    {({ active }) => (
                        <button className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={logout}
                        >
                        ログアウト
                        </button>
                    )}
                </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  )
}
export default UserMenu