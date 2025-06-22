import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import ToastService from '../../../../utils/toastService'
import draftToHtml from 'draftjs-to-html'
import DOMPurify from 'dompurify'
import { convertToRaw } from 'draft-js'
import useBestStore from '../../../../store/main/useBestStore'

export const usePostSubmit = (createPostFn) => {
  const navigate = useNavigate()
  const { fetchJobBest } = useBestStore()

  const handleSubmit = async (formData) => {
    try {
      let postData = { ...formData }
      if (formData.text) {
        let contentState
        if (formData.text.getCurrentContent) {
          contentState = formData.text.getCurrentContent()
        } else if (formData.text.getBlockMap) {
          contentState = formData.text
        }

        if (contentState) {
          const rawContent = convertToRaw(contentState)
          const rawHtml = draftToHtml(rawContent)
          postData.text = DOMPurify.sanitize(rawHtml)
        }
      }

      postData = {
        ...postData,
        text: typeof postData.text === 'string' ? postData.text : String(postData.text),
      }

      await createPostFn(postData)
      ToastService.success('등록이 완료되었습니다!')
      fetchJobBest(true)
      navigate(ROUTER_PATHS.JOB_MAIN, {
        state: {
          refresh: true,
          triggerRefresh: true,
        },
      })
    } catch (error) {
      ToastService.error('등록 중 오류가 발생했습니다.')
      console.error(error)
    }
  }

  return handleSubmit
}
