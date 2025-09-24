"use client"

import { Map, Plane } from 'lucide-react'
import React, { useState } from 'react'
import ChatBox from './_components/ChatBox'
import GlobalMap from './_components/GlobalMap'
import Itinerary from './_components/Itinerary'


const CreateTrip = () => {

  const [showMap, setShowMap] = useState(false)

  return (
    // <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-10'>
    <div className='flex flex-row p-10'>
      {/* left side of chat box */}
      <div className="basis-[42%] pr-2">
        <ChatBox/>
      </div>

      {/* right side shows map and trip plan */}
      <div className="basis-[58%] pl-5 relative">
        {showMap ? <GlobalMap /> : <Itinerary />}
        <div onClick={() => setShowMap(!showMap)}
          className="group w-14 h-10 bg-teal-700 border rounded-xl absolute bottom-10 left-[50%] flex items-center justify-center cursor-pointer border-teal-700 hover:shadow-xl hover:shadow-teal-500">
          {showMap ? <Plane size={30} className='text-white' /> : <Map className='text-white'/>}
          <span className="absolute ml-2 w-18 -top-7 left-1/2 -translate-x-1/2 text-red-700 font-bold text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap transition-all duration-200">
            {showMap ? "Show Trip" : "Show Map"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CreateTrip