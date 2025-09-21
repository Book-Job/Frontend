import { create } from 'zustand'
import { toggleCommentLike as toggleCommentLikeApi } from '../domains/community/service/commentService'

const useCommentLikeStore = create((set, get) => ({
  likes: {},

  setLike: (boardId, commentId, initialCount = 0, isLiked = false) => {
    const key = `${boardId}_${commentId}`
    set((state) => ({
      likes: {
        ...state.likes,
        [key]: { count: initialCount, isLiked },
      },
    }))
  },

  toggleLike: async (boardId, commentId) => {
    const key = `${boardId}_${commentId}`
    const state = get()
    const current = state.likes[key] || { count: 0, isLiked: false }

    const newIsLiked = !current.isLiked
    const newCount = newIsLiked ? current.count + 1 : current.count - 1

    try {
      await toggleCommentLikeApi(boardId, commentId, newIsLiked)
      set((s) => ({
        likes: {
          ...s.likes,
          [key]: { count: newCount, isLiked: newIsLiked },
        },
      }))
    } catch (error) {
      console.error('댓글 좋아요 서버 업데이트 실패:', error)
    }
  },
}))

export default useCommentLikeStore
