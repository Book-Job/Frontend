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
import useScrapStore from '../../domains/job/scrap/store/useScrapStore'
import { employmentTypes } from '../../domains/job/common/utils/employmentTypes'

const getEmploymentLabel = (value) => {
  const found = employmentTypes.find((item) => item.value === value)
  return found ? found.label : value
}

const MobileWorkBoard = ({
  title,
  name,
  date,
  like,
  onClick,
  popular1,
  joboffer1,
  jobsearch1,
  othersite1,
  employmentType,
  experienceLabel,
  view,
  className,
  type,
  postId,
  userId,
}) => {
  const scraps = useScrapStore((state) => state.scraps)
  const loading = useScrapStore((state) => state.loading)
  const toggleScrap = useScrapStore((state) => state.toggleScrap)

  const scrapped = Boolean(scraps[postId])
  const bookmarkIcon = scrapped ? bookmarkPink : bookmarkGray

  const handleToggleScrap = (e) => {
    e.stopPropagation()
    toggleScrap(postId, type)
  }

  return (
    <div
      className={`w-full max-w-xs mx-auto mt-3 ${className || ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className='relative flex flex-col h-auto border border-light-gray rounded-[10px] px-5 pt-5 pb-4 justify-between bg-white shadow-sm'>
        <button
          className='absolute top-[-2px] right-4 z-10 p-0 bg-transparent border-none'
          onClick={handleToggleScrap}
          disabled={loading}
          aria-label={scrapped ? '스크랩 해제' : '스크랩'}
        >
          <img
            src={bookmarkIcon}
            alt='스크랩 아이콘'
            className='w-6 h-6'
            style={{ opacity: loading ? 0.5 : 1 }}
          />
        </button>

        <div className='flex flex-wrap gap-1 mb-2'>
          {popular1 && <TagIcon label='인기 글' icon={popular} />}
          {joboffer1 && <TagIcon label='구인' icon={joboffer} />}
          {experienceLabel && <TagIcon label={experienceLabel} icon={history} />}
          {jobsearch1 && <TagIcon label='구직' icon={jobsearch} />}
          {othersite1 && <TagIcon label='외부 사이트' icon={othersite} />}
          {employmentType && <TagIcon label={getEmploymentLabel(employmentType)} icon={worktype} />}
        </div>
        <h3 className='text-base sm:text-lg font-bold line-clamp-2 mb-2 self-start'>{title}</h3>
        <div className='flex flex-col text-dark-gray text-xs sm:text-sm mt-auto'>
          <div className='flex justify-end font-bold mb-1'>{name}</div>
          <hr className='my-1 border-dark-gray' />
          <div className='flex items-end justify-between'>
            <span>{date}</span>
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
  experienceLabel: PropTypes.string,
  view: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  popular1: PropTypes.bool.isRequired,
  joboffer1: PropTypes.bool.isRequired,
  jobsearch1: PropTypes.bool.isRequired,
  othersite1: PropTypes.bool.isRequired,
  employmentType: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
export default MobileWorkBoard
