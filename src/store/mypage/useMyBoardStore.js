import { create } from 'zustand'
import { getMyFreeBoardData, getMyJobBoardData } from '../../domains/my/services/useMyBoardServices'

const useMyBoardStore = create((set) => ({
  // 일반화된 데이터 페칭 함수
  fetchBoardData: async (boardType, fetchService, dataExtractor) => {
    const stateKey = boardType === 'free' ? 'freeBoard' : 'jobBoard'
    const loadingKey = boardType === 'free' ? 'isFreeLoading' : 'isJobLoading'
    const errorKey = boardType === 'free' ? 'freeError' : 'jobError'
    const boardName = boardType === 'free' ? '자유게시판' : '구인구직'

    // 이미 데이터가 있으면 호출 생략
    if (useMyBoardStore.getState()[stateKey].length > 0) return

    const updateState = {}
    updateState[loadingKey] = true
    updateState[errorKey] = null
    set(updateState)

    try {
      const response = await fetchService()
      if (response.message === 'success') {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`내가 작성한 ${boardName} 리스트 성공:`, response.data)
        }

        const updateData = {}
        updateData[stateKey] = dataExtractor(response.data) || []
        set(updateData)
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`내가 작성한 ${boardName} 리스트 오류:`, response)
        }

        const updateError = {}
        updateError[errorKey] = `${boardName} 베스트 리스트를 불러오지 못했습니다.`
        set(updateError)

        const updateData = {}
        updateData[stateKey] = []
        set(updateData)
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`내가 작성한 ${boardName} 리스트 오류:`, error)
      }

      const updateError = {}
      updateError[errorKey] = '서버 오류가 발생했습니다.'
      set(updateError)

      const updateData = {}
      updateData[stateKey] = []
      set(updateData)
    } finally {
      const updateLoading = {}
      updateLoading[loadingKey] = false
      set(updateLoading)
    }
  },

  fetchFreeBoard: async () => {
    return useMyBoardStore
      .getState()
      .fetchBoardData('free', getMyFreeBoardData, (data) => data.myPostingsInBoardList)
  },

  fetchJobBoard: async () => {
    return useMyBoardStore
      .getState()
      .fetchBoardData('job', getMyJobBoardData, (data) => data.postings)
  },
}))

export default useMyBoardStore
