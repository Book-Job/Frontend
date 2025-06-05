// import { useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { authApi } from '../../../services/api/axios'
// import ROUTER_PATHS from '../../../routes/RouterPath'

// const KakaoRedirectHandler = () => {
//   const location = useLocation()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search)
//     const code = queryParams.get('code')

//     if (code) {
//       authApi
//         .post('/auth/kakao', { code })
//         .then((response) => {
//           if (response.data.success) {
//             const { email, nickname, loginId, accessToken } = response.data
//             localStorage.setItem('accessToken', accessToken)
//             localStorage.setItem('email', email)
//             localStorage.setItem('nickname', nickname)
//             localStorage.setItem('loginId', loginId)
//             navigate(`${ROUTER_PATHS.KAKAO_SUCCESS}?message=success`)
//           } else {
//             navigate(
//               `${ROUTER_PATHS.KAKAO_SUCCESS}?message=error&error=${response.data.error || 'unknown'}`,
//             )
//           }
//         })
//         .catch((error) => {
//           console.error('카카오 인증 오류:', error)
//           navigate(`${ROUTER_PATHS.KAKAO_SUCCESS}?message=error&error=server_error`)
//         })
//     } else {
//       navigate(`${ROUTER_PATHS.KAKAO_SUCCESS}?message=error&error=code_missing`)
//     }
//   }, [navigate])

//   return <div>카카오 인증 처리 중...</div>
// }

// export default KakaoRedirectHandler
