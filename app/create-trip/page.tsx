import React from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'

const CreateTrip = () => {
  return (
    // <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-10'>
    <div className='flex flex-row p-10'>
      {/* left side of chat box */}
      <div className="basis-[42%] pr-2">
        <ChatBox/>
      </div>

      {/* right side shows map and trip plan */}
      <div className="basis-[58%] pl-2">
        <Itinerary/>
      </div>
    </div>
  )
}

export default CreateTrip