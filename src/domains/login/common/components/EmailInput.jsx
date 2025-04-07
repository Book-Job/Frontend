import { useEffect, useState } from 'react'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import Button from '../../../../components/web/Button'

const EmailInput = ({ register, errors, watch, setValue }) => {
  const [domain, setDomain] = useState('naver.com')
  const [customDomain, setCustomDomain] = useState('')
  const [isCustom, setIsCustom] = useState(false) // 직접 입력 모드 여부 (이제 input 창 보이기/숨기기 용도로만 사용)

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
    <div>
      <div className='flex flex-row gap-2'>
        <LabelWithInput
          label='이메일'
          type='email'
          placeholder='ex) bookjob'
          size='small'
          {...register('emailId', { required: '이메일을 입력하세요' })}
        />
        <span className='flex items-end text-2xl'>@</span>
        <div className='flex items-end'>
          {isCustom ? ( // isCustom 상태가 true일 때만 직접 입력 input 창 렌더링
            <input
              type='text'
              placeholder='직접 입력'
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className='border border-gray-8e8e8e rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e h-[58px] w-[148px] focus:border-main-color-pink focus:outline-none'
            />
          ) : (
            <select
              value={domain}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setIsCustom(true) // "직접 입력" 모드 활성화 (input 창 보이도록)
                  setDomain('') // 도메인 선택 초기화 (선택된 도메인 없도록)
                } else {
                  setIsCustom(false) // "직접 입력" 모드 비활성화 (input 창 숨기도록)
                  setDomain(e.target.value) // 선택된 도메인으로 domain 상태 업데이트
                  setCustomDomain('') // 직접 입력 input 값 초기화 (선택 모드로 돌아왔으므로)
                }
              }}
              className='border border-gray-8e8e8e rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e h-[58px] w-[150px] focus:border-main-color-pink focus:outline-none'
            >
              <option value='naver.com'>naver.com</option>
              <option value='gmail.com'>gmail.com</option>
              <option value='daum.net'>daum.net</option>
              <option value='nate.com'>nate.com</option>
              <option value='hanmail.net'>hanmail.net</option>
              <option value='naver.com'>naver.com</option>
              <option value='hotmail.com'>hotmail.com</option>
              <option value='yahoo.co.kr'>yahoo.co.kr</option>
              <option value='empal.com'>empal.com</option>
              <option value='korea.com'>korea.com</option>
              <option value='hanmir.com'>hanmir.com</option>
              <option value='dreamwiz.com'>dreamwiz.com</option>
              <option value='orgio.net'>orgio.net</option>
              <option value='chol.com'>chol.com</option>
              <option value='hitel.net'>hitel.net</option>
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
    </div>
  )
}

export default EmailInput
