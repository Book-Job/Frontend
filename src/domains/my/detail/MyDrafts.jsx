import { useNavigate } from 'react-router-dom'
import PageTitle from '../../Find/common/components/PageTitle'
import MyDraftsList from './components/MyDraftsList'
import { useEffect, useState } from 'react'
import ROUTER_PATHS from '../../../routes/RouterPath'
import useIsMobile from '../../../hooks/header/useIsMobile'
import ToastService from '../../../utils/toastService'
import useFreeDraftStore from './../../../store/mypage/useFreeDraftStore'

const MyDrafts = () => {
  const { drafts, loadFreeDrafts, setSelectedFreeDraft } = useFreeDraftStore()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  useEffect(() => {
    const fetchDrafts = () => {
      loadFreeDrafts()
    }
    fetchDrafts()
  }, [loadFreeDrafts])

  const handleDraftClick = (draft) => {
    setSelectedFreeDraft(draft)
    if (draft.draftType === 'community') {
      navigate(ROUTER_PATHS.WRITE_COMMUNITY_POST)
    } else if (draft.draftType === 'jobPostings') {
      navigate(ROUTER_PATHS.WRITE_RECRUITMENT_POST)
    } else {
      navigate(ROUTER_PATHS.WRITE_JOB_SEARCH_POST)
    }
  }

  return (
    <div>
      <div className='sm:mt-10'>{isMobile ? null : <PageTitle title={'임시저장 글'} />}</div>
      <MyDraftsList draftsListData={drafts} onDraftClick={handleDraftClick} />
    </div>
  )
}

export default MyDrafts
