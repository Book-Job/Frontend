import PropTypes from 'prop-types'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import babyChick from '../../assets/icons/common/common_babyChick.svg'
import mobileMenu from '../../assets/icons/mobile/mobile_menu.svg'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import { useState } from 'react'
import MobileSidebar from './MobileSidebar'
import useAuthStore from '../../store/login/useAuthStore'

const MobileMainHeader = () => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const { isAuthenticated, user, logout } = useAuthStore()
  const [selectedOption, setSelectedOption] = useState('default')

  // 드롭다운 옵션
  const options = [
    ...(isAuthenticated && user
      ? [{ value: 'default', label: `${user.nickname}님`, disabled: false }]
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
  return (
    <div className='flex w-full h-[50px] px-5 items-center justify-between'>
      <div
        onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
        className='flex text-2xl font-bold text-main-pink font-logo'
      >
        bookjob
      </div>
      <div className='flex text-base'>
        {isAuthenticated && user ? (
          <button className='inline-flex bg-[#F4F6FA] h-[30px] rounded-full items-center px-4'>
            <img src={babyChick} alt='babyChick' className='w-5 h-5' />
            <select
              value={selectedOption}
              onChange={(e) => handleOptionChange(e.target.value)}
              className='font-bold inline-flex bg-[#F4F6FA] items-center rounded-full h-[30px] px-2  outline-none'
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </button>
        ) : (
          <div className='flex gap-5'>
            <button onClick={() => navigate(ROUTER_PATHS.LOGIN_MAIN)} className='font-bold row'>
              로그인
            </button>
          </div>
        )}
        <button onClick={toggleSidebar}>
          <img src={mobileMenu} alt='mobileMenu' className='w-5 h-5 ml-4 ' />
        </button>
      </div>
      {isSidebarOpen && <MobileSidebar onClose={toggleSidebar} />}
    </div>
  )
}

MobileMainHeader.propTypes = {
  login: PropTypes.string.isRequired,
}

export default MobileMainHeader