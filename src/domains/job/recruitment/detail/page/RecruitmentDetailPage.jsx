import { useParams } from 'react-router-dom'
import useRecruitmentPostDetail from '../hook/useRecruitmentPostDetail'
import Spinner from '../../../../../components/web/Spinner'
import unScrapIcon from '../../../../../assets/icons/common/common_bookmark_gray.svg'
import ScrapIcon from '../../../../../assets/icons/common/common_bookmark_pink.svg' //아직 스크랩 적용 안 했음
import DetailPostLine from '../../../common/components/DetailPostLine'
import { getJobCategoryLabel } from '../../../common/utils/jobCategories'
import { getEmploymentTypeLabel } from '../../../common/utils/employmentTypes'
import LastFormLine from '../../../common/components/LastFormLine'
import MobileShare from '../../../../../components/app/MobileShare'
import viewPink from '../../../../../assets/icons/common/common_view_pink.svg'
import share from '../../../../../assets/icons/common/common_share.svg'
import { useNavigate } from 'react-router-dom'
import { deleteRecruitmentPost } from '../../../service/postService'
import ROUTER_PATHS from '../../../../../routes/RouterPath'
import useAuthStore from '../../../../../store/login/useAuthStore'
const RecruitmentDetailPage = () => {
  const { user } = useAuthStore()
  const { id } = useParams()
  const { data, loading, error } = useRecruitmentPostDetail(id)
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
    navigate(ROUTER_PATHS.RECRUITMENT_POST_EDIT.replace(':id', id))
  }

  const handleDeleteClick = async () => {
    try {
      await deleteRecruitmentPost(id)
      alert('성공적으로 삭제되었습니다.')
      navigate(ROUTER_PATHS.JOB_MAIN, { state: { refresh: true } })
    } catch (error) {
      alert('삭제 중 오류 발생')
      console.error(error)
    }
  }

  return (
    <div className='px-4 md:px-12 lg:px-[100px] xl:px-[250px]'>
      <div className='flex items-center gap-2 justify-between'>
        <span className='font-semibold text-lg sm:text-xl md:text-2xl lg:text-[20px]'>
          {data.nickname}
        </span>
        <button aria-label='스크랩'>
          <img src={unScrapIcon} alt='스크랩 상태 아이콘' className='w-5 h-5' />
        </button>
      </div>
      <div className='flex justify-between mt-3'>
        <h1 className='mt-4 text-base sm:text-[40px] md:text-[40px] lg:text-[30px] font-bold text-left '>
          {data.title}
        </h1>
        <span className='block text-dark-gray mt-4 font-bold text-[13px]'>[구인 | 구직]</span>
      </div>
      {user && user.nickname === data.nickname && (
        <div className='flex justify-end mt-5 gap-4 text-3 text-dark-gray'>
          <span className='cursor-pointer' onClick={handleEditClick}>
            수정
          </span>
          <span className='cursor-pointer' onClick={handleDeleteClick}>
            삭제
          </span>
        </div>
      )}
      <DetailPostLine />
      <dl className='grid grid-rows-3 grid-cols-2 gap-x-8 gap-y-5 my-5'>
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
          <dd>{data.closingDate ? new Date(data.closingDate).toLocaleDateString('ko-KR') : '-'}</dd>
        </div>
        <div className='grid grid-cols-[6rem_1fr] items-center gap-x-2'>
          <dt className='font-semibold text-dark-gray'>자사 웹사이트</dt>
          <dd>{data.websiteUrl}</dd>
        </div>
      </dl>

      <LastFormLine />
      <div className='flex gap-2 mb-4 ml-5 justify-end mr-3'>
        <MobileShare label='공유' icon={share} textColor='text-dark-gray' />
        <MobileShare label={data.viewCount} icon={viewPink} textColor='text-[#E36397]' />
      </div>
      <div className='block mt-4 mb-10 whitespace-pre-line'>{data.text}</div>
      <LastFormLine />
      <h2 className='font-bold text-xl mt-4 flex self-start'>관련 글</h2>
    </div>
  )
}

export default RecruitmentDetailPage
