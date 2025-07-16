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
import ToastService from '../../../../../services/toast/ToastService'
import DOMPurify from 'dompurify'
import { useEffect, useRef } from 'react'
import { saveTOStorage } from '../../../../my/detail/components/saveToStorage'

const JobSeekDetailPage = () => {
  const { user } = useAuthStore()
  const { id } = useParams()
  const { data, loading, error } = useJobSeekPostDetail(id)
  const { scraps, toggleScrap, loading: scrapLoading } = useScrapStore()
  const isScrapped = Boolean(scraps[id])
  const currentUrl = window.location.href
  const navigate = useNavigate()
  const hasSaved = useRef(false)

  useEffect(() => {
    if (data && !hasSaved.current) {
      saveTOStorage(data, id, 'jobSeekings')
      hasSaved.current = true
    }
    return () => {
      hasSaved.current = false
    }
  }, [data, id])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }
  if (error) return <p className='text-center text-error-red'>존재하지 않는 게시글입니다.</p>
  if (!data) return <p className='text-center text-dark-gray'>게시글이 없습니다.</p>

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
    <div className='w-full max-w-[940px] mx-auto '>
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
            className='w-6 h-6'
          />
        </button>
      </div>

      <div className='flex items-start justify-between gap-2 mt-3 sm:flex-row'>
        <h1 className='flex-1 min-w-0 text-[24px] sm:text-2xl md:text-3xl font-bold text-left break-words mt-2'>
          {data.title}
        </h1>
        <span className='self-start block mt-4 text-xs font-bold text-dark-gray sm:text-sm shrink-0 '>
          [구인 | 구직]
        </span>
      </div>

      {user && user.nickname === data.nickname && (
        <div className='flex justify-end gap-4 mt-5 text-sm text-dark-gray'>
          <p className='cursor-pointer' onClick={handleEditClick}>
            수정
          </p>
          <p className='cursor-pointer' onClick={handleDeleteClick}>
            삭제
          </p>
        </div>
      )}
      <DetailPostLine />
      <dl className='grid my-5 gap-y-4'>
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
            <dt className='text-sm font-semibold text-left text-dark-gray sm:text-base'>{label}</dt>
            <dd className='text-sm text-left break-words sm:text-base'>{value}</dd>
          </div>
        ))}
      </dl>
      <LastFormLine />
      <div className='flex justify-end gap-2 mb-4 ml-0 mr-0 sm:ml-5 sm:mr-3'>
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
        className='block mt-4 mb-10 text-sm text-left break-words whitespace-pre-line sm:text-base'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.text) }}
      />
      <LastFormLine />
      <h2 className='flex self-start my-5 text-lg font-bold sm:text-xl mt-7'>관련 글</h2>
      <RelatedJobSearchPosts currentId={id} />
    </div>
  )
}

export default JobSeekDetailPage
