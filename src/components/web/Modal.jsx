import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import cancelIcon from '../../assets/icons/common/common_cancel.svg'
import useModalStore from '../../store/modal/useModalStore'

const Modal = () => {
  const navigate = useNavigate()

  const { isOpen, title, description, buttonLabel, onButtonClick, closeModal } = useModalStore()

  if (!isOpen) return null

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick()
    }
    closeModal()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='relative w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-xl animate-fadeIn'>
        <button
          onClick={() => {
            closeModal()
            navigate(ROUTER_PATHS.MAIN_PAGE)
          }}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
        >
          <img src={cancelIcon} alt='닫는 아이콘' />
        </button>
        <h2 className='mb-3 text-xl font-semibold text-center text-gray-900'>{title}</h2>
        <p className='mb-6 text-sm text-center text-gray-600 whitespace-pre-line'>{description}</p>
        <button
          onClick={handleButtonClick}
          className='w-full py-3 rounded-xl bg-pink-500 text-white font-semibold text-sm shadow-md hover:bg-pink-600 active:scale-95 transition-all duration-200'
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default Modal
