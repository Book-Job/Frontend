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
      freeLastFetch: null,
      jobLastFetch: null,

      fetchFreeBest: async (force = false) => {
        const state = get()
        if (!force && state.freeBest.length > 0 && state.freeLastFetch) {
          const now = Date.now()
          const cacheDuration = 5 * 60 * 1000
          if (now - state.freeLastFetch < cacheDuration) {
            return
          }
        }

        set({ isFreeLoading: true, freeError: null })
        try {
          const response = await getFreeBest()
          if (response.data && response.data.message === 'success') {
            set({
              freeBest: response.data.data || [],
              freeLastFetch: Date.now(),
            })
          } else {
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
        if (!force && state.jobBest.length > 0 && state.jobLastFetch) {
          const now = Date.now()
          const cacheDuration = 5 * 60 * 1000
          if (now - state.jobLastFetch < cacheDuration) {
            return
          }
        }

        set({ isJobLoading: true, jobError: null })
        try {
          const response = await getJobBest()
          if (response.data && response.data.message === 'success') {
            set({
              jobBest: response.data.data || [],
              jobLastFetch: Date.now(),
            })
          } else {
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
      name: 'best-store',
      partialize: (state) => ({
        freeBest: state.freeBest,
        jobBest: state.jobBest,
        freeLastFetch: state.freeLastFetch,
        jobLastFetch: state.jobLastFetch,
      }),
    },
  ),
)

export default useBestStore
