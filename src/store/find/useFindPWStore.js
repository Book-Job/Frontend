import { create } from 'zustand'

const useFindPWStore = create((set) => ({
  findPWMaskEmail: '',
  setFindPWMaskEmail: (maskEmail) => set({ findPWMaskEmail: maskEmail }),
}))

export default useFindPWStore
