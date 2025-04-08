import navericon from '../../../../assets/icons/common/naverIcon.svg'
import kakaoicon from '../../../../assets/icons/common/kakaoIcon.svg'
const SnsLogin = () => {
  return (
    <div className='mt-11'>
      <div className='flex items-center justify-center gap-5'>
        <hr className='w-1/3 border-1 border-gray-8e8e8e' />
        <span className='text-2xl text-gray-8e8e8e font'>소셜 계정으로 간편 로그인</span>
        <hr className='w-1/3 border-1 border-gray-8e8e8e' />
      </div>
      <div className='flex justify-center gap-12 mt-9'>
        <button className='w-20 h-20'>
          <img src={navericon} />
        </button>
        <button className='w-20 h-20'>
          <img src={kakaoicon} />
        </button>
      </div>
    </div>
  )
}

export default SnsLogin
