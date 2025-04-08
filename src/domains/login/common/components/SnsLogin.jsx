import navericon from '../../../../assets/icons/common/naverIcon.svg'
import kakaoicon from '../../../../assets/icons/common/kakaoIcon.svg'
const SnsLogin = () => {
  return (
    <div className='mt-11'>
      <div className='flex items-center justify-center gap-5'>
        <hr className='w-1/3 border-1 border-dark-gray' />
        <span className='text-2xl text-dark-gray font'>소셜 계정으로 간편 로그인</span>
        <hr className='w-1/3 border-1 border-dark-gray' />
      </div>
      <div className='flex justify-center gap-12 mt-9'>
        <button>
          <img src={navericon} />
        </button>
        <button>
          <img src={kakaoicon} />
        </button>
      </div>
    </div>
  )
}

export default SnsLogin
