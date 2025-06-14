import { create } from 'zustand'
import { getMyFreeBoardData, getMyJobBoardData } from '../../domains/my/services/useMyBoardServices'

const useMyBoardStore = create((set) => ({
  freeBoard: [],
  jobBoard: [],
  isFreeLoading: false,
  isJobLoading: false,
  freeError: null,
  jobError: null,

  fetchBoardData: async (boardType, fetchService, dataExtractor, force = false) => {
    const stateKey = boardType === 'free' ? 'freeBoard' : 'jobBoard'
    const loadingKey = boardType === 'free' ? 'isFreeLoading' : 'isJobLoading'
    const errorKey = boardType === 'free' ? 'freeError' : 'jobError'
    const boardName = boardType === 'free' ? '자유게시판' : '구인구직'

    if (force || useMyBoardStore.getState()[stateKey].length === 0) {
      set({ [loadingKey]: true, [errorKey]: null })

      try {
        const response = await fetchService()
        if (response.message === 'success') {
          set({ [stateKey]: dataExtractor(response.data) || [] })
        } else {
          set({
            [errorKey]: `${boardName} 리스트를 불러오지 못했습니다.`,
            [stateKey]: [],
          })
        }
      } catch (error) {
        console.error(`내가 작성한 ${boardName} 리스트 오류:`, error)
        set({
          [errorKey]: error.response?.data?.message || '서버 오류가 발생했습니다.',
          [stateKey]: [],
        })
      } finally {
        set({ [loadingKey]: false })
      }
    }
  },

  fetchFreeBoard: async (force = false) => {
    return useMyBoardStore
      .getState()
      .fetchBoardData('free', getMyFreeBoardData, (data) => data.myPostingsInBoardList, force)
  },

  fetchJobBoard: async (force = false) => {
    return useMyBoardStore
      .getState()
      .fetchBoardData('job', getMyJobBoardData, (data) => data.postings, force)
  },
}))

export default useMyBoardStore
