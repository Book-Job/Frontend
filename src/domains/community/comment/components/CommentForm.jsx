import { useState, useEffect } from 'react'
import useAuthStore from '../../../../store/login/useAuthStore'
import { postComment } from '../../service/commentService'

const CommentForm = ({ boardId, onCommentAdded }) => {
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await postComment(boardId, { content, nickname })
      alert('댓글이 등록되었습니다.')
      setContent('')
      setNickname(user?.nickname || '')
      if (onCommentAdded) onCommentAdded()
    } catch (err) {
      console.error('댓글 등록 실패:', err)
      alert('댓글 등록 중 오류가 발생했습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-row gap-3 w-full mt-4 mb-4'>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder='닉네임'
        className='w-[150px] h-[50px] px-4 py-2 border border-dark-gray rounded-md
      focus:outline-none focus:border-main-pink
      placeholder:text-dark-gray
      text-base'
      />
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='자유게시판에서는 닉네임 수정이 가능합니다.'
        className='h-[50px] w-full px-4 py-2 border border-dark-gray rounded-md focus:border-main-pink
      placeholder:text-dark-gray
      text-base'
      />
      <button type='submit' className='text-main-pink font-semibold'>
        등록
      </button>
    </form>
  )
}

export default CommentForm
