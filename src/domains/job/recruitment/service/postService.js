import { authApi } from '../../../../services/api/Axios'

//구인 글 작성
export const createPost = async (postData) => {
  const response = await authApi.post('/job-posting', postData)
  return response.data
}
