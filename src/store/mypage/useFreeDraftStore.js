import { create } from 'zustand'
import ToastService from '../../utils/toastService'

const useFreeDraftStore = create((set, get) => ({
  drafts: [],
  selectedFreeDraft: null,
  loadFreeDrafts: () => {
    try {
      const storedDrafts = JSON.parse(localStorage.getItem('drafts') || '[]')
      set({ drafts: storedDrafts })
      return Promise.resolve()
    } catch (error) {
      console.error('Failed to load drafts:', error)
      set({ drafts: [] })
      return Promise.reject(error)
    }
  },
  setSelectedFreeDraft: (draft) => set({ selectedFreeDraft: draft }),
  deleteFreeDraft: (draftId) => {
    const updatedDrafts = get().drafts.filter((draft) => draft.id !== draftId)
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts))
    set({ drafts: updatedDrafts })
    ToastService.success('임시 저장을 삭제했습니다.')
  },
  clearSelectedFreeDraft: () => set({ selectedFreeDraft: null }),
  getDraftEditorState: (draft) => draft.text || '',
}))

export default useFreeDraftStore
