"use client"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import EmptyState from './EmptyState'

type Message = {role: string, content: string, ui?:string}

const ChatBox = () => {

  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>()
  const [loading, setLoading] = useState(false)

  const onSend = async() => {
    if (!userInput?.trim()) return
    setLoading(true)
    setUserInput('')
    const newMsg: Message = { role: 'user', content: userInput }

    setMessages((pre: Message[]) => [...pre, newMsg])

    const result = await axios.post('/api/aimodel', {
      messages: [...messages, newMsg]
    })

    setMessages((pre: Message[]) => [...pre, {
      role: 'assistant',
      content: result?.data?.resp,
      ui: result?.data?.ui
    }])
    console.log("chat box", result.data)
    setLoading(false)
  }

  const RenderGeneratingUi = (ui: string) => {
    if (ui === 'budget') {
      
    }
  }


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
            <div key={idx} className="flex justify-end mt-2">
              <div className="max-w-lg bg-teal-700 text-white px-4 py-2 rounded-lg">
                { msg.content }
              </div>
            </div> :
            <div key={idx} className="flex justify-start mt-2">
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                { msg.content }
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
