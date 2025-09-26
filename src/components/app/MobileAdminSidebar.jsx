import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import AdminSideBarContent from '../../domains/admin/common/components/AdminSideBarContent'
import { FiMenu } from 'react-icons/fi'
const MobileAdminSidebar = ({ onGoHome, onClose, setHoveredMenu, setActiveMenu }) => {
  const navigate = useNavigate()

  const adminMenus = [
    {
      label: '전체 메뉴',
      icon: <FiMenu />,
    },
  ]
  const handleMenuClick = (menu) => {
    setActiveMenu(menu.label)

    if (menu.label === '전체 메뉴') {
      onGoHome()
      return
    }

    navigate(menu.path)
    onClose()
  }
  return (
    <div className='flex flex-col gap-2 text-left mt-[50px]'>
      {adminMenus.map((menu) => {
        const classNames = `
                group flex items-center gap-4 p-3 rounded-md cursor-pointer transition-all duration-300
                text-gray-800 hover:bg-[#fdecf96d] hover:text-main-pink 
              `

        return (
          <div
            key={menu.label}
            onClick={() => handleMenuClick(menu)}
            onMouseEnter={() => setHoveredMenu(menu.label)}
            onMouseLeave={() => setHoveredMenu(null)}
            className={classNames}
          >
            <div className=' flex w-[20px] h-[20px] ml-3 items-center justify-center text-xl'>
              {menu.icon}
            </div>
            <span>{menu.label}</span>
          </div>
        )
      })}
      <div className='px-6'>
        <AdminSideBarContent />
      </div>
    </div>
  )
}

MobileAdminSidebar.propTypes = {
  onGoHome: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  hoveredMenu: PropTypes.string,
  setHoveredMenu: PropTypes.func.isRequired,
  activeMenu: PropTypes.string,
  setActiveMenu: PropTypes.func.isRequired,
}

export default MobileAdminSidebar
