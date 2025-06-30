import { useState } from 'react'
import useCommentStore from '../store/useCommentStore'
import Spinner from '../../../../components/web/Spinner'
import ToastService from '../../../../services/toast/ToastService'
import useBestStore from '../../../../store/main/useBestStore'

const CommentList = ({ boardId }) => {
  const comments = useCommentStore((state) => state.comments)
  const deleteComment = useCommentStore((state) => state.deleteComment)
  const editComment = useCommentStore((state) => state.editComment)
  const loading = useCommentStore((state) => state.loading)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const { fetchFreeBest } = useBestStore()

  const handleDelete = async (boardId, commentId) => {
    try {
      setDeletingId(commentId)
      await deleteComment(boardId, commentId)
      ToastService.success('댓글이 성공적으로 삭제되었습니다.')
      fetchFreeBest(true)
    } catch (err) {
      ToastService.error('댓글 삭제 중 오류 발생')
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

  const handleEditClick = (commentId, text) => {
    setEditingCommentId(commentId)
    setEditContent(text)
  }

  const handleEditSubmit = async (boardId, commentId) => {
    if (!editContent.trim()) {
      ToastService.warning('수정할 내용을 입력하세요.')
      return
    }
    try {
      await editComment(boardId, commentId, editContent)
      ToastService.success('댓글이 수정되었습니다.')
      setEditingCommentId(null)
      setEditContent('')
    } catch (error) {
      ToastService.error('댓글 수정 중 오류 발생')
      console.error(error)
    }
  }

  if (!comments || comments.length === 0) {
    return <p className='mt-4 mb-4 text-gray-500'>아직 작성된 댓글이 없습니다.</p>
  }

  return (
    <div className='w-full mt-4 overflow-hidden border rounded-md border-dark-gray'>
      {comments.map((comment, index) => {
        let nicknameColor = 'text-dark-gray'
        if (comment.isWriter) {
          nicknameColor = 'text-main-pink'
        } else if (comment.isAuthentic) {
          nicknameColor = 'text-black'
        }
        return (
          <div key={comment.commentId}>
            <div className='px-4 py-3'>
              <div className='flex items-center justify-between mb-1'>
                <span className={`font-semibold ${nicknameColor}`}>{comment.nickname}</span>
              </div>
              {editingCommentId === comment.commentId ? (
                <div className='flex items-center gap-2'>
                  <input
                    className='flex-1 px-2 py-1 border border-gray-300 rounded'
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    maxLength={200}
                  />
                  <button
                    className='text-main-pink hover:underline text-[13px]'
                    onClick={() => handleEditSubmit(boardId, comment.commentId)}
                  >
                    저장
                  </button>
                  <button
                    className='text-dark-gray hover:underline text-[13px]'
                    onClick={() => {
                      setEditingCommentId(null)
                      setEditContent('')
                    }}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <p className='flex items-center justify-between mb-1 text-gray-700 whitespace-pre-wrap'>
                  {comment.text}
                </p>
              )}
              <div className='flex justify-between items-center text-[13px] text-dark-gray'>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                {comment.isWriter && (
                  <div className='flex gap-2'>
                    <button
                      className='text-main-pink hover:underline'
                      onClick={() => handleEditClick(comment.commentId, comment.text)}
                    >
                      수정
                    </button>
                    <button
                      className='text-main-pink hover:underline'
                      onClick={() => handleDelete(boardId, comment.commentId)}
                      disabled={loading || deletingId === comment.commentId}
                    >
                      {deletingId === comment.commentId ? (
                        <Spinner size={16} color='main-pink' />
                      ) : (
                        '삭제'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {index !== comments.length - 1 && <hr className='mx-4 border-t border-light-gray' />}
          </div>
        )
      })}
    </div>
  )
}

export default CommentList
