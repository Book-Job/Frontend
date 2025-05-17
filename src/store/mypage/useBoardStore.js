import { create } from 'zustand'

const useBoardStore = create((set) => ({
  choiceBoard: '구인구직',
  setChoiceBoard: (board) => set({ choiceBoard: board }),
}))

export default useBoardStore
