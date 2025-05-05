import { create } from 'zustand'
import { scrapJobPost, deleteScrapJobPost } from '../../../service/scrapJobPost'

const useScrapStore = create((set) => ({
  scraps: new Set(),

  fetchScraps: async (userId) => {
    const scrapList = await getScrapsByUserId(userId)
    const scrapSet = new Set(scrapList.map((post) => post.post_id))
    set({ scraps: scrapSet })
  },

  toggleScrap: async (userId, postId) => {
    set((state) => {
      const updated = new Set(state.scraps)
      if (updated.has(postId)) {
        updated.delete(postId)
        deleteScrapJobPost(userId, postId)
      } else {
        updated.add(postId)
        scrapJobPost(userId, postId)
      }
      return { scraps: updated }
    })
  },
}))

export default useScrapStore
