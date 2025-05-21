import { create } from 'zustand'
import {
  deleteCommentService,
  editCommentService,
  postComment,
  getAllComment,
} from '../../service/commentService'

const useCommentStore = create((set, get) => ({
  comments: [],
  loading: false,
  error: null,
  successMessage: null,

  setComments: (comments) => set({ comments }),

  fetchComments: async (boardId) => {
    set({ loading: true })
    try {
      const response = await getAllComment(boardId)
      if (Array.isArray(response)) {
        set({ comments: response })
      } else if (response && Array.isArray(response.comments)) {
        set({ comments: response.comments })
      } else {
        set({ comments: [] })
      }
    } catch (error) {
      set({ error: error, comments: [] })
      console.error('댓글 불러오기 실패:', error)
    } finally {
      set({ loading: false })
    }
  },
  addComment: async (boardId, commentData) => {
    set({ loading: true, error: null, successMessage: null })
    try {
      const response = await postComment(boardId, commentData)
      set((state) => ({
        comments: [...state.comments, response.comment],
        successMessage: response.message,
      }))
    } catch (error) {
      set({ error: error })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  deleteComment: async (boardId, commentId) => {
    try {
      await deleteCommentService(boardId, commentId)
      set((state) => ({
        comments: state.comments.filter((c) => c.commentId !== commentId),
      }))
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      throw error
    }
  },

  editComment: async (boardId, commentId, newContent) => {
    try {
      await editCommentService(boardId, commentId, newContent)
      set((state) => ({
        comments: state.comments.map((c) =>
          c.commentId === commentId ? { ...c, text: newContent } : c,
        ),
      }))
    } catch (error) {
      throw error
    }
  },
}))

export default useCommentStore
