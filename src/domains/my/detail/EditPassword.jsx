import { useForm } from 'react-hook-form'
import PageTitle from '../../Find/common/components/PageTitle'
import PageBox from './../../Find/common/components/PageBox'
import ROUTER_PATHS from '../../../routes/RouterPath'
import { useNavigate } from 'react-router-dom'

const EditPassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const { emailId, passwordCheck, ...filteredData } = data // passwordCheck 필터링
    console.log('폼 데이터:', filteredData)
    navigate(ROUTER_PATHS.FIND_ID_COMPLETE_PAGE)
  }
//작업중 페이지
  const navigate = useNavigate()
  return (
    <div>
      <PageTitle title={'비밀번호 변경'} />
      <div className='flex justify-center'>
        <PageBox>
          
        </PageBox>
      </div>
    </div>
  )
}

export default EditPassword
