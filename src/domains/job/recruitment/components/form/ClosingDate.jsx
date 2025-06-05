import { Controller } from 'react-hook-form'
import FormItem from '../../../common/components/FormItem'
import { useMemo } from 'react'
const ClosingDate = ({ control }) => {
  const minDate = useMemo(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }, [])

  return (
    <FormItem label='구인마감' dot={true} name='closingDate' htmlFor='closingDate'>
      <Controller
        name='closingDate'
        control={control}
        render={({ field }) => {
          const dateValue = field.value ? field.value.split('T')[0] : ''
          return (
            <input
              id='closingDate'
              type='date'
              aria-describedby='closingDateHelp'
              className='w-full h-[58px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none cursor-pointer  text-left'
              min={minDate}
              value={dateValue}
              onChange={field.onChange}
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            />
          )
        }}
      />
      <p className='flex text-red-500 text-[13px] mt-1'>미선택시 상시채용으로 자동 입력됩니다.</p>
    </FormItem>
  )
}

export default ClosingDate
