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
import useScrapStore from '../../domains/job/scrap/store/useScrapStore'
import { employmentTypes } from '../../domains/job/common/utils/employmentTypes'
import getExperienceLabel from '../../domains/job/common/utils/getExperienceLabel'

const getEmploymentLabel = (value) => {
  const found = employmentTypes.find((item) => item.value === value)
  return found ? found.label : value
}

const WorkBoard = ({
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

  const handleToggleScrap = () => {
    toggleScrap(postId, type)
  }

  return (
    <div className={`w-[290px] h-[200px] mb-[20px]`}>
      <img
        src={bookmarkIcon}
        alt='bookmark'
        className='w-[23px] h-[23px] relative absolute top-[20px] left-[255px] cursor-pointer'
        onClick={handleToggleScrap}
        style={{ opacity: loading ? 0.5 : 1 }}
      />
      <div className='flex flex-col h-full border border-[#D6D6D6] rounded-[10px] px-[18px] pt-[15px] pb-[10px] justify-between cursor-pointer'>
        <div className='flex flex-wrap gap-2 mb-2'>
          {popular1 && <TagIcon label='인기 글' icon={popular} />}
          {joboffer1 && <TagIcon label='구인' icon={joboffer} />}
          {experienceLabel && <TagIcon label={experienceLabel} icon={history} />}

          {jobsearch1 && <TagIcon label='구직' icon={jobsearch} />}
          {othersite1 && <TagIcon label='외부 사이트' icon={othersite} />}
          {employmentType && <TagIcon label={getEmploymentLabel(employmentType)} icon={worktype} />}
        </div>
        <h3 onClick={onClick} className='flex text-[18px] font-bold line-clamp-2'>
          {title}
        </h3>
        <div className='flex-row text-dark-gray text-[14px]'>
          <div onClick={onClick} className='flex justify-end font-bold'>
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
  postId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  view: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  like: PropTypes.bool.isRequired,
  popular1: PropTypes.bool.isRequired,
  joboffer1: PropTypes.bool.isRequired,
  experienceLabel: PropTypes.string,
  jobsearch1: PropTypes.bool.isRequired,
  othersite1: PropTypes.bool.isRequired,
  employmentType: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  userId: PropTypes.number.isRequired,
}

export default WorkBoard
