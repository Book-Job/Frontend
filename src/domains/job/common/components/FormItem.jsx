import JobLabel from '../../../../components/web/JobLabel'

const FormItem = ({ label, dot, children }) => {
  const specialLabels = ['구인 / 구직', '근무형태', '직군']
  const isSpecialRow = specialLabels.includes(label)

  return (
    <div
      className={`flex flex-col ${
        isSpecialRow ? 'sm:flex-row sm:items-center' : 'sm:flex-row sm:items-center'
      } gap-2 mb-4`}
    >
      <div className='sm:w-[150px] flex-shrink-0 sm:mr-6 mb-2 sm:mb-0'>
        <JobLabel label={label} dot={dot} className='text-[16px] sm:text-[16px]' />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}

export default FormItem
