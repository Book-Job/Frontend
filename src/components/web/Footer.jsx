import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Footer = ({ email, onClick }) => {
  const navigate = useNavigate()
  return (
    <div className='flex w-full h-[130px] bg-[#FDF8FA] justify-center gap-24 items-center px-10 mt-[40px]'>
      <div
        className='text-[35px] font-bold text-main-pink cursor-pointer'
        onClick={() => navigate('/')}
      >
        bookjob
      </div>
      <div className='flex text-[13px] flex-row gap-20 text-dark-gray'>
        <div className=''>팀장 | 이신지</div>
        <div className=''>팀원 | 김영철, 이은석, 송수빈</div>
        <div className='' onClick={onClick}>
          이메일 | {email}
        </div>
      </div>
    </div>
  )
}
Footer.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Footer
