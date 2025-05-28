import PropTypes from 'prop-types'
import { useState } from 'react'
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
import useScrapStore from '../../domains/job/scrap/store/useScrapStore'
import { employmentTypes } from '../../domains/job/common/utils/employmentTypes'
import LoginRequiredAlert from '../common/LoginRequiredAlert'
import useAuthStore from '../../store/login/useAuthStore'
const getEmploymentLabel = (value) => {
  const found = employmentTypes.find((item) => item.value === value)
  return found ? found.label : value
}
const WorkBoard = ({
  title,
  name,
  date,
  onClick,
  popular1,
  joboffer1,
  jobsearch1,
  othersite1,
  employmentType,
  experienceLabel,
  view,
  type,
  postId,
}) => {
  const scraps = useScrapStore((state) => state.scraps)
  const loading = useScrapStore((state) => state.loading)
  const toggleScrap = useScrapStore((state) => state.toggleScrap)

  const { isAuthenticated } = useAuthStore()
  const [showLoginAlert, setShowLoginAlert] = useState(false)

  const scrapped = Boolean(scraps[postId])
  const bookmarkIcon = scrapped ? bookmarkPink : bookmarkGray

  const handleToggleScrap = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true)
      return
    }
    toggleScrap(postId, type)
  }

  return (
    <>
      <div className='w-full h-[200px] mb-3 mt-3 relative'>
        <button
          className='absolute top-[-2px] right-3 z-10 bg-transparent border-none p-0'
          onClick={handleToggleScrap}
          aria-label={scrapped ? '스크랩 해제' : '스크랩'}
        >
          <img
            src={bookmarkIcon}
            alt='북마크'
            className='w-6 h-6'
            style={{ opacity: loading ? 0.5 : 1 }}
          />
        </button>
        <div className='flex flex-col h-full border border-[#D6D6D6] rounded-[10px] px-[18px] pt-[15px] pb-[10px] justify-between cursor-pointer'>
          <div className='flex flex-wrap gap-2 mb-2'>
            {popular1 && <TagIcon label='인기 글' icon={popular} />}
            {joboffer1 && <TagIcon label='구인' icon={joboffer} />}
            {experienceLabel && <TagIcon label={experienceLabel} icon={history} />}
            {jobsearch1 && <TagIcon label='구직' icon={jobsearch} />}
            {othersite1 && <TagIcon label='외부 사이트' icon={othersite} />}
            {employmentType && (
              <TagIcon label={getEmploymentLabel(employmentType)} icon={worktype} />
            )}
          </div>
          <h3
            onClick={onClick}
            className='flex font-bold line-clamp-2 text-sm sm:text-base md:text-lg mb-1'
          >
            {title}
          </h3>
          <div className='flex-row text-dark-gray text-xs sm:text-sm md:text-base'>
            <div onClick={onClick} className='flex justify-end font-bold'>
              {name}
            </div>
            <hr className='my-1 border-dark-gray' />
            <div className='flex items-end justify-between'>
              <span>{date}</span>
              <ShareViews label={view} textColor='text-main-pink' icon={viewPink} />
            </div>
          </div>
        </div>
      </div>
      <LoginRequiredAlert isOpen={showLoginAlert} onClose={() => setShowLoginAlert(false)} />
    </>
  )
}

WorkBoard.propTypes = {
  type: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  view: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  popular1: PropTypes.bool.isRequired,
  joboffer1: PropTypes.bool.isRequired,
  experienceLabel: PropTypes.string,
  jobsearch1: PropTypes.bool.isRequired,
  othersite1: PropTypes.bool.isRequired,
  employmentType: PropTypes.string,
  onClick: PropTypes.func,
}

export default WorkBoard
