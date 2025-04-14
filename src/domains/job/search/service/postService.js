import axios from 'axios'

//구직 글 작성
export const createPost = async (postData) => {
  const response = await axios.post('/api/v1/job-seeking', postData)
  return response.data
}
