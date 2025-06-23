import FormItem from '../FormItem'
import JobFormLine from '../JobFormLine'
import useAuthStore from '../../../../../store/login/useAuthStore'
import JobInputBox from '../../../../../components/web/JobInputBox'
import useIsMobile from '../../../../../hooks/header/useIsMobile'
const PersonalInfo = ({ register }) => {
  const { user } = useAuthStore()
  const isMobile = useIsMobile()
  return (
    <>
      <FormItem label='닉네임' dot={true} name='writer'>
        <JobInputBox
          {...register('writer')}
          value={user?.nickname ?? ''}
          readOnly
          className='w-full bg-gray-100 cursor-not-allowed'
        />
      </FormItem>
      {!isMobile && <JobFormLine />}
    </>
  )
}

export default PersonalInfo
