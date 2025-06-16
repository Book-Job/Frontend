import { useNavigate } from 'react-router-dom'
import PageTitle from '../../Find/common/components/PageTitle'
import MyDraftsList from './components/MyDraftsList'
import { useEffect, useState } from 'react'
import ROUTER_PATHS from '../../../routes/RouterPath'
import useIsMobile from '../../../hooks/header/useIsMobile'
import ToastService from '../../../utils/toastService'
import useFreeDraftStore from './../../../store/mypage/useFreeDraftStore';

const MyDrafts = () => {
  const { drafts, loadFreeDrafts, setSelectedFreeDraft } = useFreeDraftStore()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDrafts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await loadFreeDrafts()
      } catch (error) {
        setError('임시 저장 글을 불러오지 못했습니다.')
        ToastService.error('임시 저장 글을 불러오지 못했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchDrafts()
  }, [loadFreeDrafts])

  const handleDraftClick = (draft) => {
    setSelectedFreeDraft(draft)
    navigate(ROUTER_PATHS.WRITE_COMMUNITY_POST)
  }

  return (
    <div>
      <div className='sm:mt-10'>{isMobile ? null : <PageTitle title={'임시저장 글'} />}</div>
      {isLoading ? (
        <p className='py-10 text-center text-gray-500'>로딩 중...</p>
      ) : error ? (
        <p className='py-10 text-center text-red-500'>{error}</p>
      ) : (
        <MyDraftsList draftsListData={drafts} onDraftClick={handleDraftClick} />
      )}
    </div>
  )
}

export default MyDrafts
