"use client"

import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown, Globe, Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


export const suggestions = [
  {
    title: 'Create New Trip', 
    icon: <Globe2 className='text-blue-500 h-5 w-5'/>
  },
  {
    title: 'Where to go', 
    icon: <Plane className='text-green-500 h-5 w-5'/>
  },
  {
    title: 'Discover Hidden gems', 
    icon: <Landmark className='text-orange-500 h-5 w-5'/>
  },
  {
    title: 'Adventure Destination', 
    icon: <Globe className='text-yellow-600 h-5 w-5'/>
  }
]

const Hero = () => {

  const { user } = useUser()
  const router = useRouter()
  const onSend = () => {
    if (!user) {
      router.push('/sign-in')
      return
    }
    router.push('/create-trip')
  }

  return (
    <div className='mt-24 items-center w-full flex justify-center'>
      {/* content */}
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className='text-xl md:text-5xl font-bold'>
          Hey, I'm your personal <span className='text-destructive'>Trip Planner</span>
        </h1>
        <p className="text-lg">Tell me where you want to go, and I will handle your trip plan in seconds</p>

        {/* input box */}
        <div className="">
          <div className="border rounded-2xl p-3 shadow-lg relative">
            <Textarea className='w-full h-32 bg-transparent resize-none border-none focus-visible:ring-0 shadow-none' placeholder='Create your trip from here' />
            <Button size={ 'icon' } className='cursor-pointer absolute bottom-6 right-6' onClick={onSend}>
              <Send/>
            </Button>
          </div>
        </div>

        {/* suggestions */}
        <div className="flex gap-5">
          {suggestions.map((sgt, idx) => (
            <div key={idx} className="flex items-center gap-2 border-b rounded-full p-2 cursor-pointer hover:border-teal-700 hover:shadow-lg hover:shadow-teal-700 hover:scale-105 transition-all">
              {sgt.icon}
              <h2>{sgt.title}</h2>
            </div>
          ))}
        </div>

        <h2 className='my-5 mt-18 flex gap-2 items-center text-xl'>Not sure where to start? <strong>See how it works</strong> <ArrowDown/></h2>

        {/* hero video */}
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.example.com/dummy-video"
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Dummy Video Thumbnail"
        />
      </div>

    </div>
  )
}

export default Hero
