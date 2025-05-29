import kakaoicon from '../../../../assets/icons/common/kakaoIcon.svg'

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'http://43.200.107.80:8080/oauth2/authorization/kakao'
  }

  return (
    <div>
      <button
        onClick={handleKakaoLogin}
        className='transition-transform duration-200 rounded-full hover:scale-110 w-14 h-14 sm:w-20 sm:h-20'
      >
        <img src={kakaoicon} alt='Kakao Login' />
      </button>
    </div>
  )
}

export default KakaoLogin
