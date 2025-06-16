import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid' // 추가
import ToastService from '../../utils/toastService'

const useFreeDraftStore = create((set) => ({
  drafts: [],
  selectedFreeDraft: null,

  loadFreeDrafts: () => {
    const savedDrafts = localStorage.getItem('communityPostDrafts')
    if (savedDrafts) {
      try {
        const drafts = JSON.parse(savedDrafts)
        set({ drafts })
      } catch (error) {
        console.error('임시 저장 데이터 로드 오류:', error)
        ToastService.error('임시 저장 데이터를 불러오지 못했습니다.')
      }
    }
  },

  saveFreeDraft: (draftData) => {
    const id = uuidv4() // 고유 ID 생성
    const date = new Date()
      .toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('. ')
      .join('-')
      .slice(0, -1)
    const newDraft = {
      id,
      nickname: draftData.nickname || '',
      title: draftData.title || '',
      text: draftData.text || '',
      date,
    }
    set((state) => {
      let updatedDrafts = [newDraft, ...state.drafts]
      if (updatedDrafts.length > 5) {
        ToastService.info('임시저장은 최대 5개까지 저장할 수 있습니다.')
        return state
      }
      localStorage.setItem('communityPostDrafts', JSON.stringify(updatedDrafts))
      return { drafts: updatedDrafts }
    })
    return id
  },

  deleteFreeDraft: (id) => {
    set((state) => {
      const updatedDrafts = state.drafts.filter((draft) => draft.id !== id)
      localStorage.setItem('communityPostDrafts', JSON.stringify(updatedDrafts))
      return { drafts: updatedDrafts }
    })
  },

  setSelectedFreeDraft: (draft) => {
    set({ selectedFreeDraft: draft })
  },

  clearSelectedFreeDraft: () => {
    set({ selectedFreeDraft: null })
  },

  getFreeDraftEditorState: (draft) => {
    return draft?.text || ''
  },
}))

export default useFreeDraftStore
