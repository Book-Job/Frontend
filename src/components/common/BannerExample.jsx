import BannerImage from '../../assets/banner/web/web_Banner.png'
const BannerExample = () => {
  return (
    <div className='block cursor-pointer' aria-label='설문조사 폼으로 이동'>
      <img src={BannerImage} alt='설문조사 참여 안내 배너' className='w-full h-auto' />
    </div>
  )
}

export default BannerExample
