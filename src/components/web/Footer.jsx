import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import useIsMobile from '../../hooks/header/useIsMobile'
import ROUTER_PATHS from '../../routes/RouterPath'

const Footer = ({ email, onClick }) => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const [showCompanyInfo, setShowCompanyInfo] = useState(false)

  if (isMobile) {
    return (
      <footer className='w-full bg-[#FDF8FA] py-5 px-6 text-center sm:text-left'>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0'>
          <nav className='flex items-center gap-3 text-sm text-dark-gray select-none'>
            <span className='font-semibold cursor-default'>북잡 </span>
            <Link to='/privacy-policy' className='text-blue-600 underline'>
              개인정보처리방침
            </Link>
            <Link to='/terms-of-service' className='text-blue-600 underline'>
              이용약관
            </Link>
          </nav>
          <div
            className='flex items-center text-sm text-dark-gray cursor-pointer select-none'
            onClick={() => setShowCompanyInfo((prev) => !prev)}
            aria-expanded={showCompanyInfo}
            aria-controls='company-info'
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowCompanyInfo((prev) => !prev)
              }
            }}
          >
            (주) 북잡
            <span className='ml-1 text-lg leading-none'>
              {showCompanyInfo ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </span>
          </div>
        </div>
        {showCompanyInfo && (
          <div
            id='company-info'
            className='max-w-7xl mx-auto mt-2 text-xs sm:text-sm text-gray-600 text-center sm:text-left space-y-1 select-text'
          >
            <p>대표 | 이신지</p>
            <p>
              이메일 |{' '}
              <a href={`mailto:${email}`} className='text-blue-600 underline'>
                {email}
              </a>
            </p>
          </div>
        )}
        <div className='mt-4 text-xs text-dark-gray text-center sm:text-left'>
          © 2025 BookJob. All rights reserved.
        </div>
      </footer>
    )
  }

  return (
    <footer className='w-full bg-[#FDF8FA] sm:py-10 py-5 px-6 text-left'>
      <div className='flex flex-col mx-auto sm:gap-4 max-w-7xl'>
        <button
          type='button'
          onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
          className='text-3xl font-bold text-left cursor-pointer text-main-pink font-logo'
        >
          bookjob
        </button>
        <div className='flex flex-wrap items-center gap-3 text-sm text-left sm:gap-6 text-dark-gray'>
          <span className='font-semibold'>북잡</span>
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
        <div className='mt-4 text-xs text-dark-gray'>© 2025 BookJob. All rights reserved.</div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Footer
