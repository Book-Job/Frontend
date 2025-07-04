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
import useModalStore from '../../store/modal/useModalStore'
import { HELP_DESK_URL } from '../../utils/urls'

const MobileSidebar = ({ onClose }) => {
  const [hoveredMenu, setHoveredMenu] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)
  const { openModal } = useModalStore()

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
      external: true,
      href: HELP_DESK_URL,
    },
  ]
  const handleMenuClick = (menu) => {
    setActiveMenu(menu.label)

    if (menu.label === '오픈채팅') {
      openModal({
        title: '서비스 준비 중',
        description: '아직 준비 중인 서비스입니다.',
        buttonLabel: '확인',
        onButtonClick: () => useModalStore.getState().closeModal(),
      })
      onClose()
      return
    }

    navigate(menu.path)
    onClose()
  }
  return (
    <div className='fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm'>
      <div className='bg-white w-[250px] h-full absolute right-0 top-0 rounded-tl-2xl rounded-bl-2xl'>
        <button
          onClick={onClose}
          className='absolute text-xl text-gray-600 transition-colors top-6 left-6 hover:text-main-pink'
        >
          <img src={cancel} alt='닫기' className='w-3 h-3' />
        </button>
        <div className='flex flex-col gap-2 text-left mt-[97px]'>
          {menus.map((menu) => {
            const isActive = activeMenu === menu.label
            const isHovered = hoveredMenu === menu.label

            const classNames = `
              group flex items-center gap-4 p-3 rounded-md cursor-pointer transition-all duration-300
              ${isHovered || isActive ? 'bg-[rgba(253,236,249,0.43)] text-main-pink' : 'text-gray-800'}
              hover:bg-[rgba(253,236,249,0.43)] hover:text-main-pink
            `

            const iconSrc = isHovered || isActive ? menu.icon.active : menu.icon.inactive

            if (menu.external) {
              return (
                <a
                  key={menu.label}
                  href={menu.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  onMouseEnter={() => setHoveredMenu(menu.label)}
                  onMouseLeave={() => setHoveredMenu(null)}
                  className={classNames}
                  onClick={onClose}
                >
                  <img
                    src={iconSrc}
                    alt={`${menu.label} 아이콘`}
                    className='w-[20px] h-[20px] ml-3'
                  />
                  <span>{menu.label}</span>
                </a>
              )
            }

            return (
              <div
                key={menu.label}
                onClick={() => handleMenuClick(menu)}
                onMouseEnter={() => setHoveredMenu(menu.label)}
                onMouseLeave={() => setHoveredMenu(null)}
                className={classNames}
              >
                <img
                  src={iconSrc}
                  alt={`${menu.label} 아이콘`}
                  className='w-[20px] h-[20px] ml-3'
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
