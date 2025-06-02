import PropTypes from 'prop-types'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import babyChick from '../../assets/icons/common/common_babyChick.svg'
import mobileMenu from '../../assets/icons/mobile/mobile_menu.svg'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import { useState, useRef, useEffect } from 'react'
import MobileSidebar from './MobileSidebar'
import useAuthStore from '../../store/login/useAuthStore'

const MobileMainHeader = () => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const dropdownRef = useRef(null)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const options = [
    ...(isAuthenticated
      ? [
          { value: 'mypage', label: '마이페이지' },
          { value: 'logout', label: '로그아웃' },
        ]
      : [
          { value: 'login', label: '로그인' },
          { value: 'join', label: '회원가입' },
        ]),
  ]

  const handleOptionChange = (value) => {
    setIsDropdownOpen(false)
    if (value === 'login') {
      navigate(ROUTER_PATHS.LOGIN_MAIN)
    } else if (value === 'join') {
      navigate(ROUTER_PATHS.JOIN)
    } else if (value === 'mypage') {
      navigate(ROUTER_PATHS.MY_PAGE)
    } else if (value === 'logout') {
      logout()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex w-full h-[70px] px-5 items-center justify-between'>
      <div
        onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
        className='flex text-2xl font-bold cursor-pointer text-main-pink font-logo'
      >
        bookjob
      </div>
      <div className='flex items-center text-base'>
        {isAuthenticated && user ? (
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className='flex items-center bg-[#F4F6FA] h-[30px] rounded-full px-4 font-bold'
            >
              <img src={babyChick} alt='babyChick' className='w-5 h-5 mr-2' />
              <span>{user.nickname}님</span>
              <img src={arrowDown} alt='arrowDown' className='w-4 h-4 ml-2' />
            </button>
            {isDropdownOpen && (
              <ul className='absolute top-[35px] right-3 bg-[#F4F6FA] border border-light-gray rounded-md shadow-md z-20'>
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => !option.disabled && handleOptionChange(option.value)}
                    className={`px-4 py-2 cursor-pointer rounded-md hover:bg-gray-200 ${
                      option.disabled ? 'text-dark-gray' : ''
                    }`}
                  >
                    {option.value === 'default' ? (
                      <div className='flex items-center'>
                        <img src={babyChick} alt='babyChick' className='w-5 h-5 mr-2' />
                        {option.label}
                      </div>
                    ) : (
                      option.label
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className='flex gap-5'>
            <button onClick={() => navigate(ROUTER_PATHS.LOGIN_MAIN)} className='font-bold'>
              로그인
            </button>
          </div>
        )}
        <button onClick={toggleSidebar}>
          <img src={mobileMenu} alt='mobileMenu' className='w-5 h-5 ml-4' />
        </button>
      </div>
      {isSidebarOpen && <MobileSidebar onClose={toggleSidebar} />}
    </div>
  )
}

MobileMainHeader.propTypes = {
  login: PropTypes.string,
}

export default MobileMainHeader
