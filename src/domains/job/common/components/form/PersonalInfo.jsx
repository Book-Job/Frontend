import FormItem from '../FormItem'
import JobFormLine from '../JobFormLine'
import useAuthStore from '../../../../../store/login/useAuthStore'

const PersonalInfo = ({ register }) => {
  const { user } = useAuthStore()

  return (
    <>
      <FormItem label='닉네임' dot={false} name='writer'>
        <div className='text-left text-4 w-full font-medium text-gray-800 block my-4'>
          {user?.nickname ?? '닉네임 없음'}
        </div>
        <input type='hidden' {...register('writer')} value={user?.nickname ?? ''} />
      </FormItem>

      <JobFormLine />
    </>
  )
}

export default PersonalInfo
