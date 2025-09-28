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
  const [editingReplyId, setEditingReplyId] = useState(null)
  const [editReplyContent, setEditReplyContent] = useState('')
  const [deletingReplyId, setDeletingReplyId] = useState(null)
  const { fetchFreeBest } = useBestStore()
  const [repliesMap, setRepliesMap] = useState({})
  const { user } = useAuthStore()

  useEffect(() => {
    if (user?.nickname) setReplyNickname(user.nickname)
  }, [user])

  const handleDelete = async (boardId, commentId) => {
    try {
      setDeletingId(commentId)
      await deleteComment(boardId, commentId)
      ToastService.success('댓글이 삭제되었습니다.')
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
    if (!editContent.trim()) return ToastService.warning('수정할 내용을 입력하세요.')

    try {
      await editComment(boardId, commentId, editContent)
      ToastService.success('댓글이 수정되었습니다.')
      setEditingCommentId(null)
      setEditContent('')
    } catch (err) {
      ToastService.error('댓글 수정 중 오류 발생')
      console.error(err)
    }
  }

  const handleReplySubmit = async (parentId) => {
    if (!replyNickname.trim()) return ToastService.warning('닉네임을 입력해주세요.')
    if (!replyContent.trim()) return ToastService.warning('답글 내용을 입력하세요.')

    try {
      await postReply(boardId, parentId, { content: replyContent, nickname: replyNickname })
      ToastService.success('답글이 등록되었습니다.')

      const updatedReplies = await getReply(boardId, parentId)
      setRepliesMap((prev) => ({ ...prev, [parentId]: updatedReplies }))

      setReplyContent('')
    } catch (err) {
      ToastService.error('답글 등록 중 오류 발생')
      console.error(err)
    }
  }

  const handleEditReplyClick = (replyId, text) => {
    setEditingReplyId(replyId)
    setEditReplyContent(text)
  }
  const handleEditReplySubmit = async (replyId) => {
    if (!editReplyContent.trim()) return ToastService.warning('수정할 내용을 입력하세요.')

    try {
      await editComment(boardId, replyId, editReplyContent)
      ToastService.success('답글이 수정되었습니다.')
      setRepliesMap((prev) => {
        const newMap = { ...prev }
        for (const parentId in newMap) {
          newMap[parentId] = newMap[parentId].map((r) =>
            r.commentId === replyId ? { ...r, text: editReplyContent } : r,
          )
        }
        return newMap
      })

      setEditingReplyId(null)
      setEditReplyContent('')
    } catch (err) {
      ToastService.error('답글 수정 중 오류 발생')
      console.error(err)
    }
  }

  const handleDeleteReply = async (replyId) => {
    try {
      setDeletingReplyId(replyId)
      await deleteComment(boardId, replyId)
      ToastService.success('답글이 삭제되었습니다.')

      setRepliesMap((prev) => {
        const newMap = { ...prev }
        for (const parentId in newMap) {
          newMap[parentId] = newMap[parentId].filter((r) => r.commentId !== replyId)
        }
        return newMap
      })
    } catch (err) {
      ToastService.error('답글 삭제 중 오류 발생')
      console.error(err)
    } finally {
      setDeletingReplyId(null)
    }
  }

  const handleReplyToggle = async (commentId) => {
    if (replyingCommentId === commentId) {
      setReplyContent('')
      setReplyingCommentId(null)
      return
    }

    setReplyingCommentId(commentId)
    setReplyContent('')

    if (!repliesMap[commentId]) {
      try {
        const replies = await getReply(boardId, commentId)
        setRepliesMap((prev) => ({ ...prev, [commentId]: replies }))
      } catch (err) {
        console.error('대댓글 조회 실패', err)
      }
    }
  }

  if (loading)
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )

  if (!comments || comments.length === 0)
    return <p className='mt-4 mb-4 text-dark-gray text-sm'>아직 작성된 댓글이 없습니다.</p>

  return (
    <div className='w-full mt-4 overflow-hidden border rounded-md border-dark-gray'>
      {comments.map((comment, index) => {
        const nicknameColor = comment.isWriter
          ? 'text-main-pink'
          : comment.isAuthentic
            ? 'text-black'
            : 'text-dark-gray'

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

              <div className='flex justify-between items-center text-sm text-dark-gray'>
                <time dateTime={new Date(comment.createdAt).toISOString()}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>

                <div className='flex gap-2'>
                  {comment.isWriter && editingCommentId !== comment.commentId && (
                    <>
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

              {replyingCommentId === comment.commentId && (
                <div className='flex flex-col gap-3 mt-3 pl-6'>
                  <div className='flex items-center gap-2 bg-light-gray/20 px-3 py-2 rounded-lg'>
                    <span className='text-dark-gray text-lg'>↳</span>
                    <input
                      value={replyNickname}
                      onChange={(e) => setReplyNickname(e.target.value)}
                      placeholder='닉네임'
                      className='w-24 px-2 py-1 border border-light-gray rounded focus:outline-none focus:border-main-pink text-sm'
                    />
                    <input
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder='답글을 입력하세요'
                      className='flex-1 px-2 py-1 border border-light-gray rounded focus:outline-none focus:border-main-pink text-sm'
                    />
                    <button
                      className='text-sm text-white bg-main-pink font-semibold px-3 py-1 rounded-md hover:bg-main-pink/90 transition'
                      onClick={() => handleReplySubmit(comment.commentId)}
                    >
                      등록
                    </button>
                    <button
                      className='text-dark-gray text-sm hover:underline'
                      onClick={() => setReplyingCommentId(null)}
                    >
                      취소
                    </button>
                  </div>

                  {repliesMap[comment.commentId]?.length > 0 && (
                    <div className='flex flex-col gap-2'>
                      {repliesMap[comment.commentId].map((reply) => {
                        const replyColor = reply.isWriter ? 'text-main-pink' : 'text-black'

                        return (
                          <div key={reply.commentId} className='pl-6 border-l-2 border-light-gray'>
                            <div className='flex items-center justify-between text-sm'>
                              <div className='flex items-center gap-2'>
                                <span className='text-dark-gray'>↳</span>
                                <strong className={`font-medium ${replyColor}`}>
                                  {reply.nickname}
                                </strong>
                              </div>
                              <span className='text-xs text-dark-gray'>
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {editingReplyId === reply.commentId ? (
                              <div className='flex items-center gap-2 mt-1 ml-6'>
                                <input
                                  className='flex-1 px-2 py-1 border border-light-gray rounded focus:outline-none focus:border-main-pink text-sm'
                                  value={editReplyContent}
                                  onChange={(e) => setEditReplyContent(e.target.value)}
                                  maxLength={200}
                                />
                                <button
                                  className='text-main-pink text-xs hover:underline'
                                  onClick={() => handleEditReplySubmit(reply.commentId)}
                                >
                                  저장
                                </button>
                                <button
                                  className='text-dark-gray text-xs hover:underline'
                                  onClick={() => {
                                    setEditingReplyId(null)
                                    setEditReplyContent('')
                                  }}
                                >
                                  취소
                                </button>
                              </div>
                            ) : (
                              <div className='flex items-center justify-between ml-6 mt-1'>
                                <p className='text-sm text-black whitespace-pre-wrap text-left'>
                                  {reply.text}
                                </p>
                                {reply.isWriter && (
                                  <div className='flex gap-2 text-xs ml-4'>
                                    <button
                                      className='text-main-pink hover:underline'
                                      onClick={() =>
                                        handleEditReplyClick(reply.commentId, reply.text)
                                      }
                                    >
                                      수정
                                    </button>
                                    <button
                                      className='text-main-pink hover:underline'
                                      onClick={() => handleDeleteReply(reply.commentId)}
                                      disabled={deletingReplyId === reply.commentId}
                                    >
                                      {deletingReplyId === reply.commentId ? (
                                        <Spinner size={12} color='main-pink' />
                                      ) : (
                                        '삭제'
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
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
