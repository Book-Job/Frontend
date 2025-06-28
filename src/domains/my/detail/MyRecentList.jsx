import { useNavigate } from 'react-router-dom'
import useIsMobile from '../../../hooks/header/useIsMobile'
import PageTitle from '../../Find/common/components/PageTitle'

const MyRecentList = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  return (
    <div>
      <div className='sm:mt-10'>{isMobile ? null : <PageTitle title={'최근본 목록'} />}</div>
      최근본 목록
      
    </div>
  )
}

export default MyRecentList
