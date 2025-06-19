import kakaoicon_lg from '../../../../assets/icons/common/kakaoIcon_lg.png'

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'https://api.bookjob.co.kr/oauth2/authorization/kakao'
  }

  return (
    <div className='bg-[#fee500] max-w-[532px] h-[58px] rounded-[5px] flex justify-center'>
      <button onClick={handleKakaoLogin} className=''>
        <img src={kakaoicon_lg} alt='카카오 로그인' className='h-[58px]' />
      </button>
    </div>
  )
}

export default KakaoLogin
