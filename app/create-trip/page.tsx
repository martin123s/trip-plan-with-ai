import React from 'react'
import ChatBox from './_components/ChatBox'

const CreateTrip = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-10'>
      {/* left side of chat box */}
      <div className="">
        <ChatBox/>
      </div>

      {/* right side shows map and trip plan */}
      <div className="">
        map and trip plan display 
      </div>
    </div>
  )
}

export default CreateTrip