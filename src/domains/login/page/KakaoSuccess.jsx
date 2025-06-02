import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ToastService from '../../../utils/toastService'

const KakaoSuccess = () => {
  // const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // URL 쿼리 파라미터 파싱
  //   const queryParams = new URLSearchParams(location.search);

  //   // 데이터 추출
  //   const message = queryParams.get('message');
  //   const dataParam = queryParams.get('data'); // URL 인코딩된 JSON 문자열

  //   if (message === 'success' && dataParam) {
  //     try {
  //       // data를 JSON으로 파싱 (URL 디코딩 필요)
  //       const data = JSON.parse(decodeURIComponent(dataParam));

  //       // 데이터 사용 (예: 로컬 스토리지에 저장)
  //       const { email, nickname, loginId } = data;
  //       localStorage.setItem('loginId', loginId);
  //       localStorage.setItem('email', email);
  //       localStorage.setItem('nickname', nickname);

  //       // 성공 메시지 및 리디렉션
  //       ToastService.success('카카오 로그인 성공!');
  //       navigate('/'); // 메인 페이지로 이동
  //     } catch (error) {
  //       console.error('데이터 파싱 오류:', error);
  //       ToastService.error('로그인 데이터 처리 중 오류가 발생했습니다.');
  //       navigate('/login-main');
  //     }
  //   } else if (message === 'error' || !message) {
  //     const errorMsg = queryParams.get('error') || '알 수 없는 오류';
  //     console.error('로그인 실패:', errorMsg);
  //     ToastService.error(`로그인 실패: ${errorMsg}`);
  //     navigate('/login-main');
  //   }
  // }, [location, navigate]);

  return <div>카카오 로그인 처리 중...</div>
}

export default KakaoSuccess
