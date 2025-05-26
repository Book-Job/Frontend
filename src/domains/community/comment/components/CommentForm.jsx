import { useState, useEffect } from 'react'
import useAuthStore from '../../../../store/login/useAuthStore'
import { postComment } from '../../service/commentService'
import ToastService from '../../../../utils/toastService'
import useBestStore from '../../../../store/main/useBestStore'

const CommentForm = ({ boardId, onCommentAdded }) => {
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')
  const { fetchFreeBest } = useBestStore() //메인 자유베스트 최신화
  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nickname.trim()) {
      ToastService.info('닉네임을 입력해주세요.')
      return
    }
    if (!content.trim()) {
      ToastService.info('댓글 내용을 입력해주세요.')
      return
    }
    try {
      await postComment(boardId, { content, nickname })
      ToastService.success('댓글이 등록되었습니다.')
      fetchFreeBest(true) //메인 자유베스트 최신화
      setContent('')
      setNickname(user?.nickname || '')
      if (onCommentAdded) onCommentAdded()
    } catch (error) {
      console.error('댓글 등록 실패:', error)
      ToastService.error('댓글 등록 중 오류가 발생했습니다.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col w-full gap-2 mt-4 mb-4 sm:flex-row sm:gap-3'
    >
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder='닉네임'
        className='
          w-full sm:w-[150px]
          h-[44px] sm:h-[50px]
          px-3 py-2
          border border-dark-gray rounded-[5px]
          focus:outline-none focus:border-main-pink
          placeholder:text-dark-gray
          text-base
        '
      />
      <div className='relative w-full'>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='자유게시판에서는 닉네임 수정이 가능합니다.'
          className='
            h-[44px] sm:h-[50px]
            w-full
            px-3 py-2 pr-[70px]
            border border-dark-gray rounded-[5px]
            focus:outline-none focus:border-main-pink
            placeholder:text-dark-gray
            text-base
            placeholder:text-xs 
            
          '
        />
        <button
          type='submit'
          className='
            absolute top-1/2 right-2 -translate-y-1/2
            text-[15px] text-main-pink font-semibold
            px-3 py-1 rounded-[5px]
            hover:bg-main-pink/10 transition
            h-[36px]
          '
        >
          등록
        </button>
      </div>
    </form>
  )
}

export default CommentForm
