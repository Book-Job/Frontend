import { useState } from 'react'
import PropTypes from 'prop-types'
import cancel from '../../assets/icons/common/common_cancel.svg'
import questionGray from '../../assets/icons/mobile/mobile_inquiry_gray.svg'
import questionPink from '../../assets/icons/mobile/mobile_inquiry_pink.svg'
import chatGray from '../../assets/icons/mobile/mobile_chat_gray.svg'
import chatPink from '../../assets/icons/mobile/mobile_chat_pink.svg'
import freeboardGray from '../../assets/icons/mobile/mobile_freeboard_gray.svg'
import freeboardPink from '../../assets/icons/mobile/mobile_freeboard_pink.svg'
import workGray from '../../assets/icons/mobile/mobile_work_gray.svg'
import workPink from '../../assets/icons/mobile/mobile_work_pink.svg'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'

const MobileSidebar = ({ onClose }) => {
  const [hoveredMenu, setHoveredMenu] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)

  const navigate = useNavigate()

  const menus = [
    {
      label: '자유게시판',
      icon: { active: freeboardPink, inactive: freeboardGray },
      path: ROUTER_PATHS.COMMUNITY,
    },
    {
      label: '구인 / 구직',
      icon: { active: workPink, inactive: workGray },
      path: ROUTER_PATHS.JOB_MAIN,
    },
    {
      label: '오픈채팅',
      icon: { active: chatPink, inactive: chatGray },
      path: ROUTER_PATHS.CHAT,
    },
    {
      label: '문의',
      icon: { active: questionPink, inactive: questionGray },
      path: ROUTER_PATHS.INQUIRY,
    },
  ]

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.label)
    navigate(menu.path)
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-20'>
      <div className='bg-white w-[250px] h-full absolute right-0 top-0 rounded-tl-2xl rounded-bl-2xl'>
        <button
          onClick={onClose}
          className='absolute top-6 left-6 text-xl text-gray-600 hover:text-main-pink transition-colors'
        >
          <img src={cancel} alt='닫기' />
        </button>
        <div className='flex flex-col gap-2 text-left p-6 mt-[97px]'>
          {menus.map((menu) => {
            const isActive = activeMenu === menu.label
            const isHovered = hoveredMenu === menu.label
            return (
              <div
                key={menu.label}
                onClick={() => handleMenuClick(menu)}
                onMouseEnter={() => setHoveredMenu(menu.label)}
                onMouseLeave={() => setHoveredMenu(null)}
                className={`
        px-6 -mx-6 h-[52px] flex items-center gap-x-2 text-lg font-semibold cursor-pointer 
        transition-all duration-300 ease-in-out
        ${isActive || isHovered ? 'bg-[rgba(253,236,249,0.43)] text-main-pink' : 'text-gray-800'}
        hover:bg-[rgba(253,236,249,0.43)] hover:text-main-pink
        w-full
      `}
              >
                <img
                  src={isActive || isHovered ? menu.icon.active : menu.icon.inactive}
                  alt={`${menu.label} 아이콘`}
                  className='w-[20px] h-[20px]'
                />
                <span>{menu.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

MobileSidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default MobileSidebar
