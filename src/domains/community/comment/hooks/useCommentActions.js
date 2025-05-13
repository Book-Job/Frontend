import { deleteCommentService, editCommentService } from '../../service/commentService'

const useCommentActions = () => {
  const deleteComment = async (boardId, commentId) => {
    try {
      await deleteCommentService(boardId, commentId)
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      throw error
    }
  }

  const editComment = async (boardId, commentId, newContent) => {
    try {
      await editCommentService(boardId, commentId, newContent)
    } catch (error) {
      throw error
    }
  }

  return { deleteComment, editComment }
}

export default useCommentActions
