import kakaoicon_s from '../../../../assets/icons/common/kakaoIcon_s.svg'

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'https://api.bookjob.co.kr/oauth2/authorization/kakao'
  }

  return (
    <div className='w-full max-w-[532px] h-[58px] '>
      <button onClick={handleKakaoLogin} className='bg-[#fee500] gap-8 w-full h-full rounded-[5px] flex justify-center h-full rounded-[5px] justify-center items-center flex flex-row'>
        <img src={kakaoicon_s} alt='카카오 로그인' className='h-1/3' />
        <span className='text-[#000000]/85 text-xl'>카카오 로그인</span>
      </button>
    </div>
  )
}

export default KakaoLogin
