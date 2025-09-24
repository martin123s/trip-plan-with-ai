"use client"

import React, { useEffect, useState } from 'react'
import { Timeline } from "@/components/ui/timeline";
import HotelCard from './HotelCard';
import DayActivityCard from './DayActivityCard';
import { tripStore } from '@/store/useTripStore';
import randomPic from '../../../public/pexels-apasaric-1285625.jpg'
import Image from 'next/image';



const Itinerary = () => {

  const currTrip = tripStore((state) => state.currTrip)
  const data = currTrip? [
    {
      title: "Hotels",
      content: (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 space-y-5'>
            {currTrip?.hotels.map((hotel, idx) => (
              <HotelCard hotel={hotel} key={idx} />
            ))}
          </div>
          <div className="mb-20"></div>
        </>
      ),
      
    },
    ...currTrip?.itinerary.map((dayData, idx) => ({
      title: `Day ${dayData?.day}`,
      content: (
        <div key={idx} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayData?.activities.map((act, index) => (
              <DayActivityCard key={index} act={ act } />
            ))}
          </div>
          <div className="mb-20"></div>
        </div>
      )
    }))
  ] : []

  
  return (
    <div className="relative w-full h-[82vh] overflow-auto">
      { currTrip ? <Timeline data={data} tripData={currTrip} /> 
        :
        <div className="w-full h-[82vh] relative flex flex-col">
          <div className="h-10 w-full"></div>
          <div className="relative flex-1">
            <Image src={randomPic} alt='see view picutre' fill className="object-cover rounded-lg" />
          </div>
        </div>
      }
    </div>
  );
}


export default Itinerary