import { Controller } from 'react-hook-form'
import FormItem from '../../../common/components/FormItem'
import { useMemo } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import JobInputBox from '../../../../../components/web/JobInputBox'
import '../../../../../assets/styles/datepicker.css'

const ClosingDate = ({ control }) => {
  const minDate = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  }, [])

  return (
    <FormItem label='구인마감' dot={true} name='closingDate' htmlFor='closingDate'>
      <Controller
        name='closingDate'
        control={control}
        render={({ field }) => (
          <DatePicker
            id='closingDate'
            name='closingDate'
            selected={field.value ? new Date(field.value) : null}
            onChange={field.onChange}
            minDate={minDate}
            dateFormat='yyyy-MM-dd'
            customInput={<JobInputBox placeholder='날짜를 선택하세요' />}
            autoComplete='off'
          />
        )}
      />
      <div id='closingDateHelp' className='w-full text-left text-error-red text-sm mt-1'>
        미선택시 상시채용으로 자동 입력됩니다.
      </div>
    </FormItem>
  )
}

export default ClosingDate
