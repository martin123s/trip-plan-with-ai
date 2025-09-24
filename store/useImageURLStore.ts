import { create } from 'zustand'

export type DestinationURL = {
  destination: string
  dest_image_url: string
  tripId: string
}

type TripZustandType = {
  destImageURL: DestinationURL[]
  addDestImage: (newDest: DestinationURL) => void
}

export const imageURLStore = create<TripZustandType>((set) => ({
  destImageURL: [],
  addDestImage: (newDest) =>
    set((state) => ({
      destImageURL: [...state.destImageURL, newDest],
    })),
}))