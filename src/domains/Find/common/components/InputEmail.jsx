import { useEffect, useState } from 'react'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import DomainSelector from '../../../login/common/components/DomainSelector'
import Button from './../../../../components/web/Button'

const InputEmail = ({ register, errors, watch, setValue }) => {
  const [domain, setDomain] = useState('naver.com')
  const [customDomain, setCustomDomain] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  // 이메일 입력 값
  const emailId = watch('emailId') || ''

  // 도메인 값 결정 (직접 입력 vs 선택)
  const domainValue = isCustom ? customDomain : domain

  // emailFull 값 자동 업데이트
  useEffect(() => {
    const emailFull = `${emailId}@${domainValue}`
    setValue('email', emailFull)
  }, [emailId, domainValue, setValue])

  return (
    <div className='w-full max-w-[575px]'>
      <div className='flex gap-2'>
        <div className='flex-auto'>
          <LabelWithInput
            label='이메일'
            type='email'
            placeholder='ex) bookjob'
            size='medium'
            {...register('emailId', { required: '이메일을 입력하세요' })}
          />
        </div>
        <span className='flex items-end text-2xl'>@</span>
        <DomainSelector
          domain={domain}
          customDomain={customDomain}
          isCustom={isCustom}
          setDomain={setDomain}
          setCustomDomain={setCustomDomain}
          setIsCustom={setIsCustom}
        />
      </div>
      <div className='flex items-end mt-6'>
        <Button size='biggest' label='인증' bgColor='light-gray'  />
      </div>
      <div className='flex items-start '>
        {errors.emailId && <p className='text-red-500 text-[14px]'>{errors.emailId.message}</p>}
      </div>
    </div>
  )
}

export default InputEmail
