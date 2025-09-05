import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import babyChick from '../../assets/icons/common/common_babyChick.svg'
import mainLogo from '../../assets/icons/common/main_logo.gif'
import ROUTER_PATHS from '../../routes/RouterPath'
import useAuthStore from '../../store/login/useAuthStore'
import { useEffect, useRef, useState } from 'react'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import { HELP_DESK_URL } from '../../utils/urls'
import useModalStore from '../../store/modal/useModalStore'
const Header = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [hasShadow, setHasShadow] = useState(false)
  const { openModal } = useModalStore()

  useEffect(() => {
    const onScroll = () => {
      setHasShadow(window.scrollY > 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const options = [
    ...(isAuthenticated
      ? [
          { value: 'mypage', label: '내 정보' },
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
  const navButtons = [
    { label: '자유게시판', nav: ROUTER_PATHS.COMMUNITY },
    { label: '구인/구직', nav: ROUTER_PATHS.JOB_MAIN },
    { label: '오픈채팅', nav: null },
    {
      label: '문의',
      external: true,
      nav: HELP_DESK_URL,
    },
  ]

  const handleNavButtonClick = (nav, label) => {
    if (label === '오픈채팅') {
      openModal({
        title: '서비스 준비 중',
        description: '아직 준비 중인 서비스입니다.',
        buttonLabel: '확인',
        onButtonClick: () => useModalStore.getState().closeModal(),
      })
    } else if (nav) {
      navigate(nav)
    }
  }
  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 bg-white/65 flex h-auto md:h-[85px] items-center sm:justify-between xl:px-32 px-12 py-4 flex-row gap-4 backdrop-blur-lg
      ${hasShadow ? 'border-b border-gray-200 shadow-sm' : ''}
    `}
    >
      <div className='flex flex-row items-center gap-5 xl:gap-20 md:gap-10 '>
        <button type='button' onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}>
          <img src={mainLogo} alt='메인 로고' className='h-auto w-28 md:w-[140px]' />
        </button>
        <span className='flex gap-4 text-sm md:flex-row xl:gap-10 sm:text-base xl:text-lg'>
          {navButtons.map((item, index) =>
            item.external ? (
              <a
                key={index}
                href={item.nav}
                target='_blank'
                rel='noopener noreferrer'
                className='px-2 py-2 transition-colors rounded-md md:px-4 hover:text-hover-pink hover:font-bold'
              >
                {item.label}
              </a>
            ) : (
              <button
                key={index}
                onClick={() => handleNavButtonClick(item.nav, item.label)}
                className='px-2 py-2 transition-colors rounded-md md:px-4 hover:text-hover-pink hover:font-bold'
              >
                {item.label}
              </button>
            ),
          )}
        </span>
      </div>
      <div className='flex justify-end whitespace-nowrap'>
        {isAuthenticated && user ? (
          <div ref={dropdownRef} className='relative'>
            <button
              onClick={toggleDropdown}
              className='flex items-center bg-[#F4F6FA] justify-center text-sm md:text-base h-11 md:h-12 rounded-full px-5 font-bold'
            >
              <img
                src={babyChick}
                alt='babyChick'
                className='w-6 h-6 mr-3 md:w-7 md:h-7 hover:animate-move-left'
              />
              <span className='relative'>
                {user.nickname}님
                {isDropdownOpen && (
                  <ul className='absolute top-9 w-24 md:top-10 font-normal left-1/2 -translate-x-1/2 bg-[#F4F6FA] border border-light-gray rounded-md shadow-md z-20'>
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
              </span>
              <img src={arrowDown} alt='arrowDown' className='w-4 h-4 ml-3' />
            </button>
          </div>
        ) : (
          <span className='flex gap-8 text-sm sm:text-base md:text-sm xl:text-lg'>
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
