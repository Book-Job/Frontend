import { useNavigate, useParams } from 'react-router-dom'
import useJobSeekPostDetail from '../hook/useJobSeekPostDetail'
import Spinner from '../../../../../components/web/Spinner'
import unScrapIcon from '../../../../../assets/icons/common/common_bookmark_gray.svg'
import ScrapIcon from '../../../../../assets/icons/common/common_bookmark_pink.svg'
import DetailPostLine from '../../../common/components/DetailPostLine'
import useAuthStore from '../../../../../store/login/useAuthStore'
import { getEmploymentTypeLabel } from '../../../common/utils/employmentTypes'
import { getJobCategoryLabel } from '../../../common/utils/jobCategories'
import LastFormLine from '../../../common/components/LastFormLine'
import MobileShare from '../../../../../components/app/MobileShare'
import viewPink from '../../../../../assets/icons/common/common_view_pink.svg'
import share from '../../../../../assets/icons/common/common_share.svg'
import { deleteJobSeekPost } from '../../../common/service/postService'
import ROUTER_PATHS from '../../../../../routes/RouterPath'
import RelatedJobSearchPosts from '../components/RelatedJobSearchPosts'
import useScrapStore from '../../../scrap/store/useScrapStore'
import ToastService from '../../../../../utils/toastService'
import DOMPurify from 'dompurify'

const JobSeekDetailPage = () => {
  const { user } = useAuthStore()
  const { id } = useParams()
  const { data, loading, error } = useJobSeekPostDetail(id)
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
  if (!data) return <p className='text-center text-gray-500'>게시글이 없습니다.</p>

  const handleEditClick = () => {
    navigate(ROUTER_PATHS.JOB_SEARCH_POST_EDIT.replace(':id', id))
  }

  const handleDeleteClick = async () => {
    try {
      await deleteJobSeekPost(id)
      ToastService.success('성공적으로 삭제되었습니다.')
      navigate(ROUTER_PATHS.JOB_MAIN, { state: { refresh: true } })
    } catch (error) {
      console.error(error)
    }
  }

  const handleScrapClick = async () => {
    try {
      await toggleScrap(id, 'JOB_SEEKING')
    } catch (error) {
      console.error('스크랩 처리 중 오류:', error)
      ToastService.error('스크랩 중에 오류가 발생했습니다.')
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
          <p className='cursor-pointer' onClick={handleEditClick}>
            수정
          </p>
          <p className='cursor-pointer' onClick={handleDeleteClick}>
            삭제
          </p>
        </div>
      )}
      <DetailPostLine />
      <dl className='grid gap-y-4 my-5'>
        {[
          ['근무형태', getEmploymentTypeLabel(data.employmentType)],
          ['직군', getJobCategoryLabel(data.jobCategory)],
          ['경력', data.experience],
          ['연락가능한 이메일', data.contactEmail],
        ].map(([label, value]) => (
          <div
            key={label}
            className='grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-4 items-start'
          >
            <dt className='font-semibold text-dark-gray text-left text-sm sm:text-base'>{label}</dt>
            <dd className='text-left text-sm sm:text-base break-words'>{value}</dd>
          </div>
        ))}
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
        />
        <MobileShare label={data.viewCount} icon={viewPink} textColor='text-main-pink' />
      </div>
      <div
        className='block mt-4 mb-10 whitespace-pre-line text-sm sm:text-base break-words'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.text) }}
      />
      <LastFormLine />
      <h2 className='font-bold text-lg sm:text-xl mt-7 flex self-start'>관련 글</h2>
      <RelatedJobSearchPosts currentId={id} />
    </div>
  )
}

export default JobSeekDetailPage
