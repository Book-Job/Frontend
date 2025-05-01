import { useNavigate } from 'react-router-dom'
import Button from './Button'

const Alert = ({ isOpen, onClose, title, description, buttonLabel, onButtonClick }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick(navigate) // navigate를 전달하여 라우팅 처리 가능
    }
    onClose() // 버튼 클릭 시 모달 닫기
  }
  return (
    <div className='fixed z-50 flex items-center justify-center inset-1'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
      <div className='relative sm:w-full sm:max-w-xl  sm:py-20 py-10 px-4 mx-4 bg-white rounded-[5px] shadow-lg'>
        <h2 className='mb-4 text-2xl font-bold text-center sm:text-4xl sm:mb-10'>{title}</h2>
        <p className='sm:mb-10 mb-4 sm:text-[20px] text-base text-center text-dark-gray'>{description}</p>
        <Button
          label={buttonLabel}
          onClick={handleButtonClick}
          size='semiMedium'
          bgColor='main-pink'
          className='hover:bg-pink-600'
        ></Button>
      </div>
    </div>
  )
}

export default Alert
