import { TripInfo } from '@/app/create-trip/_components/ChatBox'
import { create } from 'zustand'

export type TripDoc = {
  tripDetails: TripInfo
  tripId: string,
  userId: string,
  _id: string
}

type TripZustandType = {
  trips: TripDoc[] 
  currTrip: TripInfo | null
  setTrips: (trips: TripDoc[]) => void
  updateCurrentTrips: (trip: TripInfo | null) => void  
}

export const tripStore = create<TripZustandType>((set) => ({
  trips: [],
  currTrip: null,
  setTrips: (trips: TripDoc[]) => set({ trips }),
  updateCurrentTrips: (trip: TripInfo | null) => set({ currTrip: trip })
}))