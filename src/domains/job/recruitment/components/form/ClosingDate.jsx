import FormItem from '../../../common/components/FormItem'

const ClosingDate = ({ register }) => {
  return (
    <FormItem label='구인마감' dot={true} register={register} name='closingDate'>
      <input
        type='date'
        className='w-full h-[58px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none cursor-pointer'
        {...register('closingDate')}
      />
      <p className='flex text-red-500 text-[13px] mt-1'>미선택시 상시채용으로 자동 입력됩니다.</p>
    </FormItem>
  )
}

export default ClosingDate
