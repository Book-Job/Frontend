import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import useIsMobile from '../../hooks/header/useIsMobile'

const Footer = ({ email, onClick }) => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  return (
    <footer className='w-full bg-[#FDF8FA] sm:py-10 py-5 px-6 text-left'>
      <div className='flex flex-col mx-auto sm:gap-4 max-w-7xl'>
        {isMobile ? null : (
          <button
            type='button'
            onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
            className='text-3xl font-bold text-left cursor-pointer text-main-pink font-logo'
          >
            bookjob
          </button>
        )}
        <div className='flex flex-wrap items-center gap-3 text-sm text-left sm:gap-6 text-dark-gray'>
          <span className='font-semibold'>북잡</span>
          {/* <span>대표 | 이신지</span> */}
          <span>
            이메일 |{' '}
            <a
              href={`mailto:${email}`}
              className='cursor-pointer hover:underline text-dark-gray'
              onClick={onClick}
              aria-label={`Send email to ${email}`}
            >
              {email}
            </a>
          </span>
          <span className='flex gap-3 sm:gap-6'>
            <a href='/terms' className='text-blue-600 underline'>
              이용약관
            </a>
            <a href='/privacy' className='text-blue-600 underline'>
              개인정보처리방침
            </a>
          </span>
        </div>

        <div className='mt-4 text-xs text-gray-400'>© 2025 BookJob. All rights reserved.</div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Footer
