import { useState } from 'react'
import { postComment } from '../services/commentService'

const usePostComment = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const submitComment = async (boardId, commentData) => {
    setLoading(true)
    setError(null)
    setSuccessMessage(null)
    try {
      const response = await postComment(boardId, commentData)
      setSuccessMessage(response.message)
      return response
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { submitComment, loading, error, successMessage }
}

export default usePostComment
