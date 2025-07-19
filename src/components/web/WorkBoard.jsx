import PropTypes from 'prop-types'
import ROUTER_PATHS from '../../routes/RouterPath'
import joboffer from '../../assets/icons/common/common_tag_joboffer.svg'
import history from '../../assets/icons/common/common_tag_history.svg'
import jobsearch from '../../assets/icons/common/common_tag_jobsearch.svg'
import popular from '../../assets/icons/common/common_tag_popular.svg'
import worktype from '../../assets/icons/common/common_tag_worktype.svg'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import bookmarkGray from '../../assets/icons/common/common_bookmark_gray.svg'
import bookmarkPink from '../../assets/icons/common/common_bookmark_pink.svg'
import TagIcon from './TagIcon'
import ShareViews from './ShareViews'
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
const WorkBoard = ({
  title,
  name,
  date,
  onClick,
  popular1,
  joboffer1,
  jobsearch1,
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
    } catch (error) {
      if (error?.response?.status === 401) {
        openModal({
          title: '로그인이 필요합니다',
          description: '세션이 만료되었거나 로그인되지 않았습니다.\n로그인 페이지로 이동할까요?',
          buttonLabel: '로그인하기',
          onButtonClick: (navigate) => {
            navigate(ROUTER_PATHS.LOGIN_MAIN)
          },
        })
      } else {
        ToastService.error('스크랩 처리 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <>
      <div className='w-full h-[200px] relative'>
        <button
          onClick={() => {
            handleToggleScrap()
          }}
          className='absolute top-[-2px] right-3 z-10 bg-transparent border-none p-0'
          aria-label={scrapped ? '스크랩 해제' : '스크랩'}
          title={scrapped ? '스크랩 해제' : '스크랩'}
        >
          <img
            src={bookmarkIcon}
            alt='북마크'
            className='w-6 h-6'
            style={{ opacity: loading ? 0.5 : 1 }}
          />
        </button>
        <div
          onClick={onClick}
          className='flex flex-col h-full border border-[#D6D6D6] rounded-[10px] px-[18px] pt-[15px] pb-[10px] justify-between cursor-pointer'
        >
          <div className='flex flex-wrap justify-start gap-x-2 gap-y-1 mb-2'>
            {popular1 && <TagIcon label='인기 글' icon={popular} />}
            {joboffer1 && <TagIcon label='구인' icon={joboffer} />}
            {experienceLabel && <TagIcon label={experienceLabel} icon={history} />}
            {jobsearch1 && <TagIcon label='구직' icon={jobsearch} />}

            {employmentType && (
              <TagIcon label={getEmploymentLabel(employmentType)} icon={worktype} />
            )}
          </div>
          <h3
            className='mb-1 text-sm font-bold text-start sm:text-base md:text-lg 
            line-clamp-2 leading-snug overflow-hidden break-words'
          >
            {title}
          </h3>
          <div className='flex-row text-xs text-dark-gray sm:text-sm md:text-base'>
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
