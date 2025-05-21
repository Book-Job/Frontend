import FormItem from '../../../common/components/FormItem'

const ClosingDate = ({ register, setValue }) => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const minDate = `${yyyy}-${mm}-${dd}`

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    selectedDate.setHours(18, 0, 0)
    setValue('구인마감', selectedDate.toISOString())
  }

  const handleFocus = (e) => {
    if (e.target.showPicker) {
      e.target.showPicker()
    }
  }

  return (
    <FormItem label='구인마감' dot={true} register={register} name='closingDate'>
      <input
        type='date'
        className='w-full h-[58px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none cursor-pointer'
        onChange={handleDateChange}
        onFocus={handleFocus}
        min={minDate}
      />

      <p className='flex text-red-500 text-[13px] mt-1'>미선택시 상시채용으로 자동 입력됩니다.</p>
    </FormItem>
  )
}

export default ClosingDate
