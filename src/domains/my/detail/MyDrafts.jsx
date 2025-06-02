import { useNavigate } from 'react-router-dom'
import PageTitle from '../../Find/common/components/PageTitle'
import MyDraftsList from './components/MyDraftsList'
import useDraftStore from '../../../store/mypage/useDraftStore'
import { useEffect } from 'react'
import ROUTER_PATHS from '../../../routes/RouterPath'

const MyDrafts = () => {
  const { drafts, loadDrafts, setSelectedDraft } = useDraftStore()
  const navigate = useNavigate()

  useEffect(() => {
    loadDrafts()
  }, [loadDrafts])

  const handleDraftClick = (draft) => {
    setSelectedDraft(draft)
    navigate(ROUTER_PATHS.WRITE_COMMUNITY_POST)
  }
  return (
    <div>
      <PageTitle title={'임시저장 글'} />
      <MyDraftsList draftsListData={drafts} onDraftClick={handleDraftClick} />
    </div>
  )
}

export default MyDrafts
