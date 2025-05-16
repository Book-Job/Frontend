import { useParams, useNavigate } from 'react-router-dom'
import useRecruitmentPostDetail from '../../detail/hook/useRecruitmentPostDetail'
import { editRecruitmentPost } from '../../../service/postService'
import ROUTER_PATHS from '../../../../../routes/RouterPath'
import WriteRecruitmentPostingForm from '../../components/WriteRecruitmentPostingForm'
import WriteFormLine from '../../../../../components/web/WriteFormLine'
import LastFormLine from '../../../common/components/LastFormLine'
import Spinner from '../../../../../components/web/Spinner'
const EditRecruitmentPostPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = useRecruitmentPostDetail(id)

  const handleEdit = async (formData) => {
    try {
      await editRecruitmentPost(id, formData)
      alert('수정이 완료되었습니다.')
      navigate(ROUTER_PATHS.RECRUITMENT_POST_DETAIL.replace(':id', id))
    } catch (error) {
      alert('수정 중 오류 발생')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }
  if (error) return <div>존재하지 않는 게시글입니다.</div>

  return (
    <div className='flex flex-col gap-4 max-w-[1440px] w-full px-4 sm:px-10 lg:px-[250px] mx-auto'>
      <h1 className='hidden sm:block text-3xl font-bold self-start mt-[50px] mb-8'>구인 글 수정</h1>
      <WriteFormLine />
      <WriteRecruitmentPostingForm defaultValues={data} onSubmit={handleEdit} />
      <LastFormLine />
      <div className='flex justify-end mb-10'>
        <button
          className='text-[15px] text-main-pink font-semibold px-3 py-1 rounded-[5px] hover:bg-main-pink/10 transition'
          form='recruitment-post-form'
        >
          저장
        </button>
      </div>
    </div>
  )
}
export default EditRecruitmentPostPage
