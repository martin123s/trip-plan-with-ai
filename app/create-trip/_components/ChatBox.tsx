"use client"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EmptyState from './EmptyState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import TripDurationUi from './TripDurationUi'
import FinalUi from './FinalUi'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { userStore } from '@/store/useUserStore';
import { v4 as uuidv4 } from 'uuid';


type Message = { role: string, content: string, ui?: string }
export type TripInfo = { budget: string, destination: string, duration: string, group_size: string, origin: string, hotels:any, itinerary: any }

const ChatBox = () => {

  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [isFinal, setIsFinal] = useState(false)
  const [trip, setTrip] = useState<TripInfo>()
  const userGlobe = userStore((state: any) => state.userGlobe)


  const CreateTrip = useMutation(api.tripList.CreateNewTrip)

  const onSend = async() => {
    // if (!userInput?.trim?.()) return
    setLoading(true)
    setUserInput('')
    const newMsg: Message = { role: 'user', content: userInput }

    setMessages((pre: Message[]) => [...pre, newMsg])

    const result = await axios.post('/api/aimodel', {
      messages: [...messages, newMsg],
      isFinal: isFinal
    })
    
    // console.log("Trip plan", result.data)
    !isFinal && setMessages((pre: Message[]) => [...pre, {
      role: 'assistant',
      content: result?.data?.resp,
      ui: result?.data?.ui
    }])

    if (isFinal) {
      setTrip(result?.data?.trip_plan)
      const trip_id = uuidv4()
      await CreateTrip({
        tripId: trip_id,
        tripDetails: result?.data?.trip_plan,
        userId: userGlobe?._id
      })
    }

    setLoading(false)
  }

  const RenderGeneratingUi = (ui: string) => {
    if (ui === 'budget') {
      return <BudgetUi onSelectOption={(v: string) => {
        setUserInput(v)
        onSend()
      }} />
    } else if (ui === 'groupSize') {
      return <GroupSizeUi onSelectOption={(v: string) => {
        setUserInput(v)
        onSend()
      }} />
    } else if (ui === 'tripDuration') {
      return <TripDurationUi onSelectOption={(v: string) => {
        setUserInput(v)
        onSend()
      }} />
    } else if (ui === 'final') {
      return <FinalUi viewTrip={() => console.log()} disable={!trip} />
    }
    return <div></div>
  }

  useEffect(() => {
    const lastMsg = messages[messages.length - 1]
    if (lastMsg?.ui === 'final') {
      setIsFinal(true)
      setUserInput('OK, great!')
    }
  }, [messages])
  
  useEffect(() => {
    if(isFinal && userInput) onSend()
  }, [isFinal])


  return (
    <div className='flex flex-col h-[82vh]'>
      {messages?.length === 0 && <EmptyState onSelectOption={(v: string) => {
        setUserInput(v)
        onSend()
      }} />}
      {/* display message */}
      <section className='flex-1 overflow-y-auto p-4'>
        {messages.map((msg: Message, idx) => (
          msg.role == 'user' ?
            <div key={idx} className="flex justify-end mt-8 ">
              <div className="max-w-lg bg-teal-700 text-white px-4 py-2 rounded-lg">
                { msg.content }
              </div>
            </div> :
            <div key={idx} className="flex justify-start mt-8 ">
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                {msg.content}
                { RenderGeneratingUi(msg.ui ?? '') }
              </div>
            </div>
        ))}

        {loading &&
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
              <Loader className='animate-spin size={45}'/>
            </div>
          </div>
        }
        
      </section>

      {/* user input area */}
      <section>
        <div className="border rounded-2xl p-3 shadow-lg relative">
          <Textarea className='w-full h-32 bg-transparent resize-none border-none focus-visible:ring-0 shadow-none' placeholder='Create your trip plan from here...' onChange={(e) => setUserInput(e.target.value)} value={ userInput } />
            <Button size={ 'icon' } className='cursor-pointer absolute bottom-6 right-6' onClick={onSend}>
              <Send className='w-4 h-4'/>
            </Button>
          </div>
      </section>
    </div>
  )
}

export default ChatBox
