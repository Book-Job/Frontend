import { create } from 'zustand'
import { toggleLike as toggleLikeApi } from '../service/postService'

const useLikeCountStore = create((set, get) => ({
  likes: {},
  setLike: (id, initialCount = 0, isLiked = false) => {
    set((state) => ({
      likes: {
        ...state.likes,
        [id]: { count: initialCount, isLiked },
      },
    }))
  },

  toggleLike: async (id) => {
    const state = get()
    const current = state.likes[id] || { count: 0, isLiked: false }

    const newIsLiked = !current.isLiked
    const newCount = newIsLiked ? current.count + 1 : current.count - 1

    try {
      await toggleLikeApi(id, newIsLiked)
      set((s) => ({
        likes: {
          ...s.likes,
          [id]: { count: newCount, isLiked: newIsLiked },
        },
      }))
    } catch (error) {
      console.error('좋아요 서버 업데이트 실패:', error)
    }
  },
}))

export default useLikeCountStore
