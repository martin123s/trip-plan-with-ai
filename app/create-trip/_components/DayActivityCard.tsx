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

  // 'https://assets.aceternity.com/templates/startup-1.webp'
  return (
    <div className="">
      <Image src={ url ? url : 'https://assets.aceternity.com/templates/startup-4.webp'} width={400} height={200} alt={act.place_name} className='object-cover rounded-xl' />
      <h2 className="font-light text-lg my-1">{act?.place_name}</h2>
      <p className="text-gray-500 line-clamp-2">{act?.place_details}</p>
      <p className="text-green-700 flex gap-2 my-1"><Ticket />{act?.ticket_price}</p>
      <p className="flex gap-2 text-yellow-700"><Clock />{act?.time_travel_each_location}</p>
      <Link href={`https://www.google.com/maps/search/?api=1&query=`+act?.place_name}>
        <div className='mt-2 cursor-pointer w-full flex justify-center items-center gap-2 border border-teal-700 bg-teal-700 p-1 rounded-lg shadow-xl text-white'>View Details <ExternalLink size={20} /></div>
      </Link>
    </div>
  )
}

export default DayActivityCard