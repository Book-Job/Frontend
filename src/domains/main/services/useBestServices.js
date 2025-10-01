import { publicApi } from '../../../services/api/axios'

export const getFreeBest = async () => {
  try {
    const response = await publicApi.get('/boards/best')
    return response
  } catch (error) {
    console.error('자유 베스트 리스트 오류:', error)
    throw new Error(error)
  }
}

export const getJobBest = async () => {
  try {
    const response = await publicApi.get('/job-posting/best')
    return response
  } catch (error) {
    console.error('구인 베스트 리스트 오류:', error)
    throw new Error(error)
  }
}

export const getJobNewBest = async () => {
  try {
    const desiredSize = 10
    let allJobPostings = []
    let lastId = null

    while (allJobPostings.length < desiredSize) {
      const params = {
        order: 'LATEST',
        size: desiredSize - allJobPostings.length,
      }

      if (lastId) {
        params.last = lastId
      }

      const response = await publicApi.get('/job-posting', { params })
      const data = response.data.data

      if (data && data.jobPostings && data.jobPostings.length > 0) {
        allJobPostings = [...allJobPostings, ...data.jobPostings]
        lastId = data.lastId

        if (!lastId) {
          break
        }
      } else {
        lastId = null
        break
      }
    }
    const finalJobPostings = allJobPostings.slice(0, desiredSize)
    return {
      data: {
        message: 'success',
        data: {
          jobPostings: finalJobPostings,
          lastId: lastId,
        },
      },
    }
  } catch (error) {
    console.error('구인 신규글 리스트 오류:', error)
    throw error
  }
}
