import { useState, useEffect } from 'react'
import useCommentStore from '../store/useCommentStore'
import Spinner from '../../../../components/web/Spinner'
import ToastService from '../../../../services/toast/ToastService'
import useBestStore from '../../../../store/main/useBestStore'
import LikeCommentCount from '../../../../components/common/LikeCommentCount'
import { postReply, getReply } from '../../service/commentService'
import useAuthStore from '../../../../store/login/useAuthStore'

const CommentList = ({ boardId }) => {
  const comments = useCommentStore((state) => state.comments)
  const deleteComment = useCommentStore((state) => state.deleteComment)
  const editComment = useCommentStore((state) => state.editComment)
  const [replyNickname, setReplyNickname] = useState('')
  const loading = useCommentStore((state) => state.loading)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [replyingCommentId, setReplyingCommentId] = useState(null)
  const [replyContent, setReplyContent] = useState('')
  const { fetchFreeBest } = useBestStore()
  const fetchComments = useCommentStore((state) => state.fetchComments)
  const [repliesMap, setRepliesMap] = useState({})

  const { user } = useAuthStore()

  useEffect(() => {
    if (user?.nickname) {
      setReplyNickname(user.nickname)
    }
  }, [user])

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

  const handleReplySubmit = async (parentId) => {
    if (!replyNickname.trim()) {
      ToastService.warning('닉네임을 입력해주세요.')
      return
    }
    if (!replyContent.trim()) {
      ToastService.warning('답글 내용을 입력하세요.')
      return
    }

    try {
      await postReply(boardId, parentId, { content: replyContent, nickname: replyNickname })

      ToastService.success('답글이 등록되었습니다.')
      setReplyingCommentId(null)
      setReplyContent('')
      setReplyNickname(user?.nickname || '')
      fetchComments(boardId)
      fetchFreeBest(true)
    } catch (err) {
      ToastService.error('답글 등록 중 오류 발생')
      console.error(err)
    }
  }

  const handleReplyToggle = async (commentId) => {
    setReplyingCommentId(replyingCommentId === commentId ? null : commentId)

    if (!repliesMap[commentId]) {
      try {
        const replies = await getReply(boardId, commentId)
        console.log('대댓글 조회:', replies)
        setRepliesMap((prev) => ({ ...prev, [commentId]: replies }))
      } catch (err) {
        console.error('대댓글 조회 실패', err)
      }
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

  if (!comments || comments.length === 0) {
    return <p className='mt-4 mb-4 text-dark-gray text-sm'>아직 작성된 댓글이 없습니다.</p>
  }

  return (
    <div className='w-full mt-4 overflow-hidden border rounded-md border-dark-gray'>
      {comments.map((comment, index) => {
        let nicknameColor = 'text-dark-gray'
        if (comment.isWriter) nicknameColor = 'text-main-pink'
        else if (comment.isAuthentic) nicknameColor = 'text-black'

        return (
          <article key={comment.commentId}>
            <div className='px-4 py-3'>
              <div className='flex items-center justify-between mb-1'>
                <strong className={`font-semibold ${nicknameColor}`}>{comment.nickname}</strong>
                <LikeCommentCount
                  boardId={boardId}
                  commentId={comment.commentId}
                  initialCount={comment.likeCount}
                  initialActive={false}
                />
              </div>

              {editingCommentId === comment.commentId ? (
                <div className='flex flex-wrap items-center gap-2'>
                  <input
                    className='w-full sm:w-auto flex-1 min-w-[0] px-2 py-1 border border-light-gray rounded focus:outline-none focus:border-main-pink mb-2'
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
                <p className='flex items-center text-left justify-between mb-1 whitespace-pre-wrap'>
                  {comment.text}
                </p>
              )}

              <div className='flex justify-between items-center text-[13px] text-dark-gray'>
                <time dateTime={new Date(comment.createdAt).toISOString()}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>

                <div className='flex gap-2'>
                  {comment.isWriter && editingCommentId !== comment.commentId && (
                    <>
                      <button
                        aria-label='댓글 수정'
                        className='text-main-pink hover:underline'
                        onClick={() => handleEditClick(comment.commentId, comment.text)}
                      >
                        수정
                      </button>
                      <button
                        aria-label='댓글 삭제'
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
                    </>
                  )}
                  {editingCommentId !== comment.commentId && (
                    <button
                      className='text-dark-gray hover:text-main-pink text-md font-bold'
                      onClick={() => handleReplyToggle(comment.commentId)}
                    >
                      답글
                    </button>
                  )}
                </div>
              </div>
              {/* 대댓글 입력창 */}
              {replyingCommentId === comment.commentId && (
                <div className='flex flex-col gap-2 mt-2 pl-6'>
                  <div className='flex items-center gap-2'>
                    <span className='text-dark-gray text-md'>↳</span>
                    <input
                      value={replyNickname}
                      onChange={(e) => setReplyNickname(e.target.value)}
                      placeholder='닉네임'
                      className='w-20 px-2 py-1 border border-light-gray rounded focus:outline-none focus:border-main-pink'
                    />
                    <input
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder='답글을 입력하세요'
                      className='flex-1 px-2 py-1 border border-light-gray rounded focus:outline-none focus:border-main-pink'
                    />
                    <button
                      className='text-sm text-main-pink font-semibold px-3 py-1 rounded-[5px] hover:bg-main-pink/10 transition h-[30px]'
                      onClick={() => handleReplySubmit(comment.commentId)}
                    >
                      등록
                    </button>
                    <button
                      className='text-dark-gray text-sm'
                      onClick={() => setReplyingCommentId(null)}
                    >
                      취소
                    </button>
                  </div>

                  {/* 대댓글 리스트 */}
                  {repliesMap[comment.commentId]?.length > 0 && (
                    <div className='mt-2'>
                      {repliesMap[comment.commentId].map((reply) => {
                        const replyColor = reply.isWriter ? 'text-main-pink' : 'text-black'
                        return (
                          <div key={reply.commentId} className='mb-3 pl-6'>
                            <div className='flex items-center gap-2'>
                              <span className='text-gray-400'>↳</span>
                              <strong className={`font-semibold ${replyColor}`}>
                                {reply.nickname}
                              </strong>
                              <span className='text-xs text-gray-400'>
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className='text-sm text-dark-gray whitespace-pre-wrap'>
                              {reply.text}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            {index !== comments.length - 1 && <hr className='mx-4 border-t border-light-gray' />}
          </article>
        )
      })}
    </div>
  )
}

export default CommentList
