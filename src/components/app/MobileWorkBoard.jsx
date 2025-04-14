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
import TagIcon from '../web/TagIcon'
import MobileShare from './MobileShare'
const MobileWorkBoard = ({
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
    <div className={`w-[336px] h-[160px] ${className} mt-3`}>
      <div className='relative flex flex-col h-full border border-light-gray rounded-[10px] px-[20px] pt-[20px] pb-[16px] justify-between'>
        <img
          src={bookmarkIcon}
          alt='bookmark'
          onClick={onClick}
          className='w-[23px] h-[23px] absolute top-[-2px] right-4 z-10'
        />

        <div className='flex-row'>
          <div className='flex flex-wrap gap-1 mb-2'>
            {popular1 && <TagIcon label='인기 글' icon={popular} />}
            {joboffer1 && <TagIcon label='구인' icon={joboffer} />}
            {history1 && <TagIcon label='경력 1~3년' icon={history} />}
            {jobsearch1 && <TagIcon label='구직' icon={jobsearch} />}
            {othersite1 && <TagIcon label='외부 사이트' icon={othersite} />}
            {worktype1 && <TagIcon label='정규직' icon={worktype} />}
          </div>
          <div onClick={onClick} className='text-[18px] font-bold line-clamp-2'>
            {title}
          </div>
        </div>
        <div className='flex-row text-dark-gray text-[14px]'>
          <div onClick={onClick} className='flex justify-end font-bold'>
            {name}
          </div>
          <hr className='my-1 border-dark-gray' />
          <div className='flex items-end justify-between'>
            {date}
            <MobileShare label={view} textColor='text-main-pink' icon={viewPink} />
          </div>
        </div>
      </div>
    </div>
  )
}

MobileWorkBoard.propTypes = {
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
}
export default MobileWorkBoard
