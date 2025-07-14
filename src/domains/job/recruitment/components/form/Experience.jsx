import FormItem from '../../../common/components/FormItem'
import { useWatch } from 'react-hook-form'

const MAX_YEARS = 40

const getInputCommonProps = () => ({
  type: 'number',
  min: '0',
  max: MAX_YEARS.toString(),
  step: '1',
  pattern: '\\d*',
  className:
    'h-[56px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none w-full',
  onKeyDown: (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault()
  },
  onInput: (e) => {
    const value = Number(e.target.value)
    if (value > MAX_YEARS) {
      e.target.value = MAX_YEARS
    }
  },
})

const Experience = ({ register, errors, control }) => {
  const min = useWatch({ control, name: 'experienceMin' })

  return (
    <div className='flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4'>
      <FormItem label='경력 (최소)' dot={true}>
        <input
          name='experienceMin'
          placeholder='0 입력시 신입'
          {...getInputCommonProps()}
          {...register('experienceMin', {
            required: '최소 경력을 입력해주세요',
            valueAsNumber: true,
            min: {
              value: 0,
              message: '0 이상 입력해주세요',
            },
            max: {
              value: MAX_YEARS,
              message: `${MAX_YEARS} 이하로 입력해주세요`,
            },
          })}
        />
        {errors.experienceMin && (
          <span className='block w-full text-left text-error-red text-sm mt-1'>
            {errors.experienceMin.message}
          </span>
        )}
      </FormItem>
      <FormItem label='경력 (최대)' dot={true}>
        <input
          name='experienceMax'
          placeholder='0 입력시 경력무관'
          {...getInputCommonProps()}
          {...register('experienceMax', {
            required: '최대 경력을 입력해주세요',
            valueAsNumber: true,
            min: {
              value: 0,
              message: '0 이상 입력해주세요',
            },
            max: {
              value: MAX_YEARS,
              message: `${MAX_YEARS} 이하로 입력해주세요`,
            },
            validate: (max) =>
              min !== undefined && max >= min ? true : '최소 경력보다 같거나 커야 합니다',
          })}
        />
        {errors.experienceMax && (
          <span className='block w-full text-left text-error-red text-sm mt-1'>
            {errors.experienceMax.message}
          </span>
        )}
      </FormItem>
    </div>
  )
}

export default Experience
