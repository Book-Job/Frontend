//구직글 작성
import WriteFormLine from '../common/components/WriteFormLine'
import WriteJobSearchPostingForm from './components/WriteJobSearchPostingForm'
import GetEmailAndNickName from '../common/components/GetEmailAndNickName'
import LastFormLine from '../common/components/LastFormLine'
import Button from '../../../components/web/Button'
import PinkButton from '../../../components/web/PinkButton'

const WriteJobSearchPosting = () => {
  return (
    <>
      <div className='flex flex-col gap-4 mx-[250px]'>
        <h1 className='text-[28px] font-bold self-start mt-[50px]'>구직 글 등록</h1>
        <div className='text-[15px] font-bold text-red-500 self-end'>
          닉네임과 이메일은 회원가입 시 입력한 정보로 자동 설정됩니다.
        </div>
        <WriteFormLine />
        <GetEmailAndNickName />
        <WriteJobSearchPostingForm />
        <LastFormLine />
        <div className='flex justify-end mb-[131px]'>
          <Button size='small' label='임시저장' className='mr-[14px]' />
          <PinkButton label='저장' />
        </div>
      </div>
    </>
  )
}
export default WriteJobSearchPosting
