import { create } from 'zustand'

const useFindIDStore = create((set) => ({
  findID: '',
  setFindID: (id) => set({ findID: id }),
}))

export default useFindIDStore
