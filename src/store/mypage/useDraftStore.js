import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid' // 고유 ID 생성
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import ToastService from '../../utils/toastService'

const useDraftStore = create((set) => ({
  drafts: [],
  selectedDraft: null,

  // 로컬 스토리지에서 임시저장 로드
  loadDrafts: () => {
    const savedDrafts = localStorage.getItem('communityPostDrafts')
    if (savedDrafts) {
      try {
        const drafts = JSON.parse(savedDrafts)
        set({ drafts })
      } catch (error) {
        console.error('임시 저장 데이터 로드 오류:', error)
      }
    }
  },

  // 임시저장 저장
  saveDraft: (draftData) => {
    const id = uuidv4()
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    const newDraft = {
      id,
      nickname: draftData.nickname || '',
      title: draftData.title || '',
      text: JSON.stringify(convertToRaw(draftData.text.getCurrentContent())), // JSON으로 저장
      date,
    }
    set((state) => {
      let updatedDrafts = [newDraft, ...state.drafts]
      if (updatedDrafts.length > 5) {
        updatedDrafts = updatedDrafts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5) 
        const oldestDraft = state.drafts[state.drafts.length - 1]
        ToastService.info(
          `임시저장 5개를 초과하여 가장 오래된 임시저장이 삭제되었습니다.\n
          삭제 임시저장: "${oldestDraft.title || '제목 없음'}"`,
        )
      }
      localStorage.setItem('communityPostDrafts', JSON.stringify(updatedDrafts))
      return { drafts: updatedDrafts }
    })
    return id
  },

  // 임시저장 삭제
  deleteDraft: (id) => {
    set((state) => {
      const updatedDrafts = state.drafts.filter((draft) => draft.id !== id)
      localStorage.setItem('communityPostDrafts', JSON.stringify(updatedDrafts))
      return { drafts: updatedDrafts }
    })
  },

  // 선택한 임시저장 설정
  setSelectedDraft: (draft) => {
    set({ selectedDraft: draft })
  },

  // 선택한 임시저장데이터터 초기화
  clearSelectedDraft: () => {
    set({ selectedDraft: null })
  },

  // 임시저장 데이터를 EditorState로 변환
  getDraftEditorState: (draft) => {
    if (draft?.text) {
      try {
        const rawContent = JSON.parse(draft.text)
        const contentState = convertFromRaw(rawContent) // convertFromRaw 사용
        return EditorState.createWithContent(contentState)
      } catch (error) {
        console.error('드래프트 복원 오류:', error)
        return EditorState.createEmpty()
      }
    }
    return EditorState.createEmpty()
  },
}))

export default useDraftStore
