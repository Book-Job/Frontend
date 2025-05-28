<<<<<<< HEAD
const BannerExample = () => {
  return <div className='w-full h-[314px] bg-light-gray'></div>
=======
import BannerImage from '../../assets/banner/web/web_Banner.png'
const BannerExample = () => {
  return (
    <div className='block cursor-pointer' aria-label='설문조사 폼으로 이동'>
      <img src={BannerImage} alt='설문조사 참여 안내 배너' />
    </div>
  )
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
}

export default BannerExample
