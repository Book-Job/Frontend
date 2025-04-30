import { authApi } from '../../../../services/api/Axios'

//구직 글 작성
export const createPost = async (postData) => {
  const response = await authApi.post('/api/v1/job-seeking', postData)
  return response.data
}
