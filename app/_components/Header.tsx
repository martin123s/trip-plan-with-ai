"use client"

import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const menu = [ { name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' },
  { name: 'Contact us', path: '/contact-us' } ]
  

const Header = () => {

  const { user } = useUser()
  const path = usePathname()

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
      
      {/* sign in */}
      <div className="flex gap-5">
        {!user ?
          <SignInButton mode='modal'>
            <Button className='cursor-pointer hover:text-destructive'>
              Get Started
            </Button>
          </SignInButton> :
          path === '/create-trip' ? 
          <Link href={'/my-trips'}>
            <Button className='cursor-pointer hover:shadow-lg hover:shadow-teal-700'>
              My Trips
            </Button>
          </Link> :
          <Link href={'/create-trip'}>
            <Button className='cursor-pointer hover:shadow-lg hover:shadow-teal-700'>
              Create New Trip
            </Button>
          </Link>
        }
        <UserButton />
      </div>
    </div>
  )
}

export default Header
