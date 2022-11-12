import React, { ButtonHTMLAttributes, Children, ReactNode } from 'react'

const Button = ({
  children,
    ...props
  }: ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
  }) => {
  return (
    <button 
      className='px-4 py-2 rounded-full bg-blue-700 text-white disabled:opacity-30' 
      {...props}
    >
      {children}
    </button>
  )
}

export default Button