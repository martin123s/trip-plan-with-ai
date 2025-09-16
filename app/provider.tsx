"use client";

import React, { useEffect } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs';
import { userStore } from '@/store/useUserStore';

const Provider = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  
  const CreateUser = useMutation(api.user.CreateNewUser)
  const { user } = useUser()
  const updateUser = userStore((state:any) => state.updateUser)

  const handleCreateUser = async () => {
    if (user) {
      const existing = await CreateUser({
        name: user?.fullName ?? '',
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        imageURL: user?.imageUrl
      })
      updateUser(existing)
    }
  }

  useEffect(() => {
    user && handleCreateUser()
  }, [user])

  return (
    <div>
      <Header/>
      { children }
    </div>
  )
}

export default Provider
