import PropTypes from 'prop-types'
import joboffer from '../../assets/icons/common/common_tag_joboffer.svg'
import history from '../../assets/icons/common/common_tag_history.svg'
import jobsearch from '../../assets/icons/common/common_tag_jobsearch.svg'
import popular from '../../assets/icons/common/common_tag_popular.svg'
import worktype from '../../assets/icons/common/common_tag_worktype.svg'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import bookmarkGray from '../../assets/icons/common/common_bookmark_gray.svg'
import bookmarkPink from '../../assets/icons/common/common_bookmark_pink.svg'
import TagIcon from '../web/TagIcon'
import ROUTER_PATHS from '../../routes/RouterPath'
import MobileShare from './MobileShare'
import useScrapStore from '../../domains/job/scrap/store/useScrapStore'
import { employmentTypes } from '../../domains/job/common/utils/employmentTypes'
import useModalStore from '../../store/modal/useModalStore'
import useAuthStore from '../../store/login/useAuthStore'
import ToastService from '../../services/toast/ToastService'
const getEmploymentLabel = (value) => {
  if (value === 'UNKNOWN') return '무관'
  const found = employmentTypes.find((item) => item.value === value)
  return found ? found.label : value
}
const MobileWorkBoard = ({
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
  className,
  type,
  postId,
}) => {
  const scraps = useScrapStore((state) => state.scraps)
  const loading = useScrapStore((state) => state.loading)
  const toggleScrap = useScrapStore((state) => state.toggleScrap)

  const { isAuthenticated } = useAuthStore()
  const openModal = useModalStore((state) => state.openModal)

  const scrapped = Boolean(scraps[postId])
  const bookmarkIcon = scrapped ? bookmarkPink : bookmarkGray

  const handleToggleScrap = async () => {
    if (!isAuthenticated) {
      openModal({
        title: '로그인이 필요합니다',
        description: '로그인이 필요한 기능입니다.\n로그인 페이지로 이동하시겠습니까?',
        buttonLabel: '로그인하기',
        onButtonClick: (navigate) => {
          navigate(ROUTER_PATHS.LOGIN_MAIN)
        },
      })
      return
    }
    try {
      const nowScrapped = await toggleScrap(postId, type)
      if (nowScrapped) {
        ToastService.success('스크랩되었습니다.')
      } else {
        ToastService.info('스크랩이 해제되었습니다.')
      }
    } catch {
      ToastService.error('스크랩 처리 중 오류가 발생했습니다.')
    }
  }
  return (
    <>
      <div
        className={`w-full max-w-xs mx-auto ${className || ''}`}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <div className='relative flex flex-col h-auto border border-light-gray rounded-[10px] px-5 pt-5 pb-4 justify-between bg-white shadow-sm'>
          <button
            className='absolute top-[-2px] right-4 z-10 p-0 bg-transparent border-none'
            onClick={(e) => {
              e.stopPropagation()
              handleToggleScrap()
            }}
            disabled={loading}
            aria-label={scrapped ? '스크랩 해제' : '스크랩'}
            title={scrapped ? '스크랩 해제' : '스크랩'}
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
            {employmentType && (
              <TagIcon label={getEmploymentLabel(employmentType)} icon={worktype} />
            )}
          </div>
          <h3 className='self-start mb-2 text-base font-bold sm:text-lg line-clamp-2 text-left'>
            {title}
          </h3>
          <div className='flex flex-col mt-auto text-xs text-dark-gray sm:text-sm'>
            <div className='flex justify-end mb-1 font-bold'>{name}</div>
            <hr className='my-1 border-dark-gray' />
            <div className='flex items-end justify-between'>
              <span>{date}</span>
              <MobileShare label={view} textColor='text-main-pink' icon={viewPink} />
            </div>
          </div>
        </div>
      </div>
    </>
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
