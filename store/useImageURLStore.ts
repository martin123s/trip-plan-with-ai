import { create } from 'zustand'


export type SingleImageURL = {
  name: string
  type: string
  url: string
}

type ImageZustandType = {
  imageURLs: SingleImageURL[]
  addImage: (url: SingleImageURL) => void
  getAllImageURL: (urls: SingleImageURL[]) => void
}

export const imageURLStore = create<ImageZustandType>((set) => ({
  imageURLs: [], 
  addImage: (url) =>
    set((state) => ({
      imageURLs: [...state.imageURLs, url],
    })),
  
  getAllImageURL: (urls) => set({imageURLs: urls})
}))