import { Button } from '@/components/ui/button'
import { Plane } from 'lucide-react'
import React from 'react'

const FinalUi = ({ viewTrip, disable }: any) => {
  return (
    <div className='flex flex-col items-center justify-center mt-6 p-6 bg-gray-100 rounded-lg shadow-lg'>
      <Plane className='text-yellow-700 text-4xl animate-bounce' />
      <h2 className="mt-3 text-lg font-semibold text-teal-700">
        Planning your dream trip...
      </h2>
      <p className="text-gray-500 text-sm text-center mt-1">
        Gathering best destinations, activities, and travel details for you!
      </p>
      <Button disabled={disable} onClick={viewTrip} className='mt-2 w-full'>View Trip</Button>
    </div>
  )
}

export default FinalUi