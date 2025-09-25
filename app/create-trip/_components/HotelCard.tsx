"use client"

import axios from 'axios'
import { ExternalLink, Star, Wallet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { imageURLStore } from '@/store/useImageURLStore'


const HotelCard = ({ hotel }: { hotel: Hotel }) => {

  const CreateImgURL = useMutation(api.imageUrlList.CreateImageURL)
  const imageURLs = imageURLStore(state => state.imageURLs)
  const addImage = imageURLStore(state => state.addImage)

  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if (!hotel) return
    const existingURL = imageURLs.find(img => img.name === hotel.hotel_name)
    if (existingURL) {
      setUrl(existingURL.url)
      return
    }
    GetGooglePlace()
  }, [hotel, imageURLs])

  const GetGooglePlace = async () => {
    const res = await axios.post('/api/google-place-detail', { placeName: hotel?.hotel_name })
    const safeUrl = res?.data ? res.data : undefined

    if (safeUrl) {
      setUrl(safeUrl)
      addImage({ name: hotel?.hotel_name, type: "hotel", url: safeUrl })
      await CreateImgURL({ name: hotel?.hotel_name, type: "hotel", url: safeUrl })
    }
  }

  return (
    <div className="flex flex-col gap-1">
      
      <div className="relative w-full aspect-[4/3] md:aspect-video rounded-xl shadow-lg overflow-hidden mb-2 ">
        {/* <Image src={url ? url : 'https://assets.aceternity.com/templates/startup-1.webp'} alt='hotel image'
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-cover' fill /> */}
        
        <Image src={url? url : 'https://assets.aceternity.com/templates/startup-1.webp'} alt='hotel image'
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-cover' fill/>
      </div>
      <h2 className="text-xl text-teal-800 line-clamp-1">{hotel?.hotel_name}</h2>
      <h2 className="text-md font-light line-clamp-1">{hotel?.hotel_address}</h2>
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