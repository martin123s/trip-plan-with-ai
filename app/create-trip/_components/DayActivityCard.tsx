"use client"


import axios from 'axios'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Activity } from './ChatBox'


const DayActivityCard = ({ act }: { act: Activity }) => {
  
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    act && GetGooglePlace()
  }, [act])

  const GetGooglePlace = async() => {
    const res = await axios.post('/api/google-place-detail', { placeName: act?.place_name + ":" + act?.place_address })

    // if(!res?.data?.error) return
    const safeUrl = res?.data ? res.data : undefined
    setUrl(safeUrl)
  }


  return (
    <div className="">
      <div className="relative w-full aspect-[4/3] md:aspect-video rounded-xl shadow-lg overflow-hidden mb-2 ">
        <Image src={url ? url : 'https://assets.aceternity.com/templates/startup-2.webp'} alt={act.place_name}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-cover' fill/>
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