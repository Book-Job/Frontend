import JobLabel from '../../../../components/web/JobLabel'

const FormItem = ({ label, dot, children }) => {
  const isSpecialRow = label === '구인 / 구직'

  return (
    <div
      className={`flex ${
        isSpecialRow ? 'flex-row items-center' : 'flex-col sm:flex-row sm:items-center'
      } gap-2 mb-4`}
    >
      <div className='min-w-[70px] sm:min-w-[210px]'>
        <JobLabel label={label} dot={dot} className='text-[16px] sm:text-[24px] sm:mr-[30px]' />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}

export default FormItem
