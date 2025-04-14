import PropTypes from 'prop-types'
import joboffer from '../../assets/icons/common/common_tag_ joboffer.svg'
import history from '../../assets/icons/common/common_tag_history.svg'
import jobsearch from '../../assets/icons/common/common_tag_jobsearch.svg'
import othersite from '../../assets/icons/common/common_tag_othersite.svg'
import popular from '../../assets/icons/common/common_tag_popular.svg'
import worktype from '../../assets/icons/common/common_tag_worktype.svg'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import bookmarkGray from '../../assets/icons/common/common_bookmark_gray.svg'
import bookmarkPink from '../../assets/icons/common/common_bookmark_pink.svg'
import TagIcon from './TagIcon'
import ShareViews from './ShareViews'
const WorkBoard = ({
  title,
  name,
  date,
  like,
  onClick,
  popular1,
  joboffer1,
  history1,
  jobsearch1,
  othersite1,
  worktype1,
  view,
  className,
}) => {
  const bookmarkIcon = like === true ? bookmarkPink : bookmarkGray
  return (
    <div className={`w-[300px] h-[200px] mb-[20px] ${className}`}>
      <img
        src={bookmarkIcon}
        alt='bookmark'
        onClick={onClick}
        className='w-[23px] h-[23px] relative absolute top-[20px] left-[255px] '
      />
      <div className='flex flex-col h-full  border border-[#D6D6D6] rounded-[10px] px-[18px] pt-[15px] pb-[10px] justify-between'>
        <div className='flex-row'>
          <div className='flex flex-wrap gap-2 mb-2'>
            {popular1 === true ? <TagIcon label='인기 글' icon={popular} /> : ''}
            {joboffer1 === true ? <TagIcon label='구인' icon={joboffer} /> : ''}
            {history1 === true ? <TagIcon label='경력 1~3년' icon={history} /> : ''}
            {jobsearch1 === true ? <TagIcon label='구직' icon={jobsearch} /> : ''}
            {othersite1 === true ? <TagIcon label='외부 사이트' icon={othersite} /> : ''}
            {worktype1 === true ? <TagIcon label='정규직' icon={worktype} /> : ''}
          </div>
          <div onClick={onClick} className='flex text-[18px] font-bold line-clamp-2'>
            {title}
          </div>
        </div>
        <div className='flex-row  text-dark-gray text-[14px]'>
          <div onClick={onClick} className='flex justify-end font-bold '>
            {name}
          </div>
          <hr className='my-1 border-dark-gray' />
          <div className='flex items-end justify-between'>
            {date}
            <ShareViews label={view} textColor='text-main-pink' icon={viewPink} />
          </div>
        </div>
      </div>
    </div>
  )
}

WorkBoard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  view: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  like: PropTypes.bool.isRequired,
  popular1: PropTypes.bool.isRequired,
  joboffer1: PropTypes.bool.isRequired,
  history1: PropTypes.bool.isRequired,
  jobsearch1: PropTypes.bool.isRequired,
  othersite1: PropTypes.bool.isRequired,
  worktype1: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}
export default WorkBoard
