import { useForm } from 'react-hook-form'

export const MAX_TITLE_LENGTH = 50

export default function useTitleValidation() {
  return {
    required: '제목을 입력해주세요.',
    maxLength: {
      value: MAX_TITLE_LENGTH,
      message: `제목은 ${MAX_TITLE_LENGTH}자 이내로 작성해주세요.`,
    },
  }
}
