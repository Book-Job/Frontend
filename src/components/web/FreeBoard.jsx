import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import comment from '../../assets/icons/common/comment.svg'
import ShareViews from './ShareViews'

const FreeBoard = ({ boardId, title, content, name, date, onClick, comment1, view1 }) => {
  const [showButton, setShowButton] = useState(false)
  const navigate = useNavigate()

  const handleNameClick = (e) => {
    e.stopPropagation()
    setShowButton((prev) => !prev)
  }

  const goToAuthorPosts = () => {
    navigate(`/user-posts/${name}`)
  }

  const goToDetailPage = () => {
    navigate(`/community/post/${boardId}`)
  }

  return (
    <div className='w-[300px]' onClick={goToDetailPage}>
      <div className='flex flex-col h-full border border-[#D6D6D6] rounded-[10px] px-[25px] pt-[25px] pb-[20px] justify-between cursor-pointer'>
        <div className='flex flex-col items-start text-left' onClick={onClick}>
          <div className='text-[18px] font-bold line-clamp-1'>{title}</div>
          <div className='mt-[10px] text-[16px] line-clamp-2'>{content}</div>
        </div>

        <div className='text-dark-gray text-[14px] mt-[15px]'>
          <div className='flex justify-between font-bold'>
            <ShareViews label={comment1} textColor='text-dark-gray' icon={comment} />
            <div className='relative inline-block'>
              <span
                onClick={handleNameClick}
                className='cursor-pointer hover:underline z-10 text-sm font-medium'
              >
                {name}
              </span>

              {showButton && (
                <button
                  onClick={goToAuthorPosts}
                  className='absolute left-1/2 -translate-x-1/2 top-[100%] mt-[1px] bg-white text-xs text-black px-2 py-[2px] rounded-md border border-gray-300 whitespace-nowrap shadow-md'
                >
                  작성글 보기
                </button>
              )}
            </div>
          </div>
          <hr className='my-1 border-dark-gray' />
          <div className='flex items-end justify-between'>
            {date}
            <ShareViews label={view1} textColor='text-main-pink' icon={viewPink} />
          </div>
        </div>
      </div>
    </div>
  )
}

FreeBoard.propTypes = {
  boardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment1: PropTypes.number.isRequired,
  view1: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}

export default FreeBoard
