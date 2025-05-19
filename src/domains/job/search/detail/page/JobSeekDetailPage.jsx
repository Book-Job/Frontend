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
const JobSeekDetailPage = () => {
  const { user } = useAuthStore()
  const { id } = useParams()
  const { data, loading, error } = useJobSeekPostDetail(id)
  const { scraps, toggleScrap, loading: scrapLoading } = useScrapStore()
  const isScrapped = Boolean(scraps[id])
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
      alert('성공적으로 삭제되었습니다.')
      navigate(ROUTER_PATHS.JOB_MAIN, { state: { refresh: true } })
    } catch (error) {
      alert('삭제 중 오류 발생')
      console.error(error)
    }
  }

  const handleScrapClick = async () => {
    try {
      await toggleScrap(id, 'JOB_SEEKING')
    } catch (error) {
      console.error('스크랩 처리 중 오류:', error)
      alert('스크랩 처리 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className='px-4 md:px-12 lg:px-[100px] xl:px-[250px]'>
      <div className='flex items-center gap-2 justify-between'>
        <strong className='text-lg'>{data.nickname}</strong>
        <button aria-label='스크랩' onClick={handleScrapClick} disabled={scrapLoading}>
          <img
            src={isScrapped ? ScrapIcon : unScrapIcon}
            alt='스크랩 상태 아이콘'
            className='w-5 h-5'
          />
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
      <dl className='grid gap-y-4 my-5'>
        {[
          ['근무형태', getEmploymentTypeLabel(data.employmentType)],
          ['직군', getJobCategoryLabel(data.jobCategory)],
          ['경력', data.experience],
          ['연락가능한 이메일', data.contactEmail],
        ].map(([label, value]) => (
          <div key={label} className='grid grid-cols-[10rem_1fr] gap-x-4 items-start'>
            <dt className='font-semibold text-dark-gray text-left'>{label}</dt>
            <dd className='text-left'>{value}</dd>
          </div>
        ))}
      </dl>
      <LastFormLine />
      <div className='flex gap-2 mb-4 ml-5 justify-end mr-3'>
        <MobileShare label='공유' icon={share} textColor='text-dark-gray' />
        <MobileShare label={data.viewCount} icon={viewPink} textColor='text-[#E36397]' />
      </div>
      <div className='block  mt-4 mb-10 whitespace-pre-line'>{data.text}</div>
      <LastFormLine />
      <h2 className='font-bold text-xl mt-7 flex self-start'>관련 글</h2>
      <RelatedJobSearchPosts currentId={id} />
    </div>
  )
}

export default JobSeekDetailPage
