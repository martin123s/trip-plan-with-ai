import { DollarSign, Landmark, PiggyBank } from 'lucide-react'
import React from 'react'

export const BudgetOptions = [
  { id: 1, title: 'Cheap', desc: 'Stay conscious of spending', icon: <PiggyBank className='text-red-700'/>, color: 'bg-green-100 text-green-600' },
  { id: 2, title: 'Moderate', desc: 'Keep cost on the average side', icon: <DollarSign className='text-indigo-700'/>, color: 'bg-yellow-100 text-yellow-600' },
  { id: 3, title: 'Luxury', desc: "No need to worry about the cost", icon: <Landmark className='text-yellow-700' />, color: 'bg-purple-100 text-purple-600' }
]

const BudgetUi = ({onSelectOption}: any) => {
  return (
    <div className='grid grid-cols-3 md:grid-cols-3 gap-2 items-center mt-3 mb-1'>
      {BudgetOptions.map((item, idx) => (
        <div onClick={() => onSelectOption(item.title + ":" + item.desc)}
          className="p-2 rounded-2xl bg-gray-50 border-2 hover:border-teal-700 cursor-pointer hover:text-teal-700 text-gray-700 font-semibold shadow-lg flex flex-col items-center text-center" key={idx}>
          <div className="flex flex-row gap-3">
            <div className={`p-2 rounded-full ${item.color} `}>{ item.icon }</div>
            <h2 className="text-lg mt-2">{item.title}</h2>
          </div>
          <p className="text-sm font-light mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default BudgetUi
