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
import ToastService from '../../../../../services/toast/ToastService'
import { useEffect, useRef } from 'react'
import { saveTOStorage } from '../../../../my/detail/components/saveToStorage'
import useFreeDraftStore from '../../../../../store/mypage/useFreeDraftStore'
import ContentRenderer from '../../../../../components/common/ContentRenderer'
import writePencil from '../../../../../assets/icons/common/common_pencil2.svg'
import PinkButton from '../../../../../components/web/PinkButton'
import useWriteModalStore from '../../../../../store/modal/useWriteModalStore'

const RecruitmentDetailPage = () => {
  const { user } = useAuthStore()
  const { id } = useParams()
  const { data, loading, error } = useRecruitmentPostDetail(id)
  const { scraps, toggleScrap, loading: scrapLoading } = useScrapStore()
  const isScrapped = Boolean(scraps[id])
  const currentUrl = window.location.href
  const hasSaved = useRef(false)
  const { clearSelectedFreeDraft } = useFreeDraftStore()
  const { setShowModal } = useWriteModalStore()

  const navigate = useNavigate()
  useEffect(() => {
    if (data && !hasSaved.current) {
      saveTOStorage(data, id, 'jobPostings')
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
    clearSelectedFreeDraft()
    navigate(ROUTER_PATHS.RECRUITMENT_POST_EDIT.replace(':id', id))
  }

  const handleDeleteClick = async () => {
    const confirmed = window.confirm('삭제 후 복원이 불가능합니다. 정말 삭제하시겠습니까?')
    if (!confirmed) return

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

  const handleExternalLink = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return
    }

    const trimmedUrl = url.trim()

    if (/^(javascript|data|vbscript):/i.test(trimmedUrl)) {
      ToastService.error('허용되지 않는 링크입니다.')
      return
    }
    const safeUrl = /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`
    try {
      new URL(safeUrl)
    } catch {
      ToastService.error('유효하지 않은 링크입니다.')
      return
    }

    const isConfirmed = window.confirm(
      '외부 사이트로 이동합니다. 악성 링크일 수 있으니 주의하세요.\n계속하시겠습니까?',
    )
    if (isConfirmed) {
      window.open(safeUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCreatePostClick = () => setShowModal(true)

  const writePencilIcon = (
    <span className='flex flex-row justify-center gap-2 pr-2'>
      <img src={writePencil} alt='글 작성 버튼' className='w-[25px] h-[25px]' />내 글도 등록하기
    </span>
  )

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
        <h1 className='flex-1 min-w-0 text-[24px] sm:text-2xl md:text-3xl font-bold text-left break-words'>
          {data.title}
        </h1>
        <span className='self-start block mt-4 text-xs font-bold text-dark-gray sm:text-sm shrink-0 '>
          [구인 | 구직]
        </span>
      </div>
      {user && user.nickname === data.nickname && (
        <div className='flex justify-end gap-4 mt-5 text-sm text-dark-gray'>
          <span className='cursor-pointer' onClick={handleEditClick}>
            수정
          </span>
          <span className='cursor-pointer' onClick={handleDeleteClick}>
            삭제
          </span>
        </div>
      )}
      <DetailPostLine />
      <dl className='grid grid-cols-1 my-5 sm:grid-cols-2 gap-x-8 gap-y-5'>
        {[
          [
            '근무형태',
            !data.employmentType || data.employmentType === 'UNKNOWN'
              ? '협의'
              : getEmploymentTypeLabel(data.employmentType),
          ],
          [
            '경력',
            data.experienceMin === 0 && data.experienceMax === 0
              ? '경력무관'
              : `${data.experienceMin}년 ~ ${data.experienceMax}년`,
          ],
          [
            '근무지역',
            !data.location || data.location.trim().toUpperCase() === 'UNKNOWN'
              ? '협의'
              : data.location,
          ],
          ['직군', getJobCategoryLabel(data.jobCategory)],
          [
            '지원 마감일',
            data.closingDate ? new Date(data.closingDate).toLocaleDateString('ko-KR') : '상시채용',
          ],
          ['링크', data.websiteUrl],
        ].map(([label, value]) => (
          <div key={label} className='grid grid-cols-[6rem_1fr] items-start gap-x-2'>
            <dt className='text-sm font-semibold text-left text-dark-gray sm:text-base'>{label}</dt>
            <dd className='text-sm text-left break-words sm:text-base'>
              {label === '링크' && value ? (
                <a
                  href={value || '#'}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(e) => {
                    e.preventDefault()
                    handleExternalLink(value)
                  }}
                  className='underline text-link-color hover:opacity-80 visited:text-amber-900'
                >
                  바로가기
                </a>
              ) : (
                value
              )}
            </dd>
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
      <div className='block mt-4 mb-10 text-[16px] leading-relaxed text-left break-words whitespace-pre-line'>
        <ContentRenderer html={data.text} />
      </div>
      <div className='flex justify-end w-full'>
        <PinkButton label={writePencilIcon} type='button' onClick={handleCreatePostClick} />
      </div>
      <LastFormLine />
      <h2 className='flex self-start my-5 text-lg font-bold sm:text-xl'>관련 글</h2>
      <RelatedRecruitmentPosts currentId={id} />
    </div>
  )
}

export default RecruitmentDetailPage
