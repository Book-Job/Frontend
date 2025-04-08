import JobLabel from '../../../../components/web/JobLabel'
import JobFormLine from './JobFormLine'

const GetEmailAndNickName = () => {
  const labels = ['닉네임', '이메일']

  return (
    <>
      {labels.map((label, index) => (
        <div key={index} className={`flex flex-col ${index === 0 ? '' : ''}`}>
          <JobLabel label={label} />
          <JobFormLine />
        </div>
      ))}
    </>
  )
}

export default GetEmailAndNickName
