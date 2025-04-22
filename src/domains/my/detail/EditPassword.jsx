import { useForm } from 'react-hook-form'
import PageTitle from '../../Find/common/components/PageTitle'
import PageBox from './../../Find/common/components/PageBox'
import ROUTER_PATHS from '../../../routes/RouterPath'
import { useNavigate } from 'react-router-dom'
import LabelWithInput from '../../../components/web/LabelWithInput'
import Button from '../../../components/web/Button'

const EditPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    // const { emailId, passwordCheck, ...filteredData } = data // passwordCheck 필터링
    console.log('사용중인 비밀번호:', data)
    navigate(ROUTER_PATHS.FIND_PW_CHANGE_PW)
  }
//작업중 페이지
  const navigate = useNavigate()
  return (
    <div>
      <PageTitle title={'비밀번호 변경'} />
      <div className='flex justify-center'>
        <PageBox>
        <div className='flex justify-start text-3xl font-bold'>비밀번호 입력</div>
            <div className='flex-auto mt-8'>
              <LabelWithInput
                label='비밀번호'
                type='text'
                placeholder='현재 비밀번호를 입력해주세요'
                size='biggest'
                {...register('userPW', { required: '현재 사용중인 비밀번호와 일치하지않습니다' })}
              />
            </div>
            <div className='flex items-start'>
              {errors.userPW && <p className='text-red-500 text-[14px]'>{errors.userPW.message}</p>}
            </div>
            <div className='flex items-end mt-6'>
              <Button
                size='biggest'
                label='다음'
                bgColor='light-gray'
                onClick={handleSubmit(onSubmit)}
              />
            </div>
            {/* <div>
              <FindLink
                title={'가입한 아이디를 잊어버렸어요!'}
                onClick={() => navigate(ROUTER_PATHS.FIND_ID)}
                linkName={'아이디 찾기'}
              />
            </div> */}
        </PageBox>
      </div>
    </div>
  )
}

export default EditPassword
