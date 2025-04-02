import PropTypes from 'prop-types'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import comment from '../../assets/icons/common/comment.svg'

import ShareViews from './ShareViews'
const FreeBoard = ({ title, content, name, date, onClick, comment1, view1 }) => {
  return (
    <div className='w-[300px] h-[200px]'>
      <div className='flex flex-col h-full  border border-[#D6D6D6] rounded-[10px] px-[25px] pt-[25px] pb-[20px] justify-between'>
        <div className='flex-row' onClick={onClick}>
          <div className='text-[18px] font-bold line-clamp-1'>{title}</div>
          <div className='mt-[10px] text-[16px] line-clamp-2'>{content}</div>
        </div>
        <div className='flex-row  text-gray-8e8e8e text-[14px]'>
          <div onClick={onClick} className='flex justify-between font-bold '>
            <ShareViews label={comment1} textColor='text-gray-8e8e8e' icon={comment} />
            <div>{name}</div>
          </div>
          <hr className='my-1 border-gray-8e8e8e' />
          <div className='flex items-end justify-between'>
            {date}
            <ShareViews label={view1} textColor='text-[#E36397]' icon={viewPink} />
          </div>
        </div>
      </div>
    </div>
  )
}

FreeBoard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment1: PropTypes.number.isRequired,
  view1: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}
export default FreeBoard
