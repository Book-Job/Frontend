import BannerImage from '../../assets/banner/pwa_banner.jpg'

const Banner = () => {
  return (
    <div className='block cursor-pointer overflow-hidden' aria-label='설문조사 폼으로 이동'>
      <img
        src={BannerImage}
        alt='설문조사 참여 안내 배너'
        className='w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105'
      />
    </div>
  )
}

export default Banner
