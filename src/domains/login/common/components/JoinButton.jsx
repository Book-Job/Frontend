import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/web/Button'
import ROUTER_PATHS from '../../../../routes/RouterPath';

const JoinButton = () => {

  const navigate = useNavigate();
  
  return (
    <div className='mb-16'>
      <h1 className='mb-10 text-[38px] font-bold'>회원가입 </h1>
      <div className='mb-24 text-2xl font-medium text-gray-8e8e8e'>아직 bookjob 회원이 아니신가요?</div>
      <Button size='big' label='회원가입' bgColor='#E36397' onClick={() => navigate(ROUTER_PATHS.MEMBER_DATA_ENTRY)}/>
    </div>
  )
}

export default JoinButton
