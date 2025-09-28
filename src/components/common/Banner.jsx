import WebBanner from '../../assets/banner/pwa_banner.jpg'
import PrizeBanner from '../../assets/banner/prize_banner.jpg'
import PrizeBannerApp from '../../assets/banner/prize_banner_app.jpg'
import WebCoffeeBanner from '../../assets/banner/coffee_event_banner.gif'
import useIsMobile from '../../hooks/header/useIsMobile'
import MobileBanner from '../../assets/banner/pwa_app_banner.jpg'
import MobileCoffeeBanner from '../../assets/banner/coffee_event_app_banner.gif'
import ROUTER_PATHS from '../../routes/RouterPath'
import useWriteModalStore from '../../store/modal/useWriteModalStore'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState } from 'react'

const Banner = ({ className = '' }) => {
  const { setShowModal } = useWriteModalStore()
  const handleCreatePostClick = () => setShowModal(true)
  const isMobile = useIsMobile()
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-out',
    adaptiveHeight: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    appendDots: (dots) => (
      <div style={{ bottom: '10px' }}>
        <ul style={{ margin: '0px', display: 'flex', justifyContent: 'center' }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: i === currentSlide ? '#ec4899' : '#ccc',
          margin: '0 5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      />
    ),
  }

  return (
    <div
      className={`block cursor-pointer overflow-hidden relative ${className}`}
      aria-label='pwa 설명 페이지로 이동하는 배너'
    >
      <Slider {...settings}>
        <button className='w-full' onClick={handleCreatePostClick}>
          <img
            src={isMobile ? MobileCoffeeBanner : WebCoffeeBanner}
            alt='커피 이벤트 배너'
            className='w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105'
          />
        </button>
        <a
          href={ROUTER_PATHS.INSTALL_METHOD}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full'
        >
          <img
            src={isMobile ? MobileBanner : WebBanner}
            alt='pwa 설명 페이지로 이동하는 배너'
            className='w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105'
          />
        </a>
        <img
          src={isMobile ? PrizeBannerApp : PrizeBanner}
          alt='이벤트 당첨 배너'
          className='w-full h-auto'
        />
      </Slider>
    </div>
  )
}

export default Banner
