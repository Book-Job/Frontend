const ROUTER_PATHS = {
  MAIN_PAGE: '/',
  LOGIN_MAIN: '/login-main', //메인 로그인
  LOGIN_KAKAO: '/login-kakao',
  LOGIN_NAVER: '/login-naver',
  JOIN: '/join',
  MEMBER_DATA_ENTRY: '/member-data-entry',
  JOB_MAIN: '/job',
  COMMUNITY: '/community',
  USER_POST: '/user-post',
  WRITE_COMMUNITY_POST: '/community/post',
  COMMUNITY_POST_DETAIL: '/community/post/:id',
  WRITE_RECRUITMENT_POST: '/job/recruitment/post',
  WRITE_JOB_SEARCH_POST: '/job/job-search/post',
  JOB_SEARCH_POST_EDIT: '/job/job-seek/edit/:id',
  JOB_SEARCH_POST_DETAIL: '/job/job-seek/post/:id',
  RECRUITMENT_POST_DETAIL: '/job/recruitment/post/:id',
  RECRUITMENT_POST_EDIT: '/job/recruitment/edit/:id',
  FIND_ID: '/find/id', // 아이디 찾기 페이지
  FIND_ID_COMPLETE_PAGE: '/find/id/complete-page',
  FIND_PW: '/find/pw', //비밀번호 찾기 페이지
  FIND_PW_CHECK_ID_PAGE: '/find/pw/check-id-page', //임시 비밀번호 발급받을 이메일 작성 페이지
  FIND_PW_CHANGE_PW: '/find/pw/change-pw', // 비밀번호 변경 페이지
  MY_PAGE: '/my-page', //마이페이지
  MY_EDIT_PROFILE: '/my-page/edit-profile', // 프로필 수정 페이지지
  MY_EDIT_PW: '/my-page/edit-password', //현재 사용중인 비밀번호 확인 페이지
  MY_PW_MIS: '/my-page/password-mis', // 비밀번호 오류 확인 페이지지
  MY_SCRAP: '/my-page/my-scrap', //내가 스크랩한 목록
  MY_POST: '/my-page/my-post', //내가 작성한 글 목록록
  MY_DRAFTS: '/my-page/my-drafts',
  ERROR: '/error',
  KAKAO_SUCCESS: '/login/kakao/success',
  NAVER_SUCCESS: '/login/naver/success',
}

export default ROUTER_PATHS
