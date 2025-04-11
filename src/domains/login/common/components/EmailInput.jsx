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
  useEffect(() => {
    const emailFull = `${emailId}@${domainValue}`
    setValue('email', emailFull)
  }, [emailId, domainValue, setValue])

  const domainOptions = [
    'naver.com',
    'gmail.com',
    'daum.net',
    'nate.com',
    'hanmail.net',
    'hotmail.com',
    'yahoo.co.kr',
    'empal.com',
    'korea.com',
    'hanmir.com',
    'dreamwiz.com',
    'orgio.net',
    'chol.com',
    'hitel.net',
    'custom',
  ]
  return (
    <div className='w-full'>
      <div className='flex w-full gap-2'>
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
        <div className='flex items-end'>
          {isCustom ? (
            <input
              type='text'
              placeholder='직접 입력'
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className='border border-dark-gray rounded px-4 text-[18px] text-black placeholder:text-dark-gray h-[58px] focus:border-main-pink focus:outline-none w-32'
            />
          ) : (
            <select
              value={domain}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setIsCustom(true)
                  setDomain('')
                } else {
                  setIsCustom(false)
                  setDomain(e.target.value)
                  setCustomDomain('')
                }
              }}
              className='border border-dark-gray rounded px-4 text-[16px] text-black placeholder:text-dark-gray h-[58px] focus:border-main-pink focus:outline-none w-32'
            >
              {domainOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'custom' ? '직접 입력' : option}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className='flex items-end w-[148px]'>
          <Button size='small' label='인증' bgColor='light-gray' />
        </div>
      </div>
      <div className='flex items-start'>
        {errors.emailId && <p className='text-red-500 text-[14px]'>{errors.emailId.message}</p>}
      </div>
    </div>
  )
}

export default EmailInput
