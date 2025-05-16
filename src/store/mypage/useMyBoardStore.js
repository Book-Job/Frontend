import { create } from 'zustand'
import { getMyFreeBoardData, getMyJobBoardData } from '../../domains/my/services/useMyBoardServices'

const useMyBoardStore = create((set) => ({
  freeBoard: [],
  jobBoard: [],
  isFreeLoading: false,
  isJobLoading: false,
  freeError: null,
  jobError: null,

  // 일반화된 데이터 페칭 함수
  fetchBoardData: async (boardType, fetchService, dataExtractor, token, force = false) => {
    const stateKey = boardType === 'free' ? 'freeBoard' : 'jobBoard'
    const loadingKey = boardType === 'free' ? 'isFreeLoading' : 'isJobLoading'
    const errorKey = boardType === 'free' ? 'freeError' : 'jobError'
    const boardName = boardType === 'free' ? '자유게시판' : '구인구직'

    // force가 true이거나 데이터가 없으면 호출
    if (force || useMyBoardStore.getState()[stateKey].length > 0) {
      set({ [loadingKey]: true, [errorKey]: null })
      console.log(`Fetching ${boardName} with force:${force}`) // 디버깅 로그

      try {
        const response = await fetchService(token)
        if (response.message === 'success') {
          console.log(`내가 작성한 ${boardName} 리스트 성공:`, response.data)
          set({ [stateKey]: dataExtractor(response.data) || [] })
        } else {
          console.log(`내가 작성한 ${boardName} 리스트 오류:`, response)
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

  fetchFreeBoard: async (token, force = false) => {
    console.log('Free force값 검사 : ', force)
    return useMyBoardStore
      .getState()
      .fetchBoardData(
        'free',
        getMyFreeBoardData,
        (data) => data.myPostingsInBoardList,
        token,
        force,
      )
  },

  fetchJobBoard: async (token, force = false) => {
    console.log('Job force값 검사 : ', force)
    return useMyBoardStore
      .getState()
      .fetchBoardData('job', getMyJobBoardData, (data) => data.postings, token, force)
  },
}))

export default useMyBoardStore
