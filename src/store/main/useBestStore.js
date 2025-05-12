import { create } from 'zustand'
import { getFreeBest, getJobBest } from '../../domains/main/services/useBestServices'

const useBestStore = create((set) => ({
  freeBest: [],
  jobBest: [],
  isFreeLoading: false,
  isJobLoading: false,
  freeError: null,
  jobError: null,

  fetchFreeBest: async () => {
    // 이미 데이터가 있으면 호출 생략
    if (useBestStore.getState().freeBest.length > 0) return

    set({ isFreeLoading: true, freeError: null })
    try {
      const response = await getFreeBest()
      if (response.data && response.data.message === 'success') {
        console.log('자유 베스트 리스트 성공:', response)
        set({ freeBest: response.data.data || [] })
      } else {
        console.log('자유 베스트 리스트 오류:', response)
        set({ freeError: '자유게시판 베스트 리스트를 불러오지 못했습니다.' })
        set({ freeBest: [] })
      }
    } catch (error) {
      console.error('자유 베스트 리스트 오류:', error)
      set({ freeError: '서버 오류가 발생했습니다.' })
      set({ freeBest: [] })
    } finally {
      set({ isFreeLoading: false })
    }
  },

  fetchJobBest: async () => {
    // 이미 데이터가 있으면 호출 생략
    if (useBestStore.getState().jobBest.length > 0) return

    set({ isJobLoading: true, jobError: null })
    try {
      const response = await getJobBest()
      if (response.data && response.data.message === 'success') {
        console.log('구인 베스트 리스트 성공:', response)
        set({ jobBest: response.data.data || [] })
      } else {
        console.log('구인 베스트 리스트 오류:', response)
        set({ jobError: '구인구직 베스트 리스트를 불러오지 못했습니다.' })
        set({ jobBest: [] })
      }
    } catch (error) {
      console.error('구인 베스트 리스트 오류:', error)
      set({ jobError: '서버 오류가 발생했습니다.' })
      set({ jobBest: [] })
    } finally {
      set({ isJobLoading: false })
    }
  },
}))

export default useBestStore