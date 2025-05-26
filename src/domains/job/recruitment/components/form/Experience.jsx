import FormItem from '../../../common/components/FormItem'

const Experience = ({ register }) => {
  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:space-x-4 sm:gap-0'>
      <FormItem label='경력 (최소)' dot={true}>
        <input
          type='number'
          name='experienceMin'
          min='0'
          step='1'
          pattern='\d*'
          placeholder='0 입력시 신입'
          className='h-[58px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none w-full sm:w-[230px]'
          {...register('experienceMin', { valueAsNumber: true, min: 0 })}
          onKeyDown={(e) => {
            if (['e', 'E', '+', '-', '.'].includes(e.key)) {
              e.preventDefault()
            }
          }}
        />
      </FormItem>

      <FormItem label='경력 (최대)' dot={true}>
        <input
          type='number'
          name='experienceMax'
          min='0'
          step='1'
          pattern='\d*'
          placeholder='0 입력시 경력무관'
          className='h-[58px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none w-full sm:w-[230px]'
          {...register('experienceMax', { valueAsNumber: true, min: 0 })}
          onKeyDown={(e) => {
            if (['e', 'E', '+', '-', '.'].includes(e.key)) {
              e.preventDefault()
            }
          }}
        />
      </FormItem>
    </div>
  )
}

export default Experience
