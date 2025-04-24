import { create } from 'zustand'

const useBoardStore = create((set) => ({
  choiceBoard: 'job',
  setChoiceBoard: (board) => set({ choiceBoard: board }),
}))

export default useBoardStore
