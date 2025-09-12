import { useState } from 'react'
import PropTypes from 'prop-types'
import GoodIcon from '../../assets/icons/common/common_good.svg'
import NotGoodIcon from '../../assets/icons/common/common_good_before_icon.svg'
import { toggleLike } from '../../domains/community/service/postService'

const LikeCount = ({ id, initialCount = 0, initialActive = false, className }) => {
  const [count, setCount] = useState(initialCount)
  const [active, setActive] = useState(initialActive)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)

    try {
      const newActive = !active
      const newCount = newActive ? count + 1 : count - 1

      await toggleLike(id, newActive)

      setActive(newActive)
      setCount(newCount)
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`flex items-center gap-1 mb-1 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <img src={active ? GoodIcon : NotGoodIcon} alt='좋아요' className='w-5 h-5' />
      <span className='flex mt-1'>{count}</span>
    </div>
  )
}

LikeCount.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialCount: PropTypes.number,
  initialActive: PropTypes.bool,
  className: PropTypes.string,
}

export default LikeCount
