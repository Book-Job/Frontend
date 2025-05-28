import kakaoicon from '../../../../assets/icons/common/kakaoIcon.svg'

const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY

  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL

  if (!KAKAO_REST_API_KEY || !REDIRECT_URI) {
    console.error('카카오 로그인에 필요한 환경변수가 설정되지 않았습니다.')
    return null
  }

  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${encodeURIComponent(KAKAO_REST_API_KEY)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`
  
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  return (
    <div>
      <button onClick={handleKakaoLogin} className='w-14 h-14 sm:w-20 sm:h-20'>
        <img src={kakaoicon} alt='Kakao Login' />
      </button>
    </div>
  )
}

export default KakaoLogin
