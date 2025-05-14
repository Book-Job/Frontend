import { create } from 'zustand'
import { getMyFreeBoardData, getMyJobBoardData } from '../../domains/my/services/useMyBoardServices'

const useMyBoardStore = create((set) => ({
  freeBoard: [],
  jobBoard: [],
  isFreeLoading: false,
  isJobLoading: false,
  freeError: null,
  jobError: null,

  fetchFreeBoard: async () => {
    if (useMyBoardStore.getState().freeBoard.length > 0) return

    set({ isFreeLoading: true, freeError: null })
    try {
      const response = await getMyFreeBoardData()
      if (response.message === 'success') {
        console.log('내가 작성한 자유 리스트 성공:', response.data)
        set({ freeBoard: response.data.myPostingsInBoardList || [] })
      } else {
        console.log('내가 작성한 자유 리스트 오류:', response.message)
        set({ freeError: '자유게시판 베스트 리스트를 불러오지 못했습니다.' })
        set({ freeBoard: [] })
      }
    } catch (error) {
      console.error('내가 작성한 자유 리스트 오류:', error)
      set({ freeError: '서버 오류가 발생했습니다.' })
      set({ freeBoard: [] })
    } finally {
      set({ isFreeLoading: false })
    }
  },

  fetchJobBoard: async () => {
    // 이미 데이터가 있으면 호출 생략
    if (useMyBoardStore.getState().jobBoard.length > 0) return

    set({ isJobLoading: true, jobError: null })
    try {
      const response = await getMyJobBoardData()
      if (response.message === 'success') {
        console.log('내가 작성한 구인구직 리스트 성공:', response.data)
        set({ jobBoard: response.data.postings || [] })
      } else {
        console.log('내가 작성한 구인구직 리스트 오류:', response)
        set({ jobError: '구인구직 베스트 리스트를 불러오지 못했습니다.' })
        set({ jobBoard: [] })
      }
    } catch (error) {
      console.error('내가 작성한 구인구직 리스트 오류:', error)
      set({ jobError: '서버 오류가 발생했습니다.' })
      set({ jobBoard: [] })
    } finally {
      set({ isJobLoading: false })
    }
  },
}))

export default useMyBoardStore