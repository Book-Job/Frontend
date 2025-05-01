import FormItem from '../../../common/components/FormItem'
const ClosingDate = ({ register }) => {
  return (
    <FormItem label='구인마감' dot={true} register={register} name='closingDate'>
      <input
        type='date'
        className='w-full h-[58px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none cursor-pointer'
        placeholder='미선택시 채용시 마감으로 자동 입력됩니다.' //구인시 마감인 경우 어떻게 처리할지
        {...register('closingDate')}
      />
    </FormItem>
  )
}
export default ClosingDate
