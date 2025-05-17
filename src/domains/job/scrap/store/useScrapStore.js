import { create } from 'zustand'
import { createScrap, deleteScrap, getAllScrap } from '../service/scrapService'

const useScrapStore = create((set, get) => ({
  scraps: {},
  loading: false,

  loadScraps: async () => {
    set({ loading: true })
    try {
      const data = await getAllScrap()
      const scrapsMap = {}
      data.forEach((s) => {
        scrapsMap[s.entityId] = s.bookMarkId
      })
      set({ scraps: scrapsMap })
    } finally {
      set({ loading: false })
    }
  },

  toggleScrap: async (postId, type) => {
    set({ loading: true })
    try {
      const scraps = get().scraps
      const bookMarkId = scraps[postId]
      if (bookMarkId) {
        await deleteScrap(bookMarkId)
        set((state) => {
          const newScraps = { ...state.scraps }
          delete newScraps[postId]
          return { scraps: newScraps, loading: false }
        })
      } else {
        await createScrap({ id: postId, type })
        await get().loadScraps()
        set({ loading: false })
      }
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
}))

export default useScrapStore
