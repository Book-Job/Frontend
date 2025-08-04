import { useNavigate } from 'react-router-dom'
import Button from '../../../../components/web/Button'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import PageTitle from '../../../Find/common/components/PageTitle'
import useIsMobile from '../../../../hooks/header/useIsMobile'

const JoinButton = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  return (
    <div className=''>
      <div className='mb-12 sm:mb-20'>
        {isMobile ? (
          <PageTitle subTitle={'아직 bookjob 회원이 아니신가요?'} />
        ) : (
          <PageTitle title={'회원가입'} subTitle={'아직 bookjob 회원이 아니신가요?'} />
        )}
      </div>
      <Button
        size='big'
        label='회원가입'
        className='bg-main-pink hover:bg-dark-pink'
        onClick={() => navigate(ROUTER_PATHS.MEMBER_DATA_ENTRY)}
      />
    </div>
  )
}

export default JoinButton
