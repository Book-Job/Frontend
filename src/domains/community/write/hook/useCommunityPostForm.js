import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useAuthStore from '../../../../store/login/useAuthStore'
import useFreeDraftStore from '../../../../store/mypage/useFreeDraftStore'

const useCommunityPostForm = () => {
  const { user } = useAuthStore()
  const { selectedFreeDraft } = useFreeDraftStore()

  const {
    register,
    reset,
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: user?.nickname || '',
      title: '',
    },
  })

  useEffect(() => {
    if (selectedFreeDraft) {
      reset({
        nickname: selectedFreeDraft.nickname || user?.nickname || '',
        title: selectedFreeDraft.title || '',
      })
    }
  }, [selectedFreeDraft, user, reset])

  return {
    register,
    reset,
    setValue,
    getValues,
    control,
    handleSubmit,
    errors,
  }
}

export default useCommunityPostForm
