import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import comment from '../../assets/icons/common/comment.svg'
import ShareViews from './ShareViews'
import ROUTER_PATHS from '../../routes/RouterPath'

const FreeBoard = ({ boardId, title, content, name, date, onClick, commentCount, viewCount }) => {
  const [showButton, setShowButton] = useState(false)
  const navigate = useNavigate()

  const handleNameClick = (e) => {
    e.stopPropagation()
    setShowButton((prev) => !prev)
  }

  const goToAuthorPosts = (e) => {
    e.stopPropagation()
    navigate(ROUTER_PATHS.USER_POST)
  }

  const goToDetailPage = () => {
    navigate(`/community/post/${boardId}`)
  }

  return (
    <div
      className='w-full max-w-md sm:max-w-[350px] md:max-w-[400px] mx-auto'
      onClick={goToDetailPage}
    >
      <div
        className='
        flex flex-col h-full
        border border-[#D6D6D6]
        rounded-[10px]
        px-4 sm:px-5 pt-5 pb-4
        mb-4
        justify-between cursor-pointer
        bg-white
        shadow-sm
        transition
        hover:shadow-md
      '
      >
        <div className='flex flex-col items-start text-left' onClick={onClick}>
          <div className='text-base sm:text-lg font-bold truncate'>{title}</div>
          <div className='mt-2 text-sm sm:text-base line-clamp-2'>{content}</div>
        </div>

        <div className='text-dark-gray text-xs sm:text-sm mt-4'>
          <div className='flex justify-between font-bold'>
            <ShareViews label={commentCount} textColor='text-dark-gray' icon={comment} />
            <div className='relative inline-block'>
              <span
                onClick={handleNameClick}
                className='cursor-pointer hover:underline z-10 text-xs sm:text-sm font-medium'
              >
                {name}
              </span>
              {showButton && (
                <button
                  onClick={goToAuthorPosts}
                  className='absolute left-1/2 -translate-x-1/2 top-[100%] mt-1 bg-white text-xs text-black px-2 py-1 rounded-md border border-gray-300 whitespace-nowrap shadow-md'
                >
                  작성글 보기
                </button>
              )}
            </div>
          </div>
          <hr className='my-1 border-dark-gray' />
          <div className='flex items-end justify-between'>
            {date}
            <ShareViews label={viewCount} textColor='text-main-pink' icon={viewPink} />
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
  commentCount: PropTypes.number.isRequired,
  viewCount: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}

export default FreeBoard
