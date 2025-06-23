import { useParams, useNavigate } from 'react-router-dom'
import useRecruitmentPostDetail from '../hook/useRecruitmentPostDetail'
import Spinner from '../../../../../components/web/Spinner'
import unScrapIcon from '../../../../../assets/icons/common/common_bookmark_gray.svg'
import ScrapIcon from '../../../../../assets/icons/common/common_bookmark_pink.svg'
import DetailPostLine from '../../../common/components/DetailPostLine'
import RelatedRecruitmentPosts from '../components/RelatedRecruitmentPosts'
import { getJobCategoryLabel } from '../../../common/utils/jobCategories'
import { getEmploymentTypeLabel } from '../../../common/utils/employmentTypes'
import LastFormLine from '../../../common/components/LastFormLine'
import MobileShare from '../../../../../components/app/MobileShare'
import viewPink from '../../../../../assets/icons/common/common_view_pink.svg'
import share from '../../../../../assets/icons/common/common_share.svg'
import { deleteRecruitmentPost } from '../../../common/service/postService'
import ROUTER_PATHS from '../../../../../routes/RouterPath'
import useAuthStore from '../../../../../store/login/useAuthStore'
import useScrapStore from '../../../scrap/store/useScrapStore'
import ToastService from '../../../../../utils/toastService'
import DOMPurify from 'dompurify'

const RecruitmentDetailPage = () => {
  const { user } = useAuthStore()
  const { id } = useParams()
  const { data, loading, error } = useRecruitmentPostDetail(id)
  const { scraps, toggleScrap, loading: scrapLoading } = useScrapStore()
  const isScrapped = Boolean(scraps[id])
  const currentUrl = window.location.href
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }
  if (error) return <p className='text-center text-red-500'>존재하지 않는 게시글입니다.</p>
  if (!data) return <p className='text-center text-dark-gray'>게시글이 없습니다.</p>

  const handleEditClick = () => {
    navigate(ROUTER_PATHS.RECRUITMENT_POST_EDIT.replace(':id', id))
  }

  const handleDeleteClick = async () => {
    try {
      await deleteRecruitmentPost(id)
      ToastService.success('성공적으로 삭제되었습니다.')
      navigate(ROUTER_PATHS.JOB_MAIN, {
        state: { refresh: true, triggerRefresh: true },
      })
    } catch (error) {
      ToastService.error('삭제 중 오류 발생')
      console.error(error)
    }
  }

  const handleScrapClick = async () => {
    try {
      await toggleScrap(id, 'JOB_POSTING')
    } catch (error) {
      console.error('오류')
    }
  }

  return (
    <div className='w-full max-w-3xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0'>
      <div className='flex flex-row items-center justify-between gap-2 mt-6'>
        <span className='font-semibold text-base sm:text-xl md:text-2xl truncate max-w-[70%]'>
          {data.nickname}
        </span>
        <button
          aria-label='스크랩'
          onClick={handleScrapClick}
          disabled={scrapLoading}
          className='ml-2'
        >
          <img
            src={isScrapped ? ScrapIcon : unScrapIcon}
            alt='스크랩 상태 아이콘'
            className='w-5 h-5'
          />
        </button>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-start mt-3 gap-2'>
        <h1 className='flex-1 min-w-0 mt-2 text-lg sm:text-2xl md:text-3xl font-bold text-left break-words'>
          {data.title}
        </h1>
        <span className='block text-dark-gray mt-2 font-bold text-xs sm:text-sm self-start shrink-0'>
          [구인 | 구직]
        </span>
      </div>
      {user && user.nickname === data.nickname && (
        <div className='flex justify-end mt-5 gap-4 text-sm text-dark-gray'>
          <span className='cursor-pointer' onClick={handleEditClick}>
            수정
          </span>
          <span className='cursor-pointer' onClick={handleDeleteClick}>
            삭제
          </span>
        </div>
      )}
      <DetailPostLine />
      <dl className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 my-5'>
        <div className='grid grid-cols-[6rem_1fr] items-center gap-x-2'>
          <dt className='font-semibold text-dark-gray'>근무형태</dt>
          <dd>{getEmploymentTypeLabel(data.employmentType)}</dd>
        </div>
        <div className='grid grid-cols-[6rem_1fr] items-center gap-x-2'>
          <dt className='font-semibold text-dark-gray'>경력</dt>
          <dd>
            {data.experienceMin}년 ~ {data.experienceMax}년
          </dd>
        </div>
        <div className='grid grid-cols-[6rem_1fr] items-center gap-x-2'>
          <dt className='font-semibold text-dark-gray'>근무지역</dt>
          <dd>{data.location}</dd>
        </div>
        <div className='grid grid-cols-[6rem_1fr] items-center gap-x-2'>
          <dt className='font-semibold text-dark-gray'>직군</dt>
          <dd>{getJobCategoryLabel(data.jobCategory)}</dd>
        </div>
        <div className='grid grid-cols-[6rem_1fr] items-center gap-x-2'>
          <dt className='font-semibold text-dark-gray'>지원 마감일</dt>
          <dd>
            {data.closingDate ? new Date(data.closingDate).toLocaleDateString('ko-KR') : '상시채용'}
          </dd>
        </div>
        <div className='grid grid-cols-[6rem_1fr] items-center gap-x-2'>
          <dt className='font-semibold text-dark-gray'>자사 웹사이트</dt>
          <dd>{data.websiteUrl}</dd>
        </div>
      </dl>
      <LastFormLine />
      <div className='flex gap-2 mb-4 ml-0 sm:ml-5 justify-end mr-0 sm:mr-3'>
        <MobileShare
          label='공유'
          icon={share}
          textColor='text-dark-gray'
          weblink={currentUrl}
          title={data.title}
          post={data}
          isShare={true}
        />
        <MobileShare label={data.viewCount} icon={viewPink} textColor='text-main-pink' />
      </div>
      <div
        className='block mt-4 mb-10 whitespace-pre-line text-sm sm:text-base break-words text-left'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.text) }}
      />
      <LastFormLine />
      <h2 className='font-bold text-lg sm:text-xl my-5 flex self-start'>관련 글</h2>
      <RelatedRecruitmentPosts currentId={id} />
    </div>
  )
}

export default RecruitmentDetailPage
