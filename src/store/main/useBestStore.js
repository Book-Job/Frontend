import { create } from 'zustand'
import { getFreeBest, getJobBest, getJobNewBest } from '../../domains/main/services/useBestServices'
import { persist } from 'zustand/middleware'

const useBestStore = create(
  persist(
    (set, get) => ({
      freeBest: [],
      jobBest: [],
      jobNew: [],
      isFreeLoading: false,
      isJobLoading: false,
      isJobNewLoading: false,
      freeError: null,
      jobError: null,
      jobNewError: null,
      freeLastFetch: null,
      jobLastFetch: null,
      jobNewLastFetch: null,

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

      fetchJobNew: async (force = false) => {
        const state = get()
        if (!force && state.jobNew.length > 0 && state.jobNewLastFetch) {
          const now = Date.now()
          const cacheDuration = 5 * 60 * 1000
          if (now - state.jobNewLastFetch < cacheDuration) {
            return
          }
        }

        set({ isJobNewLoading: true, jobNewError: null })
        try {
          const response = await getJobNewBest()
          if (response.data && response.data.message === 'success') {
            set({
              jobNew: response.data.data?.jobPostings || [],
              jobNewLastFetch: Date.now(),
            })
          } else {
            set({ jobNewError: '구인 신규글 리스트를 불러오지 못했습니다.' })
            set({ jobNew: [] })
          }
        } catch (error) {
          console.error('구인 신규글 리스트 오류:', error)
          set({ jobNewError: '서버 오류가 발생했습니다.' })
          set({ jobNew: [] })
        } finally {
          set({ isJobNewLoading: false })
        }
      },
    }),
    {
      name: 'best-store',
      partialize: (state) => ({
        freeBest: state.freeBest,
        jobBest: state.jobBest,
        jobNew: state.jobNew,
        freeLastFetch: state.freeLastFetch,
        jobLastFetch: state.jobLastFetch,
        jobNewLastFetch: state.jobNewLastFetch,
      }),
    },
  ),
)

export default useBestStore
