import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'

const Footer = ({ email, onClick }) => {
  const navigate = useNavigate()

  return (
    <footer className='w-full bg-[#FDF8FA] py-10 px-6 text-left'>
      <div className='max-w-7xl mx-auto flex flex-col gap-4'>
        <button
          type='button'
          onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
          className='text-3xl font-bold text-main-pink font-logo cursor-pointer'
        >
          bookjob
        </button>
        <div className='flex flex-wrap gap-6 text-sm text-dark-gray text-left items-center'>
          <span className='font-semibold'>북잡</span>
          <span>대표 | 이신지</span>
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
          <a href='/terms' className='text-blue-600 underline'>
            이용약관
          </a>
          <a href='/privacy' className='text-blue-600 underline'>
            개인정보처리방침
          </a>
        </div>

        <div className='text-xs text-gray-400 mt-4'>© 2025 BookJob. All rights reserved.</div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Footer
