import WriteFormLine from '../../../../../components/web/WriteFormLine'
import WriteJobSearchPostingForm from '../../components/WriteJobSearchPostingForm'
import LastFormLine from '../../../common/components/LastFormLine'
import Button from '../../../../../components/web/Button'
import PinkButton from '../../../../../components/web/PinkButton'
import { createJobSeekPost } from '../../../common/service/postService'
import { usePostSubmit } from '../../../common/hook/usePostSubmit'

const WriteJobSearchPostPage = () => {
  const handleSubmitForm = usePostSubmit(createJobSeekPost)
  return (
    <>
      <div className='flex flex-col gap-4 max-w-[1440px] w-full px-4 sm:px-10 lg:px-[250px] mx-auto'>
        <h1 className='hidden sm:block text-3xl font-bold self-start mt-[50px]'>구직 글 등록</h1>
        <div className='text-[14px] sm:text-base font-bold text-red-500 self-end'>
          닉네임과 이메일은 회원가입 시 입력한 정보로 자동 설정됩니다.
        </div>
        <WriteFormLine />
        <WriteJobSearchPostingForm onSubmit={handleSubmitForm} />
        <LastFormLine />
        <div className='flex justify-end mb-[131px]'>
          <Button size='small' label='임시저장' className='mr-[14px]' />
          <PinkButton label='저장' type='submit' form='job-search-post-form' />
        </div>
      </div>
    </>
  )
}
export default WriteJobSearchPostPage
