import WebBanner from '../../assets/banner/pwa_banner.jpg'
import useIsMobile from '../../hooks/header/useIsMobile'
import MobileBanner from '../../assets/banner/pwa_app_banner.jpg'
const Banner = ({ className = '' }) => {
  const isMobile = useIsMobile()
  return (
    <div
      className={`block cursor-pointer overflow-hidden ${className}`}
      aria-label='설문조사 폼으로 이동'
    >
      <img
        src={isMobile ? MobileBanner : WebBanner}
        alt='설문조사 참여 안내 배너'
        className='w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105'
      />
    </div>
  )
}

export default Banner
