import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import ToastService from '../../utils/toastService'

const useSaveDraft = () => {
  const navigate = useNavigate()

  const handleSaveDraft = useCallback(
    async ({
      formData,
      saveDraft,
      draftType = 'community',
      redirectPath = ROUTER_PATHS.MY_DRAFTS,
    }) => {
      try {
        // formData가 비어있거나 유효하지 않은 경우 처리
        if (!formData || Object.keys(formData).length === 0) {
          throw new Error('폼 데이터가 없습니다.')
        }

        // 텍스트 필드가 null인 경우 빈 문자열로 처리
        const sanitizedFormData = {
          ...formData,
          text: formData.text || '',
        }

        // 임시 저장 호출
        const draftId = await saveDraft(sanitizedFormData, draftType)
        console.log('Draft saved with ID:', draftId) // 디버깅

        ToastService.success('게시글이 임시 저장되었습니다.')
        navigate(redirectPath)
        return draftId
      } catch (error) {
        console.error('임시 저장 실패:', error)
        if (error.message === 'DRAFT_LIMIT_EXCEEDED') {
          ToastService.info('임시저장은 최대 5개까지 저장할 수 있습니다.')
        } else {
          ToastService.error('임시 저장에 실패했습니다.')
        }
        return null
      }
    },
    [navigate],
  )

  return { handleSaveDraft }
}

export default useSaveDraft
