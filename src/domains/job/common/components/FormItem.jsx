import JobLabel from '../../../../components/web/JobLabel'

const FormItem = ({ label, dot, children }) => {
  const isNickname = label === '닉네임'

  return (
    <div
      className={`flex ${
        isNickname ? 'flex-row items-center justify-start' : 'flex-col sm:flex-row sm:items-start'
      } gap-2 mb-4`}
    >
      <div className='sm:w-[150px] flex-shrink-0 sm:mr-6 sm:mb-0 flex items-center'>
        <JobLabel label={label} dot={dot} className='text-4' />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}

export default FormItem
