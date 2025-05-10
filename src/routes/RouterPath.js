const ROUTER_PATHS = {
  MAIN_PAGE: '/',
  LOGIN_MAIN: '/login-main',
  JOIN: '/join',
  MEMBER_DATA_ENTRY: '/member-data-entry',
  JOB_MAIN: '/job',
  COMMUNITY: '/community',
  USER_POST: '/user-post',
  WRITE_COMMUNITY_POST: '/community/post', //자유게시판 글 작성
  COMMUNITY_POST_DETAIL: '/community/post/:id', //자유게시판 글 작성 상세페이지
  WRITE_RECRUITMENT_POST: '/job/recruitment/post', //구인 글 작성
  WRITE_JOB_SEARCH_POST: '/job/job-search/post', //구직 글 작성
  JOB_SEARCH_POST_DETAIL: '/job/job-search/post/:id', //구직 글 상세 조회
  RECRUITMENT_POST_DETAIL: '//job/recruitment/post/:id', //구인 글 상세 조회
  FIND_ID: '/find/id',
  FIND_ID_COMPLETE_PAGE: '/find/id/complete-page',
  FIND_PW: '/find/pW',
  FIND_PW_CHECK_ID_PAGE: '/find/pw/check-id-page',
  FIND_PW_CHANGE_PW: '/find/pw/change-pw',
  MY_PAGE: '/my-page',
  MY_EDIT_PROFILE: '/my-page/edit-profile',
  MY_EDIT_PW: '/my-page/edit-password',
  MY_PW_MIS: '/my-page/password-mis',
  MY_SCRAP: '/my-page/my-scrap',
  MY_POST: '/my-page/my-post',
  MY_DRAFTS: '/my-page/my-drafts',
  ERROR: '/error',
}

export default ROUTER_PATHS
