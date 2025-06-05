import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ToastService from '../../../utils/toastService'
import { authApi } from '../../../services/api/axios'

const KakaoSuccess = () => {
  // const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      // const queryParams = new URLSearchParams(location.search)
      // const message = queryParams.get('message')
      console.log('카카오 실행')
      try {
        // 백엔드에서 사용자 정보 요청 (JSESSIONID 기반)
        const response = await authApi.get('/auth/me')
        if (response.data.success) {
          const { email, nickname, loginId } = response.data
          localStorage.setItem('email', email)
          localStorage.setItem('nickname', nickname)
          localStorage.setItem('loginId', loginId)
          ToastService.success('카카오 로그인 성공!')
          console.log('이메일:', email)
          console.log('nickname:', nickname)
          console.log('loginId:', loginId)

          navigate('/')
        } else {
          throw new Error(response.data.error || '사용자 정보 요청 실패')
        }
      } catch (error) {
        console.error('사용자 정보 요청 오류:', error)
        // 쿼리 파라미터로 백업 로직
        // if (message === 'success') {
        //   const dataParam = queryParams.get('data')
        //   if (dataParam) {
        //     try {
        //       const data = JSON.parse(decodeURIComponent(dataParam))
        //       const { email, nickname, loginId } = data
        //       localStorage.setItem('loginId', loginId)
        //       localStorage.setItem('email', email)
        //       localStorage.setItem('nickname', nickname)
        //       ToastService.success('카카오 로그인 성공!')
        //       navigate('/')
        //     } catch (parseError) {
        //       console.error('데이터 파싱 오류:', parseError)
        //       ToastService.error('로그인 데이터 처리 중 오류가 발생했습니다.')
        //       navigate('/login-main')
        //     }
        //   } else {
        //     const errorMsg = queryParams.get('error') || '알 수 없는 오류'
        //     ToastService.error(`로그인 실패22: ${errorMsg}`)
        //     navigate('/login-main')
        //   }
        // } else {
        //   const errorMsg = queryParams.get('error') || '알 수 없는 오류'
        //   ToastService.error(`로그인 실패22: ${errorMsg}`)
        //   navigate('/login-main')
        // }
      }
    }

    fetchUserData()
  }, [location, navigate])

  // 쿼리 이용용
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search)
  //   const message = queryParams.get('message')
  //   const dataParam = queryParams.get('data')

  //   if (message === 'success' && dataParam) {
  //     try {
  //       const data = JSON.parse(decodeURIComponent(dataParam))
  //       const { email, nickname, loginId } = data
  //       localStorage.setItem('loginId', loginId)
  //       localStorage.setItem('email', email)
  //       localStorage.setItem('nickname', nickname)
  //       ToastService.success('카카오 로그인 성공!')
  //       navigate('/')
  //     } catch (error) {
  //       console.error('데이터 파싱 오류:', error)
  //       ToastService.error('로그인 데이터 처리 중 오류가 발생했습니다.')
  //       navigate('/login-main')
  //     }
  //   } else if (message === 'error' || !message) {
  //     const errorMsg = queryParams.get('error') || '알 수 없는 오류'
  //     console.error('로그인 실패22:', errorMsg)
  //     ToastService.error(`로그인 실패ww: ${errorMsg}`)
  //     navigate('/login-main')
  //   }
  // }, [location, navigate])
  return <div>카카오 로그인 처리 중...</div>
}

export default KakaoSuccess
