import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

type TripDurationUiProps = {
  onSelectOption: (days: string) => void
}

const TripDurationUiCopy = ({ onSelectOption }: TripDurationUiProps) => {

  const [days, setDays] = useState<number>(3)

  return (
    <div className="flex flex-col gap-4 items-center p-3 mt-4 mb-2 rounded-2xl bg-gray-50 border-2 border-teal-700 text-gray-700 font-semibold shadow-lg">
      <h2 className="text-lg">How many days do you want to travel ? </h2>
      <div className="flex items-center gap-4">
        <Minus className={`cursor-pointer border-2 border-gray-400 rounded-full p-1 w-9 h-9 ${days <= 1 && "opacity-50 cursor-not-allowed"}`} onClick={() => setDays(pre => {
          if (pre <= 1) {
            return 1
          }
          return pre - 1
        })}/>
        <div className="text-xl">{days} Days</div>
        <Plus className={`cursor-pointer border-2 border-gray-400 rounded-full p-1 w-9 h-9 ${days >= 15 && "opacity-50 cursor-not-allowed"}`} onClick={() => setDays(pre => {
          if (pre >= 15) return 15
          return pre+1
        })}/>
      </div>
      <Button className='cursor-pointer hover:bg-red-500'
        onClick={() => onSelectOption(`${days} Days`) }>Confirm</Button>
      
    </div>
  )
}

export default TripDurationUiCopy