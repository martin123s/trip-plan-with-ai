"use client"

import GlobalMap from '@/app/create-trip/_components/GlobalMap'
import Itinerary from '@/app/create-trip/_components/Itinerary'
import { api } from '@/convex/_generated/api'
import { tripStore } from '@/store/useTripStore'
import { userStore } from '@/store/useUserStore'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ViewTrip = () => {

  const { tripid } = useParams()
  const userGlobe = userStore((state: any) => state.userGlobe)
  const convex = useConvex()
  const updateCurrentTrips = tripStore(state => state.updateCurrentTrips)
  const currTrip = tripStore(state => state.currTrip)

  const [loading, setLoading] = useState(false)

  useEffect(() => { 
    if (!tripid || !userGlobe?._id) return
    GetSingle();
    return () => {
      updateCurrentTrips(null)
    }
  }, [tripid, userGlobe])

  const GetSingle = async () => {
    try {
      setLoading(true)
      const result = await convex.query(api.tripList.GetSingleTrip, {
        userId: userGlobe?._id,
        tripid: tripid+""
      })
      updateCurrentTrips(result?.tripDetails)
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-12 flex flex-row'>

      {/* trip details left side */}
      <div className="basis-[58%] pr-4">
        {loading ? (
          <div className="flex justify-center items-center h-[82vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500">
              Loading...
            </div>
          </div>) :
          currTrip && <Itinerary />
        }
      </div>

      {/* map right side */}
      <div className="basis-[42%]">
        <GlobalMap/>
      </div>
      
    </div>
  )
}

export default ViewTrip