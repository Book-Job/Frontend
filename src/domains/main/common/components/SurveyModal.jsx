import { CUSTOMER_INQUIRY } from '../../../../utils/urls'
import app_banner from '../../../../assets/banner/app_banner.png'
import web_banner from '../../../../assets/banner/web_banner.png'
import useIsMobile from '../../../../hooks/header/useIsMobile'

export default function SurveyModal({ isOpen, onClose, onDoNotShowToday }) {
  const isMobile = useIsMobile()

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='relative w-[90%] max-w-md'>
        <a href={CUSTOMER_INQUIRY} target='_blank' rel='noopener noreferrer'>
          <img
            src={isMobile ? app_banner : web_banner}
            alt='설문조사 배너'
            className='w-full rounded-xl shadow-xl object-cover'
          />
        </a>
        <button
          onClick={onClose}
          className='
          absolute top-2 right-2 
          bg-black/50 
          rounded-full 
          p-2         
          text-white   
          leading-none  
          flex items-center justify-center
          hover:bg-opacity-70
          w-8 h-8      
        '
          aria-label='닫기'
        >
          ✕
        </button>
        <button
          onClick={onDoNotShowToday}
          className='absolute bottom-2 right-2 text-sm bg-white/80 px-2 py-1 rounded hover:bg-white'
        >
          오늘 하루 보지 않기
        </button>
      </div>
    </div>
  )
}
