import React, { useEffect, useState } from 'react'
import { ArrowBigRight } from 'lucide-react'
import Image from 'next/image'
import { TripDoc } from '@/store/useTripStore'
import axios from 'axios'
import { imageURLStore, DestinationURL } from '@/store/useImageURLStore'
import Link from 'next/link'

const TripCard = ({ trip }: { trip: TripDoc }) => {

  const addDestImage = imageURLStore(state => state.addDestImage)
  const destImageURL = imageURLStore(state => state.destImageURL)
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if(!trip) return
    const exists = destImageURL.find(
      (d) => d.tripId === trip.tripId && d.dest_image_url
    )
    if (exists) {
      setUrl(exists.dest_image_url)
      return
    }
    GetGooglePlace()
  }, [trip])

  const GetGooglePlace = async () => {
    const name = trip?.tripDetails?.destination?.split(",")[0]
    const res = await axios.post('/api/google-place-detail', { placeName: name })
    const safeUrl = res?.data ? res.data : undefined
    setUrl(safeUrl)

    const newDest: DestinationURL = {
      destination: name,
      dest_image_url: safeUrl,
      tripId: trip?.tripId ?? "",
    }
    addDestImage(newDest)
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