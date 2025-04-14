import axios from 'axios'

//구인 글 작성
export const createPost = async (postData) => {
  const response = await axios.post('/api/v1/job-posting', postData)
  return response.data
}
