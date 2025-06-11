import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import comment from '../../assets/icons/common/comment.svg'
import MobileShare from './MobileShare'

const MobileFreeBoard = ({
  boardId,
  title,
  content,
  name,
  date,
  onClick,
  commentCount,
  viewCount,
}) => {
  const [showButton, setShowButton] = useState(false)
  const navigate = useNavigate()

  const handleNameClick = (e) => {
    e.stopPropagation()
    setShowButton((prev) => !prev)
  }

  const goToAuthorPosts = (e) => {
    e.stopPropagation()
    navigate(`/user-post/${name}/posts`)
  }

  const goToDetailPage = () => {
    navigate(`/community/post/${boardId}`)
  }

  return (
    <div className='w-full max-w-xs min-h-[140px] mb-3' onClick={goToDetailPage}>
      <div className='flex flex-col h-full  border border-dark-gray rounded-[10px] px-[20px] pt-[20px] pb-[16px] justify-between cursor-pointer text-left'>
        <div className='flex-row' onClick={onClick}>
          <div className='text-[18px] font-bold line-clamp-1'>{title}</div>
          <div className='mt-[5px] text-[14px] line-clamp-1'>{content}</div>
        </div>
        <div className='flex-row  text-dark-gray text-[14px]'>
          <div onClick={onClick} className='flex justify-between font-bold '>
            <MobileShare label={commentCount} textColor='text-dark-gray' icon={comment} />
            <div className='relative inline-block'>
              <span
                onClick={handleNameClick}
                className='cursor-pointer hover:underline z-10 text-sm font-medium'
              >
                {name}
              </span>

              {showButton && (
                <button
                  onClick={(e) => goToAuthorPosts(e)}
                  className='absolute left-1/2 -translate-x-1/2 top-[100%] mt-[1px] bg-white text-xs text-black px-2 py-[2px] rounded-md border border-gray-300 whitespace-nowrap shadow-md'
                >
                  작성글 보기
                </button>
              )}
            </div>
          </div>
          <hr className='border-dark-gray my-1' />
          <div className='flex items-end justify-between'>
            {date}
            <MobileShare label={viewCount} textColor='text-main-pink' icon={viewPink} />
          </div>
        </div>
      </div>
    </div>
  )
}

MobileFreeBoard.propTypes = {
  boardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  viewCount: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}
export default MobileFreeBoard
