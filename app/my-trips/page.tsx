"use client"

import { api } from '@/convex/_generated/api'
import { tripStore } from '@/store/useTripStore'
import { userStore } from '@/store/useUserStore'
import { useConvex } from 'convex/react'
import React, { useEffect } from 'react'
import TripCard from './_component/TripCard'

const MyTrips = () => {

  const userGlobe = userStore((state: any) => state.userGlobe)
  const setTrips = tripStore((state) => state.setTrips)
  const trips = tripStore((state) => state.trips)
  const convex = useConvex()

  useEffect(() => {
    userGlobe && GetUserTrips()
  },[userGlobe])

  const GetUserTrips = async () => {
    const result = await convex.query(api.tripList.GetTrips, {
      userId:userGlobe?._id
    })
    setTrips(result)
  }


  return (
    <div className='px-10 p-10 md:px-24 lg:px-48 mt-5 text-center'>
      {trips && trips?.length === 0 &&
        <div className="my-6 text-3xl font-bold">You don't have any trip created</div>}
      
      <div className="">
        <h2 className="font-bold text-3xl">My Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {trips?.map((trip, idx) => (
            <TripCard trip={trip} key={idx} />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default MyTrips