import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import comment from '../../assets/icons/common/comment.svg'
import MobileShare from './MobileShare'
import { BsCardImage } from 'react-icons/bs'
import LikeCount from '../common/LikeCount'

const MobileFreeBoard = ({
  boardId,
  title,
  content,
  name,
  date,
  onClick,
  likeCount,
  commentCount,
  viewCount,
  isImagePost,
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
    <div className='w-full max-w-xs min-h-[140px]' onClick={goToDetailPage}>
      <div className='flex flex-col h-full  border border-light-gray rounded-[10px] px-[20px] pt-[20px] pb-[16px] justify-between cursor-pointer text-left'>
        <div className='flex-row' onClick={onClick}>
          <div className='text-[18px] font-bold line-clamp-2'>{title}</div>
          <div className='mt-2 text-sm sm:text-base line-clamp-1'>
            {isImagePost ? (
              <span className='flex items-center gap-1 text-dark-gray'>
                <BsCardImage className='text-lg' />
                이미지 게시글입니다
              </span>
            ) : (
              content
            )}
          </div>
        </div>
        <div className='flex-row  text-dark-gray text-[14px]'>
          <div onClick={onClick} className='flex justify-between font-bold '>
            <div className='flex items-center gap-3'>
              <MobileShare label={commentCount} textColor='text-dark-gray' icon={comment} />
              <LikeCount count={likeCount} />
            </div>
            <div className='relative inline-block mt-1'>
              <span
                onClick={handleNameClick}
                className='z-10 text-sm font-medium cursor-pointer hover:underline'
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
          <hr className='my-1 border-dark-gray' />
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
  likeCount: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}
export default MobileFreeBoard
