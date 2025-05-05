import FormItem from '../FormItem'
import JobFormLine from '../JobFormLine'
import useAuthStore from '../../../../../store/login/useAuthStore'

const PersonalInfo = ({ register }) => {
  const { user } = useAuthStore()

  return (
    <>
      <div className='my-[10px]'>
        <FormItem label='닉네임' dot={false} name='writer'>
          <div className='flex sm:w-[171px] md:text-[14px]'>{user?.sub ?? '닉네임 없음'}</div>
          <input type='hidden' value={user?.sub ?? ''} {...register('writer')} />
        </FormItem>
      </div>
      <JobFormLine />
    </>
  )
}

export default PersonalInfo
