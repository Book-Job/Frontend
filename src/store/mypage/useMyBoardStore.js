import { create } from 'zustand'
import { getMyFreeBoardData, getMyJobBoardData } from '../../domains/my/services/useMyBoardServices'

const useMyBoardStore = create((set, get) => ({
  freeBoard: [],
  jobBoard: [],
  isFreeLoading: false,
  isJobLoading: false,
  freeError: null,
  jobError: null,
  freePage: 0,
  jobPage: 0,
  hasMoreFree: true,
  hasMoreJob: true,

  fetchBoardData: async (boardType, fetchService, dataExtractor, page = 0, limit = 10) => {
    const stateKey = boardType === 'free' ? 'freeBoard' : 'jobBoard'
    const loadingKey = boardType === 'free' ? 'isFreeLoading' : 'isJobLoading'
    const errorKey = boardType === 'free' ? 'freeError' : 'jobError'
    const pageKey = boardType === 'free' ? 'freePage' : 'jobPage'
    const hasMoreKey = boardType === 'free' ? 'hasMoreFree' : 'hasMoreJob'
    const boardName = boardType === 'free' ? '자유게시판' : '구인구직'

    set({ [loadingKey]: true, [errorKey]: null })

    try {
      const response = await fetchService(page, limit)
      if (response.message === 'success') {
        const newData = dataExtractor(response.data) || []
        set((state) => ({
          [stateKey]: page === 0 ? newData : [...state[stateKey], ...newData],
          [pageKey]: page,
          [hasMoreKey]: response.data.hasNext,
        }))
        return response
      } else {
        set({
          [errorKey]: `${boardName} 리스트를 불러오지 못했습니다.`,
          [hasMoreKey]: false,
        })
        return { message: 'error', data: { hasNext: false } }
      }
    } catch (error) {
      console.error(`내가 작성한 ${boardName} 리스트 오류:`, error)
      set({
        [errorKey]: error.message || '서버 오류가 발생했습니다.',
        [hasMoreKey]: false,
      })
      return { message: 'error', data: { hasNext: false } }
    } finally {
      set({ [loadingKey]: false })
    }
  },

  fetchFreeBoard: async (page = 0, limit = 10) => {
    return get().fetchBoardData(
      'free',
      getMyFreeBoardData,
      (data) => data.myPostingsInBoardList,
      page,
      limit,
    )
  },

  fetchJobBoard: async (page = 0, limit = 10) => {
    return get().fetchBoardData('job', getMyJobBoardData, (data) => data.postings, page, limit)
  },

  resetBoard: (boardType) => {
    const stateKey = boardType === 'free' ? 'freeBoard' : 'jobBoard'
    const pageKey = boardType === 'free' ? 'freePage' : 'jobPage'
    const hasMoreKey = boardType === 'free' ? 'hasMoreFree' : 'hasMoreJob'
    set({ [stateKey]: [], [pageKey]: 0, [hasMoreKey]: true })
  },
}))

export default useMyBoardStore
