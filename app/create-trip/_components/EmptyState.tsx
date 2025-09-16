import { suggestions } from '@/app/_components/Hero'
import React from 'react'

const EmptyState = ({onSelectOption}: any) => {
  return (
    <div className='mt-7'>
      <h2 className="text-3xl text-center font-semibold">
        Start Planning Your <span className='text-red-500 mx-1'>New Trip</span> with AI
      </h2>
      <p className="text-center mt-2 text-gray-500">
        Let our AI trip planner guide you step by step. Answer a few simple questions, and get a personalized travel plan instantly.
      </p>

      <div className="flex flex-col gap-4 mt-5">
        {suggestions.map((sgt, idx) => (
          <div key={idx} onClick={() => onSelectOption(sgt.title)}
            className="flex items-center gap-2 border-b-2 rounded-full p-2 cursor-pointer hover:border-teal-700 hover:shadow-lg hover:shadow-teal-700 hover:scale-105 transition-all">
            {sgt.icon}
            <h2 className='text-lg'>{sgt.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmptyState
