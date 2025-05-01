import PropTypes from 'prop-types'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import babyChick from '../../assets/icons/common/common_babyChick.svg'
import mobileMenu from '../../assets/icons/mobile/mobile_menu.svg'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import { useState } from 'react'
import MobileSidebar from './MobileSidebar'
import useAuthStore from '../../store/login/useAuthStore'

const MobileMainHeader = ({ login }) => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleUserClick = () => {
    logout()
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
          <button
            onClick={toggleSidebar}
            className='inline-flex bg-[#F4F6FA] h-[30px] rounded-full items-center px-4'
          >
            <img src={babyChick} alt='arrowDown' className='w-5 h-5 mr-4' />
            <span className='font-bold '>{user.sub}님</span>
            <img src={arrowDown} alt='arrowDown' className='w-3 h-3 ml-2' />
          </button>
        ) : (
          <div className='flex gap-5'>
            <button onClick={() => navigate(ROUTER_PATHS.LOGIN_MAIN)} className='font-bold row'>
              로그인
            </button>
            <button onClick={toggleSidebar}>
              <img src={mobileMenu} alt='mobileMenu' className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>

      {isSidebarOpen && <MobileSidebar onClose={toggleSidebar} />}
    </div>
  )
}

MobileMainHeader.propTypes = {
  login: PropTypes.string.isRequired,
}

export default MobileMainHeader
