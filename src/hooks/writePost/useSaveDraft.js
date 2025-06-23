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
        // formData 유효성 검사
        if (!formData || Object.keys(formData).length === 0) {
          throw new Error('폼 데이터가 없습니다.')
        }

        // 텍스트 필드 null 처리
        const sanitizedFormData = {
          ...formData,
          text: formData.text || '',
        }

        // 기존 드래프트 로드
        const storedDrafts = JSON.parse(localStorage.getItem('drafts') || '[]')
        const currentDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')

        // 새로운 드래프트 생성
        const newDraft = {
          id: crypto.randomUUID(), // 고유 ID 생성
          draftType,
          ...sanitizedFormData,
          date: currentDate,
        }

        // 최대 5개 제한
        let updatedDrafts = [...storedDrafts, newDraft]
        if (updatedDrafts.length > 10) {
          updatedDrafts = updatedDrafts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10)
          ToastService.info('최대 10개까지만 저장 가능합니다. 오래된 항목이 삭제되었습니다.')
        }

        // 로컬 스토리지에 저장
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts))
        console.log('Draft saved with ID:', newDraft.id)

        ToastService.success('게시글이 임시 저장되었습니다.')
        navigate(redirectPath)
        return newDraft.id
      } catch (error) {
        console.error('임시 저장 실패:', error)
        if (error.message === 'DRAFT_LIMIT_EXCEEDED') {
          ToastService.info('임시저장은 최대 10개까지 저장할 수 있습니다.')
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
