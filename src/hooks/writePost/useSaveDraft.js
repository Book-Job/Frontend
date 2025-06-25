import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import ToastService from '../../utils/toastService'

const useSaveDraft = () => {
  const navigate = useNavigate()

  const handleSaveDraft = useCallback(
    async ({ formData, draftType = 'community', redirectPath = ROUTER_PATHS.MY_DRAFTS }) => {
      try {
        if (!formData || Object.keys(formData).length === 0) {
          throw new Error('폼 데이터가 없습니다.')
        }

        const sanitizedFormData = {
          ...formData,
          text: formData.text || '',
        }

        const storedDrafts = JSON.parse(localStorage.getItem('drafts') || '[]')
        const currentDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')

        const newDraft = {
          id: crypto.randomUUID(),
          draftType,
          ...sanitizedFormData,
          date: currentDate,
        }

        let updatedDrafts = [...storedDrafts, newDraft]
        if (updatedDrafts.length > 10) {
          updatedDrafts = updatedDrafts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10)
          ToastService.info('최대 10개까지만 저장 가능합니다. 오래된 항목이 삭제되었습니다.')
        }
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts))
        ToastService.success('게시글이 임시 저장되었습니다.')
        navigate(redirectPath)
        return newDraft.id
      } catch (error) {
        console.error('임시 저장 실패:', error)
        ToastService.error('임시 저장에 실패했습니다.')
        return null
      }
    },
    [navigate],
  )

  return { handleSaveDraft }
}

export default useSaveDraft
