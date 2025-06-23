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
        scrapsMap[s.entityId] = s
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
      const scrapItem = scraps[postId]

      if (scrapItem) {
        await deleteScrap(scrapItem.id)
        set((state) => {
          const newScraps = { ...state.scraps }
          delete newScraps[postId]
          return { scraps: newScraps, loading: false }
        })
        return false
      } else {
        await createScrap({ id: postId, type })
        await get().loadScraps()
        set({ loading: false })
        return true
      }
    } catch (error) {
      set({ loading: false })
      console.error('스크랩 처리 에러:', error)
      throw error
    }
  },
}))

export default useScrapStore
