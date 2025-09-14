import PropTypes from 'prop-types'
import useIsMobile from '../../../../../hooks/header/useIsMobile'

export default function EventModal({
  isOpen,
  onClose,
  onDoNotShowToday,
  image,
  mobileImage,
  link,
  alt = '모달 배너',
  doNotShowText = '오늘 하루 보지 않기',
  onClick,
  children,
}) {
  const isMobile = useIsMobile()

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative w-[90%] max-w-md'>
        {link ? (
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <img
              src={isMobile && mobileImage ? mobileImage : image}
              alt={alt}
              className='object-cover w-full shadow-xl rounded-xl'
            />
          </a>
        ) : (
          <img
            src={isMobile && mobileImage ? mobileImage : image}
            alt={alt}
            className='object-cover w-full shadow-xl rounded-xl'
            onClick={onClick}
          />
        )}
        {children}
        <button
          onClick={onClose}
          className='absolute flex items-center justify-center w-8 h-8 p-2 leading-none text-white rounded-full top-2 right-2 bg-black/50 hover:bg-opacity-70'
          aria-label='닫기'
        >
          ✕
        </button>
        {onDoNotShowToday && (
          <button
            onClick={onDoNotShowToday}
            className='absolute px-2 py-1 text-sm rounded bottom-2 right-2 bg-white/80 hover:bg-white'
          >
            {doNotShowText}
          </button>
        )}
      </div>
    </div>
  )
}

EventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDoNotShowToday: PropTypes.func,
  image: PropTypes.string.isRequired,
  mobileImage: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  alt: PropTypes.string,
  doNotShowText: PropTypes.string,
  children: PropTypes.node,
}
