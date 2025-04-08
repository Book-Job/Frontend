import JobLabel from '../../../../components/web/JobLabel'

const FormItem = ({ label, dot, children }) => (
  <>
    <div className='grid grid-cols-[210px_1fr] items-start gap-2 mb-4 '>
      <JobLabel label={label} dot={dot} />
      <div className='ml-4 flex-1'>{children}</div>
    </div>
  </>
)

export default FormItem
