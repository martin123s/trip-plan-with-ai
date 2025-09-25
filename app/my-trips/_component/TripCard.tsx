import React, { useEffect, useState } from 'react'
import { ArrowBigRight } from 'lucide-react'
import Image from 'next/image'
import { TripDoc } from '@/store/useTripStore'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { imageURLStore } from '@/store/useImageURLStore'
import Link from 'next/link'
import axios from 'axios'



const TripCard = ({ trip }: { trip: TripDoc }) => {

  const [url, setUrl] = useState<string>()
  const CreateImgURL = useMutation(api.imageUrlList.CreateImageURL)
  const imageURLs = imageURLStore(state => state.imageURLs)
  const addImage = imageURLStore(state => state.addImage)
  const destination = trip?.tripDetails?.destination?.split(",")[0]

  useEffect(() => {
    if (!trip) return
    const existingURL = imageURLs.find(img => img.name === destination)
    
    if (existingURL) {
      setUrl(existingURL.url)
      return
    }
    GetGooglePlace()
  }, [trip, imageURLs])


  const GetGooglePlace = async () => {
    const res = await axios.post('/api/google-place-detail', { placeName: destination})
    const safeUrl = res?.data ? res.data : undefined

    if (safeUrl) {
      setUrl(safeUrl)
      addImage({ name: destination, type: "city", url: safeUrl })
      await CreateImgURL({ name: destination, type: "city", url: safeUrl })
    }
  }


  return (
    <Link href={`/view-trip/${trip?.tripId}`}
      className="p-5 cursor-pointer hover:shadow-2xl hover:rounded-xl hover:border-b" >
      <Image src={url ? url : 'https://assets.aceternity.com/templates/startup-3.webp'} alt={"city name"} className='rounded-xl object-cover w-full h-[270px]' width={400} height={270} />

      <div className="flex flex-row items-center gap-3 mt-5 w-full text-pink-700">
        <span className="truncate">{trip?.tripDetails?.origin}</span>
        <ArrowBigRight className="text-black flex-shrink-0" size={20} />
        <span className="truncate">{trip?.tripDetails?.destination}</span>
      </div>

      <h2 className="flex flex-row gap-1 my-1 text-gray-500">
        <span className="">{trip?.tripDetails?.duration}</span>
        <p className="">with</p>
        <span className="truncate max-w-[70%]">{trip?.tripDetails?.budget} Budget</span>
      </h2>

    </Link>
  )
}

export default TripCard