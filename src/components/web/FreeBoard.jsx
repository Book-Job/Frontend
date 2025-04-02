import PropTypes from 'prop-types'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import comment from '../../assets/icons/common/comment.svg'

import ShareViews from './ShareViews'
<<<<<<< HEAD
const FreeBoard = ({ title, content, name, date, onClick, comment1, view1 }) => {
  return (
    <div className='w-[300px] h-[200px]'>
      <div className='flex flex-col h-full  border border-[#D6D6D6] rounded-[10px] px-[25px] pt-[25px] pb-[20px] justify-between'>
=======
const FreeBoard = ({ title, content, name, date, onClick }) => {
  return (
    <div className='w-[300px] h-[200px]'>
      <div className='flex flex-col h-full  border border-[#D6D6D6] rounded-[10px] px-[25px] pt-[25px] pb-[16px] justify-between'>
>>>>>>> 66500cf (style: 1차 설정)
        <div className='flex-row' onClick={onClick}>
          <div className='text-[18px] font-bold line-clamp-1'>{title}</div>
          <div className='mt-[10px] text-[16px] line-clamp-2'>{content}</div>
        </div>
        <div className='flex-row  text-gray-8e8e8e text-[14px]'>
          <div onClick={onClick} className='flex justify-between font-bold '>
<<<<<<< HEAD
            <ShareViews label={comment1} textColor='text-gray-8e8e8e' icon={comment} />
            <div>{name}</div>
          </div>
          <hr className='my-1 border-gray-8e8e8e' />
          <div className='flex items-end justify-between'>
            {date}
            <ShareViews label={view1} textColor='text-[#E36397]' icon={viewPink} />
=======
            <ShareViews label='123' textColor='text-gray-8e8e8e' icon={comment} />
            <div>{name}</div>
          </div>
          <hr className='border-gray-8e8e8e my-2' />
          <div className='flex items-end justify-between'>
            {date}
            <ShareViews label='123' textColor='text-[#E36397]' icon={viewPink} />
>>>>>>> 66500cf (style: 1차 설정)
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
<<<<<<< HEAD
  comment1: PropTypes.number.isRequired,
  view1: PropTypes.number.isRequired,
=======
>>>>>>> 66500cf (style: 1차 설정)
  onClick: PropTypes.func,
}
export default FreeBoard
