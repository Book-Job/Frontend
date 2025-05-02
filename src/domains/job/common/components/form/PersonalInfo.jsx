import FormItem from '../FormItem'
import JobFormLine from '../JobFormLine'
import useAuthStore from '../../../../../store/login/useAuthStore'

const PersonalInfo = ({ register }) => {
  const { user } = useAuthStore()

  //현재 nickname이 콘솔에 안 찍힘,, 아이디만 찍히고 있어서 일단 아이디로 처리
  return (
    <>
      <div className='my-[10px]'>
        <FormItem label='닉네임' dot={false} name='writer'>
          <div className='flex sm:w-[171px] md:text-[14px]'>{user?.sub ?? '닉네임 없음'}</div>
        </FormItem>
      </div>
      <JobFormLine />
    </>
  )
}

export default PersonalInfo
