import { useNavigate } from 'react-router-dom'
import Button from '../../../components/web/Button'
import PinkButton from '../../../components/web/PinkButton'
import PageBox from '../../Find/common/components/PageBox'
import PageTitle from '../../Find/common/components/PageTitle'
import ROUTER_PATHS from '../../../routes/RouterPath'

const PasswordMis = () => {
  const navigate = useNavigate()
  return (
    <div>
      <PageTitle title={'비밀번호 변경'} />
      <div className='flex justify-center'>
        <PageBox>
          <div className='flex justify-start text-2xl font-bold'>비밀번호 불일치</div>
          <div className='flex justify-start text-[28px] font-medium mt-[40px] mb-[60px]'>
            비밀번호가 일치하지 않습니다.😢
          </div>
          <div className='flex gap-3 '>
            <PinkButton label={'비밀번호 찾기'} onClick={() => navigate(ROUTER_PATHS.FIND_PW)} />
            <Button
              label={'마이페이지'}
              size='medium'
              onClick={() => navigate(ROUTER_PATHS.MY_PAGE)}
            />
          </div>
        </PageBox>
      </div>
    </div>
  )
}

export default PasswordMis
