import FormItem from '../FormItem'
import JobFormLine from '../JobFormLine'
import useAuthStore from '../../../../../store/login/useAuthStore'

const PersonalInfo = ({ register }) => {
  const { user } = useAuthStore()

  return (
    <>
      <FormItem label='닉네임' dot={false} name='writer'>
        <div className='text-left w-full font-medium block my-4 ml-4 md:ml-0'>
          {user?.nickname ?? '닉네임 없음'}
        </div>
        <input type='hidden' {...register('writer')} value={user?.nickname ?? ''} />
      </FormItem>

      <JobFormLine />
    </>
  )
}

export default PersonalInfo
