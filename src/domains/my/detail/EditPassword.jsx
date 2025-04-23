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
    const currentPassword = data.userPW
    // 예시: 실제 비밀번호 (이건 나중에 백엔드에서 받아오거나 비교해야 함)
    const realPassword = '1234' // 임시로 정해둔 비밀번호

    if (currentPassword !== realPassword) {
      console.log('비밀번호 불일치:', data)
      navigate(ROUTER_PATHS.MY_PW_MIS)
    } else {
      console.log('비밀번호 일치:', data)
      navigate(ROUTER_PATHS.FIND_PW_CHANGE_PW)
    }
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
        </PageBox>
      </div>
    </div>
  )
}

export default EditPassword
