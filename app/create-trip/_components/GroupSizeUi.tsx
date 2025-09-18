import { Group, House, Plane, Users } from 'lucide-react'
import React from 'react'

export const TravelList = [
  { id: 1, title: 'Just Me', desc: 'Single travelling', icon: <Plane className='text-yellow-700'/>, people: '1 Person' },
  { id: 2, title: 'A Couple', desc: 'Two travelers in tandem', icon: <Users className='text-red-700'/>, people: '2 People' },
  { id: 3, title: 'Family', desc: 'A group of fun loving adv', icon: <House className='text-indigo-700'/>, people: '3 to 10 People' },
  { id: 4, title: 'Friends', desc: 'A bunch of thrill-seekers', icon: <Group className='text-green-700'/>, people: '5 to 10 People' }
]

const GroupSizeUi = ({onSelectOption}: any) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-3 mb-1'>
      {TravelList.map((item, idx) => (
        <div onClick={() => onSelectOption(item.title + ":" + item.people)}
          className="pl-3 py-2 rounded-2xl bg-gray-50 border-2 hover:border-teal-700 cursor-pointer hover:text-teal-700 text-gray-700 font-semibold shadow-lg" key={idx}>
          <h2 className="">{ item.icon }</h2>
          <h2 className="">{ item.title }</h2>
        </div>
      ))}
    </div>
  )
}

export default GroupSizeUi
