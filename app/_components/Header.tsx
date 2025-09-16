"use client"

import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const menu = [ { name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' },
  { name: 'Contact us', path: '/contact-us' } ]
  

const Header = () => {

  const { user } = useUser()


  return (
    <div className='flex justify-between items-center mt-3 mx-2'>
      {/* logo */}
      <div className="flex gap-2 items-center">
        <Image src={'/logo.svg'} alt='logo' width={28} height={28} />
        <h2 className="font-bold text-2xl">AI Trip Planner</h2>
      </div>

      {/* menu */}
      <div className="flex gap-12 items-center">
        {menu.map((item, idx) => (
          <Link key={idx} href={item.path}>
            <h2 className="text-xl hover:scale-105 transition-all hover:text-destructive">{ item.name }</h2>
          </Link>
        )) }
      </div>
      
      {/* sign up */}
      {!user ?
        <SignInButton mode='modal'>
          <Button className='cursor-pointer hover:text-destructive'>
            Get Started
          </Button>
        </SignInButton> :
        <Link href={'/create-trip'}>
          <Button className='cursor-pointer hover:text-destructive'>
            Create New Trip
          </Button>
        </Link>
      }
    </div>
  )
}

export default Header
