import { useEffect, useState } from 'react'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import Button from '../../../../components/web/Button'

const EmailInput = ({ register, errors, watch, setValue }) => {
  const [domain, setDomain] = useState('naver.com')
  const [customDomain, setCustomDomain] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  // 이메일 입력 값
  const emailId = watch('emailId') || ''

  // 도메인 값 결정 (직접 입력 vs 선택)
  const domainValue = isCustom ? customDomain : domain

  // emailFull 값 자동 업데이트
  // const emailFull = `${emailId}@${domainValue}`
  // setValue('email', emailFull)
  useEffect(() => {
    const emailFull = `${emailId}@${domainValue}` //react-hook-form에 이메일 전체 저장
    setValue('email', emailFull) // ✅ 'email' 필드에 전체 이메일 저장
  }, [emailId, domainValue, setValue])

  return (
    <div>
      <div className='flex flex-row gap-2'>
        <LabelWithInput
          label='이메일'
          type='email'
          placeholder='ex) bookjob'
          width={224}
          {...register('emailId', { required: '이메일을 입력하세요' })}
        />
        <span className='flex items-end'>@</span>
        <div className='flex items-end'>
          {isCustom ? (
            <input
              type='text'
              placeholder='직접 입력'
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className='border px-3 py-2 rounded-md w-[150px]'
            />
          ) : (
            <select
              value={domain}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setIsCustom(true)
                  setCustomDomain('') // 직접 입력 모드일 때 초기화
                } else {
                  setIsCustom(false)
                  setDomain(e.target.value)
                }
              }}
              className='px-3 py-2 border rounded-md'
            >
              <option value='naver.com'>naver.com</option>
              <option value='gmail.com'>gmail.com</option>
              <option value='daum.net'>daum.net</option>
              <option value='custom'>직접 입력</option>
            </select>
          )}
        </div>
        <div className='flex items-end'>
          <Button size='small' label='인증' bgColor='light-gray' />
        </div>
      </div>
      <div className='flex items-start'>
        {errors.emailId && <p className='text-red-500'>{errors.emailId.message}</p>}
      </div>
      {/* <input type='hidden' {...register('emailFull')} /> */}
    </div>
  )
}

export default EmailInput
