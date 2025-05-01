import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import babyChick from '../../assets/icons/common/common_babyChick.svg'
import ROUTER_PATHS from '../../routes/RouterPath'
import useAuthStore from '../../store/login/useAuthStore'
import { useState } from 'react'

const Header = ({ login, onClick }) => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  console.log('user:', user)

  const handleUserClick = () => {
    if (onClick) {
      onClick()
    } else {
      // 기본적으로 로그아웃 처리
      logout()
    }
  }

  const [selectedOption, setSelectedOption] = useState('default')
  // 드롭다운 옵션
  const options = [
    ...(isAuthenticated && user
      ? [{ value: 'default', label: `${user.sub}님`, disabled: true }]
      : []),
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
    setSelectedOption(value)
    if (value === 'login') {
      navigate(ROUTER_PATHS.LOGIN_MAIN)
    } else if (value === 'join') {
      navigate(ROUTER_PATHS.JOIN)
    } else if (value === 'mypage') {
      navigate(ROUTER_PATHS.MY_PAGE)
    } else if (value === 'logout') {
      logout()
    }
    setSelectedOption('default')
  }
  const Bt = [
    { label: '자유게시판', nav: `${ROUTER_PATHS.COMMUNITY}` },
    { label: '구인/구직', nav: `${ROUTER_PATHS.JOB_MAIN}` },
    { label: '오픈채팅', nav: `${ROUTER_PATHS.MAIN_PAGE}` },
    { label: '문의', nav: `${ROUTER_PATHS.MAIN_PAGE}` },
  ]
  return (
    <header className='fixed top-0 left-0 z-50 w-full bg-white flex h-auto md:h-[100px] items-center justify-between px-6 md:px-32 py-4 md:py-0 flex-col md:flex-row gap-4 md:gap-0'>
      <div className='flex flex-col items-center gap-4 md:flex-row md:gap-20'>
        <span
          onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
          className='text-main-pink text-2xl md:text-[35px] font-logo cursor-pointer'
        >
          bookjob
        </span>
        <span className='inline-flex gap-6 sm:gap-10 sm:text-[18px] text-[15px]  sm:flex '>
          {/* <button onClick={() => navigate(ROUTER_PATHS.COMMUNITY)}>자유게시판</button>
          <button onClick={() => navigate(ROUTER_PATHS.JOB_MAIN)}>구인/구직</button>
          <button onClick={onClick}>오픈채팅</button>
          <button onClick={onClick}>문의</button> */}
          {Bt.map((item) => (
            <button key={item.value} onClick={() => navigate(item.nav)} value={item.value}>
              {item.label}
            </button>
          ))}
        </span>
      </div>
      <div className='flex items-center'>
        {/* {isAuthenticated && user && (
          <div className='inline-flex bg-[#F4F6FA] text-sm md:text-[16px] h-[44px] md:h-[52px] rounded-full items-center px-6 md:px-8'>
            <img src={babyChick} alt='babyChick' className='w-6 h-6 mr-2 md:mr-4 md:w-7 md:h-7' />
            <span className='font-bold text-sm md:text-[16px]'>{user.sub}님</span>
          </div>
        )}
        <select
          value={selectedOption}
          onChange={(e) => handleOptionChange(e.target.value)}
          className='inline-flex bg-[#F4F6FA] text-sm md:text-[16px] h-[44px] md:h-[52px] rounded-full items-center px-6 md:px-8'
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}
      </div>
      {isAuthenticated && user ? (
        <button
          onClick={onClick}
          className='inline-flex bg-[#F4F6FA] text-sm md:text-[16px] h-[44px] md:h-[52px] rounded-full items-center px-6 sm:px-8'
        >
          <img src={babyChick} alt='babyChick' className='w-6 h-6 mr-2 md:mr-4 md:w-7 md:h-7' />
          <select
            value={selectedOption}
            onChange={(e) => handleOptionChange(e.target.value)}
            className='font-bold inline-flex bg-[#F4F6FA] items-center  h-[44px] md:h-[52px] px-2 md:px-3'
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* <span className='font-bold'>{user.sub}님</span> */}
          {/* <img src={arrowDown} alt='arrowDown' className='w-4 h-4 ml-2 md:w-5 md:h-5 md:ml-3' /> */}
        </button>
      ) : (
        <span className='flex mr-[128px] gap-8 text-[15px]'>
          <button
            onClick={() => navigate(ROUTER_PATHS.LOGIN_MAIN)}
            className='font-bold row text-main-pink'
          >
            로그인
          </button>
          <button onClick={() => navigate(ROUTER_PATHS.JOIN)}>회원가입</button>
        </span>
      )}
    </header>
  )
}

Header.propTypes = {
  login: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Header
