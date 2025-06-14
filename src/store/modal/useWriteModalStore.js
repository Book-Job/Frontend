import { create } from 'zustand'

const useWriteModalStore = create((set) => ({
  showModal: false,
  setShowModal: (value) => set({ showModal: value }),
}))

export default useWriteModalStore
