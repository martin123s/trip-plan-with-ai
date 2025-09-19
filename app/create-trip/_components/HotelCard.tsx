"use client"

import axios from 'axios'
import { ExternalLink, Star, Wallet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'


const HotelCard = ({ hotel }: { hotel: Hotel }) => {

  const [url, setUrl] = useState<string>()

  useEffect(() => {
    hotel && GetGooglePlace()
  }, [hotel])

  const GetGooglePlace = async() => {
    const res = await axios.post('/api/google-place-detail', { placeName: hotel?.hotel_name })

    // if(!res?.data?.error) return
    const safeUrl = res?.data ? res.data : undefined
    setUrl(safeUrl)
  }

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl text-teal-800">{hotel?.hotel_name}</h2>
      <Image src={url ? url : 'https://assets.aceternity.com/templates/startup-1.webp'} alt='hotel image' width={400} height={400} className='rounded-xl shadow-lg object-cover mb-2' />
      <h2 className="text-md font-light">{hotel?.hotel_address}</h2>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 text-yellow-700"><Wallet />{hotel?.price_per_night} / night</p>
        <p className="flex gap-2 text-blue-700"><Star />{hotel?.rating}</p>
      </div>
      {/* <p className="line-clamp-2 text-gray-500">{hotel?.description}</p> */}
      <Link href={`https://www.google.com/maps/search/?api=1&query=`+hotel?.hotel_name}>
        <div className='mt-2 cursor-pointer w-full flex justify-center items-center gap-2 border border-teal-700 bg-teal-700 p-1 rounded-lg shadow-xl text-white'>View Details <ExternalLink size={20} /></div>
      </Link>
    </div>
  )
}

export default HotelCard