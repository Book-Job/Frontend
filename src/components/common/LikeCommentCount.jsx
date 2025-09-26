import { useState } from 'react'
import PropTypes from 'prop-types'
import GoodIcon from '../../assets/icons/common/common_good.svg'
import NotGoodIcon from '../../assets/icons/common/common_good_before_icon.svg'
import { toggleCommentLike } from '../../domains/community/service/commentService'

const LikeCommentCount = ({
  boardId,
  commentId,
  initialCount = 0,
  initialActive = false,
  className,
}) => {
  const [count, setCount] = useState(initialCount)
  const [active, setActive] = useState(initialActive)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)

    try {
      const newActive = !active
      const newCount = newActive ? count + 1 : count - 1

      await toggleCommentLike(boardId, commentId, newActive)

      setActive(newActive)
      setCount(newCount)
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex items-center mb-1 cursor-pointer ${className}`} onClick={handleClick}>
      <img
        src={active ? GoodIcon : NotGoodIcon}
        alt='좋아요'
        className='w-4 h-4 mt-1 md:w-5 md:h-5'
      />
      <span className='flex mt-1 ml-1 text-dark-gray'>{count}</span>
    </div>
  )
}

LikeCommentCount.propTypes = {
  boardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  commentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialCount: PropTypes.number,
  initialActive: PropTypes.bool,
  className: PropTypes.string,
}

export default LikeCommentCount
