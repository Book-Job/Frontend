import { create } from 'zustand'
import ToastService from '../../services/toast/ToastService'

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
    ToastService.success('임시 저장글이 삭제되었어요.')
  },
  clearSelectedFreeDraft: () => set({ selectedFreeDraft: null }),
  getDraftEditorState: (draft) => draft.text || '',
  updateFreeDraft: (draftId, updatedData) => {
    const updatedDrafts = get().drafts.map((draft) =>
      draft.id === draftId ? { ...draft, ...updatedData } : draft,
    )
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts))
    set({
      drafts: updatedDrafts,
      selectedFreeDraft: { ...get().selectedFreeDraft, ...updatedData },
    })
    ToastService.success('임시 저장글이 수정되었어요.')
  },
}))

export default useFreeDraftStore
