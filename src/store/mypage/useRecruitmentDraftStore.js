import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import ToastService from '../../utils/toastService'

const useRecruitmentDraftStore = create((set) => ({
  drafts: [],
  selectedDraft: null,

  loadDrafts: () => {
    const savedDrafts = localStorage.getItem('recruitmentPostDrafts')
    if (savedDrafts) {
      try {
        const drafts = JSON.parse(savedDrafts)
        set({ drafts })
      } catch (error) {
        console.error('임시 저장 데이터 로드 오류:', error)
      }
    }
  },

  saveDraft: (draftData) => {
    const id = uuidv4()
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
      text: JSON.stringify(convertToRaw(draftData.text.getCurrentContent())),
      date,
    }
    set((state) => {
      let updatedDrafts = [newDraft, ...state.drafts]
      if (updatedDrafts.length > 5) {
        ToastService.info('임시저장은 최대 5개까지 저장할 수 있습니다.')
        throw new Error('임시저장은 최대 5개까지 저장할 수 있습니다.')
      }
      localStorage.setItem('communityPostDrafts', JSON.stringify(updatedDrafts))
      return { drafts: updatedDrafts }
    })
    return id
  },

  deleteDraft: (id) => {
    set((state) => {
      const updatedDrafts = state.drafts.filter((draft) => draft.id !== id)
      localStorage.setItem('communityPostDrafts', JSON.stringify(updatedDrafts))
      return { drafts: updatedDrafts }
    })
  },

  setSelectedDraft: (draft) => {
    set({ selectedDraft: draft })
  },

  clearSelectedDraft: () => {
    set({ selectedDraft: null })
  },

  getDraftEditorState: (draft) => {
    if (draft?.text) {
      try {
        const rawContent = JSON.parse(draft.text)
        const contentState = convertFromRaw(rawContent)
        return EditorState.createWithContent(contentState)
      } catch (error) {
        console.error('드래프트 복원 오류:', error)
        return EditorState.createEmpty()
      }
    }
    return EditorState.createEmpty()
  },
}))


export default useRecruitmentDraftStore;