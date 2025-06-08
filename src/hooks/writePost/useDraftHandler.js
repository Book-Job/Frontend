import { useNavigate } from 'react-router-dom'
import useDraftStore from '../../store/mypage/useFreeDraftStore'
import ToastService from '../../utils/toastService'
import ROUTER_PATHS from '../../routes/RouterPath'


const useDraftHandler = () => {
  const { saveDraft } = useDraftStore()
  const navigate = useNavigate()

  const handleSaveDraft = (formData, onSaveDraft, draftType = 'community') => {
    try {
      const safeFormData = {
        ...formData,
        text:
          formData.text && typeof formData.text.getCurrentContent === 'function'
            ? formData.text
            : null,
      }
      const draftId = saveDraft(safeFormData, draftType)
      ToastService.success('게시글이 임시 저장되었습니다.')
      onSaveDraft(draftId)
      navigate(ROUTER_PATHS.MY_DRAFTS)
    } catch (error) {
      if (error.message === 'DRAFT_LIMIT_EXCEEDED') {
        ToastService.info('h임시저장은 최대 5개까지 저장할 수 있습니다.')
      } else {
        console.error('임시 저장 실패:', error)
      }
    }
  }

  return { handleSaveDraft }
}

export default useDraftHandler
