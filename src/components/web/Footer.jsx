import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'

const Footer = ({ email, onClick }) => {
  const navigate = useNavigate()
  return (
    <div className='flex w-full h-auto bg-[#FDF8FA] justify-center items-center px-4 py-6 mt-10 flex-col gap-4 md:flex-row md:gap-24 md:h-[130px]'>
      <div
        className='text-2xl md:text-[35px] font-bold text-main-pink cursor-pointer font-logo'
        onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
      >
        bookjob
      </div>
      <div className='flex flex-col md:flex-row text-sm md:text-[13px] text-dark-gray gap-2 md:gap-20 items-center text-center'>
        <div>팀장 | 이신지</div>
        <div>팀원 | 김영철, 이은석, 송수빈</div>
        <div onClick={onClick}>이메일 | {email}</div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Footer
