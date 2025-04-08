import { useState } from 'react'
import axios from 'axios'

const useCommentActions = () => {
  const [loading, setLoading] = useState(false)

  const deleteComment = async (boardId, commentId) => {
    setLoading(true)
    try {
      await axios.delete(`/api/v1/boards/${boardId}/comment/${commentId}`)
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const editComment = async (boardId, commentId, newContent) => {
    setLoading(true)
    try {
      await axios.patch(`/api/v1/boards/${boardId}/comment/${commentId}`, {
        content: newContent,
      })
    } catch (error) {
      console.error('댓글 수정 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  return { deleteComment, editComment, loading }
}

export default useCommentActions
