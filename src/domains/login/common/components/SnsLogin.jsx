<<<<<<< HEAD
import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'

=======
import navericon from '../../../../assets/icons/common/naverIcon.svg'
import kakaoicon from '../../../../assets/icons/common/kakaoIcon.svg'
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
const SnsLogin = () => {
  return (
    <div className='mt-11'>
      <div className='flex items-center justify-center gap-5'>
        <hr className='w-1/3 border-1 border-dark-gray' />
        <span className='text-lg sm:text-2xl text-dark-gray font'>소셜 계정으로 간편 로그인</span>
        <hr className='w-1/3 border-1 border-dark-gray' />
      </div>
      <div className='flex justify-center gap-16 mt-9'>
<<<<<<< HEAD
        <NaverLogin />
        <KakaoLogin />
=======
        <button className='w-14 h-14 sm:w-20 sm:h-20'>
          <img src={navericon} />
        </button>
        <button className='w-14 h-14 sm:w-20 sm:h-20'>
          <img src={kakaoicon} />
        </button>
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
      </div>
    </div>
  )
}

export default SnsLogin
