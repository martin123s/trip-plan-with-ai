import { create } from 'zustand'

export const userStore = create((set) => ({
  userGlobe: null,
  updateUser: (newBears: any) => set({ userGlobe: newBears }),
}))
