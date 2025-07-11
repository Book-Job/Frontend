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
              name='closingDate'
              type='date'
              aria-describedby='closingDateHelp'
              className='
              w-full h-[56px] border border-dark-gray rounded px-4 text-black 
              focus:border-main-pink focus:outline-none cursor-pointer appearance-none
              text-left
            '
              style={{
                WebkitAppearance: 'textfield',
                appearance: 'none',
                textAlign: 'left',
                paddingLeft: '16px',
                textIndent: 0,
              }}
              min={minDate}
              value={dateValue}
              onChange={field.onChange}
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            />
          )
        }}
      />
      <div id='closingDateHelp' className='w-full text-left text-error-red text-sm mt-1'>
        미선택시 상시채용으로 자동 입력됩니다.
      </div>
    </FormItem>
  )
}

export default ClosingDate
