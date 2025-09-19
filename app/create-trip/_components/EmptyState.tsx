import React from 'react'
import { Globe, Globe2, Landmark, Plane } from 'lucide-react'

export const suggestions = [
  {
    title: 'Create New Trip', 
    icon: <Globe2 className='text-blue-500 h-5 w-5'/>
  },
  {
    title: 'Where to go', 
    icon: <Plane className='text-green-500 h-5 w-5'/>
  },
  {
    title: 'Discover Hiddens', 
    icon: <Landmark className='text-orange-500 h-5 w-5'/>
  },
  {
    title: 'Adventure Trip', 
    icon: <Globe className='text-yellow-600 h-5 w-5'/>
  }
]

const EmptyState = ({onSelectOption}: any) => {
  return (
    <div className='mt-7'>
      <h2 className="text-3xl text-center font-semibold">
        Start Planning Your <span className='text-red-500 mx-1'>New Trip</span> with AI
      </h2>
      <p className="text-center mt-2 text-gray-500">
        Let our AI trip planner guide you step by step. Answer a few simple questions, and get a personalized travel plan instantly.
      </p>

      <div className="grid grid-cols-4 gap-4 mt-7">
        {suggestions.map((sgt, idx) => (
          <div key={idx} onClick={() => onSelectOption(sgt.title)}
            className="items-center border-b-2 rounded-lg p-2 cursor-pointer hover:border-teal-700 shadow-lg hover:shadow-teal-700 bg-gray-50">
            {sgt.icon}
            <h2 className='text-sm mt-2'>{sgt.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmptyState
