import { useState, useEffect } from 'react'
import useAuthStore from '../../../../store/login/useAuthStore'
import useCommentStore from '../store/useCommentStore'

const CommentList = ({ boardId }) => {
  const { user } = useAuthStore()
  const comments = useCommentStore((state) => state.comments)
  const deleteComment = useCommentStore((state) => state.deleteComment)
  const editComment = useCommentStore((state) => state.editComment)
  const loading = useCommentStore((state) => state.loading)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editContent, setEditContent] = useState('')

  const handleDelete = async (boardId, commentId) => {
    try {
      await deleteComment(boardId, commentId)
      alert('댓글이 성공적으로 삭제되었습니다.')
    } catch (err) {
      alert('댓글 삭제 중 오류 발생')
      console.error(err)
    }
  }

  const handleEditClick = (commentId, text) => {
    setEditingCommentId(commentId)
    setEditContent(text)
  }

  const handleEditSubmit = async (boardId, commentId) => {
    if (!editContent.trim()) {
      alert('수정할 내용을 입력하세요.')
      return
    }
    try {
      await editComment(boardId, commentId, editContent)
      alert('댓글이 수정되었습니다.')
      setEditingCommentId(null)
      setEditContent('')
    } catch (err) {
      alert('댓글 수정 중 오류 발생')
      console.error(err)
    }
  }

  if (!comments || comments.length === 0) {
    return <p className='text-gray-500 mt-4 mb-4'>아직 작성된 댓글이 없습니다.</p>
  }

  return (
    <div className='w-full mt-4 border border-dark-gray rounded-md overflow-hidden'>
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
              <div className='flex justify-between items-center mb-1'>
                <span className={`font-semibold ${nicknameColor}`}>{comment.nickname}</span>
              </div>
              {editingCommentId === comment.commentId ? (
                <div className='flex items-center gap-2'>
                  <input
                    className='border border-gray-300 rounded px-2 py-1 flex-1'
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
                <p className='text-gray-700 whitespace-pre-wrap flex justify-between items-center mb-1'>
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
                      disabled={loading}
                    >
                      {loading ? '삭제 중...' : '삭제'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {index !== comments.length - 1 && <hr className='border-t border-light-gray mx-4' />}
          </div>
        )
      })}
    </div>
  )
}

export default CommentList
