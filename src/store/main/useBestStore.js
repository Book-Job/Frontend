import { create } from 'zustand'
import { getFreeBest, getJobBest } from '../../domains/main/services/useBestServices'
import { persist } from 'zustand/middleware'

const useBestStore = create(
  persist(
    (set, get) => ({
      freeBest: [],
      jobBest: [],
      isFreeLoading: false,
      isJobLoading: false,
      freeError: null,
      jobError: null,
      freeLastFetch: null, // 자유게시판 데이터의 마지막 갱신 시간
      jobLastFetch: null, // 구인구직 데이터의 마지막 갱신 시간

      fetchFreeBest: async (force = false) => {
        const state = get()
        // 캐시가 있고, force가 false이고, 캐시가 만료되지 않았으면 캐시 사용
        if (!force && state.freeBest.length > 0 && state.freeLastFetch) {
          const now = Date.now()
          const cacheDuration = 5 * 60 * 1000 // 5분
          if (now - state.freeLastFetch < cacheDuration) {
            console.log('캐시된 자유 베스트 데이터 사용')
            return
          }
        }

        set({ isFreeLoading: true, freeError: null })
        try {
          const response = await getFreeBest()
          if (response.data && response.data.message === 'success') {
            console.log('자유 베스트 리스트 성공:', response)
            set({
              freeBest: response.data.data || [],
              freeLastFetch: Date.now(), // 갱신 시간 저장
            })
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

      fetchJobBest: async (force = false) => {
        const state = get()
        // 캐시가 있고, force가 false이고, 캐시가 만료되지 않았으면 캐시 사용
        if (!force && state.jobBest.length > 0 && state.jobLastFetch) {
          const now = Date.now()
          const cacheDuration = 5 * 60 * 1000 // 5분
          if (now - state.jobLastFetch < cacheDuration) {
            console.log('캐시된 구인 베스트 데이터 사용')
            return
          }
        }

        set({ isJobLoading: true, jobError: null })
        try {
          const response = await getJobBest()
          if (response.data && response.data.message === 'success') {
            console.log('구인 베스트 리스트 성공:', response)
            set({
              jobBest: response.data.data || [],
              jobLastFetch: Date.now(), // 갱신 시간 저장
            })
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
    }),
    {
      name: 'best-store', // 로컬 스토리지 키
      partialize: (state) => ({
        freeBest: state.freeBest,
        jobBest: state.jobBest,
        freeLastFetch: state.freeLastFetch,
        jobLastFetch: state.jobLastFetch,
      }), // 캐싱할 상태 선택
    },
  ),
)

export default useBestStore
