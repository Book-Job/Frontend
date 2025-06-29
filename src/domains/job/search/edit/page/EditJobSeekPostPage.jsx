import { useNavigate, useParams } from 'react-router-dom'
import useJobSeekPostDetail from '../../detail/hook/useJobSeekPostDetail'
import { editJobSeekPost } from '../../../common/service/postService'
import WriteJobSearchPostingForm from '../../components/WriteJobSearchPostingForm'
import ROUTER_PATHS from '../../../../../routes/RouterPath'
import Spinner from '../../../../../components/web/Spinner'
import LastFormLine from '../../../common/components/LastFormLine'
import WriteFormLine from '../../../../../components/web/WriteFormLine'
import ToastService from '../../../../../services/toast/ToastService'
const EditJobSeekPostPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = useJobSeekPostDetail(id)

  const handleEdit = async (formData) => {
    try {
      await editJobSeekPost(id, formData)
      ToastService.success('수정이 완료되었습니다.')
      navigate(ROUTER_PATHS.JOB_SEARCH_POST_DETAIL.replace(':id', id))
    } catch (error) {
      console.error(error)
      ToastService.error('수정 중 오류가 발생했습니다.')
    }
  }
  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }
  if (error) return <p className='text-center text-red-500'>존재하지 않는 게시글입니다.</p>

  const defaultValues = {
    ...data,
    text: data.text ?? '',
  }

  return (
    <div className='flex flex-col gap-4 max-w-[1440px] w-full px-4 sm:px-10 lg:px-[250px] mx-auto'>
      <h1 className='hidden sm:block text-3xl font-bold self-start mt-[50px] mb-8'>구직 글 수정</h1>
      <WriteFormLine />
      <WriteJobSearchPostingForm defaultValues={defaultValues} onSubmit={handleEdit} />
      <LastFormLine />
      <div className='flex justify-end mb-10'>
        <button
          className='text-[15px] text-main-pink font-semibold px-3 py-1 rounded-[5px] hover:bg-main-pink/10 transition'
          form='job-search-post-form'
        >
          저장
        </button>
      </div>
    </div>
  )
}

export default EditJobSeekPostPage
