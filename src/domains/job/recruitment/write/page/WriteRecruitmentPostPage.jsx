import WriteFormLine from '../../../../../components/web/WriteFormLine'
import LastFormLine from '../../../common/components/LastFormLine'
import Button from '../../../../../components/web/Button'
import PinkButton from '../../../../../components/web/PinkButton'
import WriteRecruitmentPostingForm from '../../components/WriteRecruitmentPostingForm'
import useAuthStore from '../../../../../store/login/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { createRecruitmentPost } from '../../../../job/service/postService'
import { useEffect } from 'react'
import ROUTER_PATHS from '../../../../../routes/RouterPath'
const WriteRecruitmentPostPage = () => {
  const navigate = useNavigate()
  const { requireLogin } = useAuthStore()

  useEffect(() => {
    requireLogin(navigate)
  }, [requireLogin, navigate])

  const handleSubmitForm = async (formData) => {
    try {
      await createRecruitmentPost(formData)
      alert('등록이 완료되었습니다!')
      navigate(ROUTER_PATHS.JOB_MAIN)
    } catch (error) {
      alert('등록 중 오류가 발생했습니다.')
      console.error(error)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4 max-w-[1440px] w-full px-4 sm:px-10 lg:px-[250px] mx-auto'>
        <h1 className='hidden sm:block text-3xl font-bold self-start mt-[50px]'>구인 글 등록</h1>
        <div className='text-[14px] sm:text-base font-bold text-red-500 self-end'>
          닉네임과 이메일은 회원가입 시 입력한 정보로 자동 설정됩니다.
        </div>
        <WriteFormLine />
        <WriteRecruitmentPostingForm onSubmit={handleSubmitForm} />
        <LastFormLine />
        <div className='flex justify-end mb-[131px]'>
          <Button size='small' label='임시저장' className='mr-[14px]' />
          <PinkButton label='저장' type='submit' form='recruitment-post-form' />
        </div>
      </div>
    </>
  )
}

export default WriteRecruitmentPostPage
