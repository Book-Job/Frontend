import { useNavigate } from 'react-router-dom'
import PageTitle from '../../Find/common/components/PageTitle'
import MyDraftsList from './components/MyDraftsList'
import useDraftStore from '../../../store/mypage/useFreeDraftStore'
import { useEffect } from 'react'
import ROUTER_PATHS from '../../../routes/RouterPath'
import useIsMobile from '../../../hooks/header/useIsMobile'

const MyDrafts = () => {
  const { drafts, loadDrafts, setSelectedDraft } = useDraftStore()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  useEffect(() => {
    loadDrafts()
  }, [loadDrafts])

  const handleDraftClick = (draft) => {
    setSelectedDraft(draft)
    navigate(ROUTER_PATHS.WRITE_COMMUNITY_POST)
  }
  return (
    <div>
      <div className='sm:mt-10'>{isMobile ? '' : <PageTitle title={'임시저장 글'} />}</div>
      <MyDraftsList draftsListData={drafts} onDraftClick={handleDraftClick} />
    </div>
  )
}

export default MyDrafts
