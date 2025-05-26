import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import babyChick from '../../assets/icons/common/common_babyChick.svg'
import ROUTER_PATHS from '../../routes/RouterPath'
import useAuthStore from '../../store/login/useAuthStore'
import { useEffect, useRef, useState } from 'react'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'

const Header = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  // 드롭다운 옵션
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

  // 드롭다운 선택 핸들러
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
  // 드롭다운 외부 클릭 시 닫기
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
  const navButtons = [
    { label: '자유게시판', nav: `${ROUTER_PATHS.COMMUNITY}` },
    { label: '구인/구직', nav: `${ROUTER_PATHS.JOB_MAIN}` },
    { label: '오픈채팅', nav: `${ROUTER_PATHS.MAIN_PAGE}` },
    { label: '문의', nav: `${ROUTER_PATHS.MAIN_PAGE}` },
  ]
  return (
    <header className=' w-full bg-white flex h-auto md:h-[100px] items-center sm:justify-between sm:px-10 px-1 xl:px-32 py-4 md:py-0 flex-col md:flex-row gap-4 '>
      <div className='flex flex-col items-center gap-5 xl:gap-20 md:gap-10 md:flex-row '>
        <span
          onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
          className='text-main-pink text-2xl md:text-[35px] font-logo cursor-pointer'
        >
          bookjob
        </span>
        <span className='flex gap-6 sm:gap-10 sm:text-[18px] text-[15px] sm:flex '>
          {navButtons.map((item, index) => (
            <button key={index} onClick={() => navigate(item.nav)} value={item.value}>
              {item.label}
            </button>
          ))}
        </span>
      </div>
      <div className='flex justify-end'>
        {isAuthenticated && user ? (
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className='flex items-center bg-[#F4F6FA] text-sm md:text-[16px] h-[44px] md:h-[52px] rounded-full px-6 font-bold'
            >
              <img src={babyChick} alt='babyChick' className='w-6 h-6 mr-3 md:w-7 md:h-7' />
              <span>{user.nickname}님</span>
              <img src={arrowDown} alt='arrowDown' className='w-4 h-4 ml-3' />
            </button>
            {isDropdownOpen && (
              <ul className='absolute top-14 right-4 bg-[#F4F6FA] border border-light-gray rounded-md shadow-md z-20'>
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => !option.disabled && handleOptionChange(option.value)}
                    className='px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200'
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
          <span className='flex gap-8 text-[15px]'>
            <button
              onClick={() => navigate(ROUTER_PATHS.LOGIN_MAIN)}
              className='font-bold row text-main-pink'
            >
              로그인
            </button>
            <button onClick={() => navigate(ROUTER_PATHS.JOIN)}>회원가입</button>
          </span>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  onClick: PropTypes.func,
}

export default Header
