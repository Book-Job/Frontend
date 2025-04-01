import PropTypes from 'prop-types'
import TagIcon from './TagIcon'
import joboffer from '../../assets/icons/common/common_tag_ joboffer.svg'
import history from '../../assets/icons/common/common_tag_history.svg'
import jobsearch from '../../assets/icons/common/common_tag_jobsearch.svg'
import othersite from '../../assets/icons/common/common_tag_othersite.svg'
import popular from '../../assets/icons/common/common_tag_popular.svg'
import worktype from '../../assets/icons/common/common_tag_worktype.svg'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import bookmarkGray from '../../assets/icons/common/common_bookmark_gray.svg'
import bookmarkPink from '../../assets/icons/common/common_bookmark_pink.svg'
import ShareViews from './ShareViews'
const WorkBoard = ({ title, name, date, like, onClick }) => {
  const bookmarkIcon = like === true ? bookmarkPink : bookmarkGray
  return (
    <div className='w-[300px] h-[200px]'>
      <img
        src={bookmarkIcon}
        alt='bookmark'
        onClick={onClick}
        className='w-[23px] h-[23px] relative absolute top-[20px] left-[255px] '
      />
      <div className='flex flex-col h-full  border border-[#D6D6D6] rounded-[10px] px-[25px] pt-[25px] pb-[16px] justify-between'>
        <div className='flex-row'>
          <div className='flex flex-wrap gap-2 mb-2'>
            {/* <TagIcon label='인기 글' icon={popular} /> */}
            {/* <TagIcon label='구인' icon={joboffer} /> */}
            <TagIcon label='경력 1~3년' icon={history} />
            <TagIcon label='구직' icon={jobsearch} />
            {/* <TagIcon label='외부 사이트' icon={othersite} /> */}
            <TagIcon label='정규직' icon={worktype} />
          </div>
          <div onClick={onClick} className='text-[18px] font-bold'>
            {title}
          </div>
        </div>
        <div className='flex-row  text-gray-8e8e8e text-[14px]'>
          <div onClick={onClick} className='flex justify-end font-bold '>
            {name}
          </div>
          <hr className='border-gray-8e8e8e my-2' />
          <div className='flex items-end justify-between'>
            {date}
            <ShareViews label='123' textColor='text-[#E36397]' icon={viewPink} />
          </div>
        </div>
      </div>
    </div>
  )
}

WorkBoard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  like: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
}
export default WorkBoard
