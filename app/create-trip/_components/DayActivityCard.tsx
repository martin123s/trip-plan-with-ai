"use client"


import axios from 'axios'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Activity } from './ChatBox'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { imageURLStore } from '@/store/useImageURLStore'


const DayActivityCard = ({ act }: { act: Activity }) => {
  
  const CreateImgURL = useMutation(api.imageUrlList.CreateImageURL)
  const imageURLs = imageURLStore(state => state.imageURLs)
  const addImage = imageURLStore(state => state.addImage)

  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if (!act) return
    const existingURL = imageURLs.find(img => img.name === act?.place_name)
    
    if (existingURL) {
      setUrl(existingURL.url)
      return
    }
    GetGooglePlace()
  }, [act, imageURLs])

  const GetGooglePlace = async () => {
    const name = act?.place_name + ":" + act?.place_address
    const res = await axios.post('/api/google-place-detail', { placeName: name})
    const safeUrl = res?.data ? res.data : undefined

    if (safeUrl) {
      setUrl(safeUrl)
      addImage({ name: name, type: "place", url: safeUrl })
      await CreateImgURL({ name: name, type: "place", url: safeUrl })
    }
  }


  return (
    <div className="">
      <div className="relative w-full aspect-[4/3] md:aspect-video rounded-xl shadow-lg overflow-hidden mb-2 ">
        {/* <Image src={url ? url : 'https://assets.aceternity.com/templates/startup-2.webp'} alt={act.place_name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-cover' fill /> */}
        
        <Image src={url ? url : 'https://assets.aceternity.com/templates/startup-2.webp'} alt={act.place_name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-cover' fill />
        
      </div>
      <h2 className="font-semibold text-lg my-1 line-clamp-1">{act?.place_name}</h2>
      <p className="text-gray-500 line-clamp-2 text-sm">{act?.place_details}</p>
      <p className="text-green-700 flex gap-2 my-1">
        <Ticket />
        <span className='line-clamp-1'>{act?.ticket_price}</span>
      </p>
      <p className="flex gap-2 text-yellow-700">
        <Clock />
        <span className='line-clamp-1'>{act?.time_travel_each_location}</span>
      </p>
      <a href={`https://www.google.com/maps/search/?api=1&query=`+act?.place_name}>
        <div className='mt-2 cursor-pointer w-full flex justify-center items-center gap-2 border border-teal-700 bg-teal-700 p-1 rounded-lg shadow-xl text-white'>View Details <ExternalLink size={20} /></div>
      </a>
    </div>
  )
}

export default DayActivityCard