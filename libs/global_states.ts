import { create } from 'zustand'

type Store = {
  percentage: number
  inc: (val:number) => void
}

export const useTopLoaderStore = create<Store>()((set) => ({
  percentage: 0,
  inc: (val:number) => set((state) => ({ percentage: val})),
}))