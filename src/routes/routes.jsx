import ROUTER_PATHS from './RouterPath'
import JobMainPage from '../domains/job/main/page/JobMainPage'
import CommunityMainPage from '../domains/community/main/page/CommunityMainPage'
import WriteCommunityPostPage from '../domains/community/write/page/WriteCommunityPostPage'
import WriteRecruitmentPostPage from '../domains/job/recruitment/write/page/WriteRecruitmentPostPage'
import WriteJobSearchPostPage from '../domains/job/search/write/page/WriteJobSearchPostPage'
import FindPwCheckIDPage from '../domains/Find/detail/FindPwCheckIDPage'
import ChangePwPage from '../domains/Find/detail/ChangePwPage'
import FindIDCompletePage from '../domains/Find/detail/FindIDCompletePage'
import UserPosts from '../domains/community/detail/page/UserPosts'
import Join from './../domains/login/page/Join'
import MainPage from './../domains/main/main/MainPage'
import LoginMain from './../domains/login/page/LoginMain'
import MemberDataEntry from './../domains/login/page/MemberDataEntry'
import FindIDPage from './../domains/Find/page/FindIDPage'
import FindPwPage from './../domains/Find/page/FindPwPage'
import MyPage from './../domains/my/page/MyPage'
import EditProfile from './../domains/my/detail/EditProfile'
import EditPassword from '../domains/my/detail/EditPassword'
import PasswordMis from '../domains/my/detail/PasswordMis'
import MyScrap from '../domains/my/detail/MyScrap'
import MyPost from '../domains/my/detail/MyPost'
import MyDrafts from '../domains/my/detail/MyDrafts'
import JobSeekDetailPage from '../domains/job/search/detail/page/JobSeekDetailPage'
import ErrorPage from '../domains/error/page/ErrorPage'
import DetailCommunityPage from '../domains/community/detail/page/DetailCommunityPage'
import RecruitmentDetailPage from '../domains/job/recruitment/detail/page/RecruitmentDetailPage'
import EditRecruitmentPost from '../domains/job/recruitment/edit/page/EditRecruitmentPostPage'
import EditJobSeekPostPage from '../domains/job/search/edit/page/EditJobSeekPostPage'
import KakaoSuccess from '../domains/login/page/KakaoSuccess'
import NaverSuccess from '../domains/login/page/NaverSuccess'
import MyRecentList from '../domains/my/detail/MyRecentList'
import TermsOfService from '../domains/policy/page/TermsOfService'
import PrivacyPolicy from '../domains/policy/page/PrivacyPolicy'
import InstallMethod from '../domains/policy/page/InstallMethod'

const routes = [
  {
    path: ROUTER_PATHS.MAIN_PAGE,
    element: <MainPage />,
    noMargin: true,
  },
  {
    path: ROUTER_PATHS.LOGIN_MAIN,
    element: <LoginMain />,
    label: '로그인',
  },
  {
    path: ROUTER_PATHS.JOIN,
    element: <Join />,
    label: '회원가입',
  },
  {
    path: ROUTER_PATHS.MEMBER_DATA_ENTRY,
    element: <MemberDataEntry />,
    label: '회원정보 입력',
  },
  {
    path: ROUTER_PATHS.COMMUNITY,
    element: <CommunityMainPage />,
    noMargin: true,
  },
  {
    path: ROUTER_PATHS.WRITE_COMMUNITY_POST,
    element: <WriteCommunityPostPage />,
    label: '자유게시판 글 작성',
    isProtected: true,
  },
  {
    path: '/community/post/:id',
    element: <DetailCommunityPage />,
    isProtected: true,
  },
  {
    path: ROUTER_PATHS.USER_POST,
    element: <UserPosts />,
    paddingX: true,
  },

  {
    path: ROUTER_PATHS.JOB_MAIN,
    element: <JobMainPage />,
    paddingX: true,
  },
  {
    path: ROUTER_PATHS.WRITE_RECRUITMENT_POST,
    element: <WriteRecruitmentPostPage />,
    label: '구인 글 작성',
    isProtected: true,
  },
  {
    path: '/job/recruitment/post/:id',
    element: <RecruitmentDetailPage />,
    label: '구인 상세 글',
    isProtected: true,
  },
  {
    path: '/job/recruitment/edit/:id',
    element: <EditRecruitmentPost />,
    label: '구인 글 수정',
    isProtected: true,
  },
  {
    path: ROUTER_PATHS.WRITE_JOB_SEARCH_POST,
    element: <WriteJobSearchPostPage />,
    label: '구직 글 작성',
    isProtected: true,
  },
  {
    path: '/job/job-seek/edit/:id',
    element: <EditJobSeekPostPage />,
    label: '구직 글 수정',
    isProtected: true,
  },
  {
    path: '/job/job-seek/post/:id',
    element: <JobSeekDetailPage />,
    label: '구직 상세 글',
    isProtected: true,
  },
  {
    path: ROUTER_PATHS.FIND_ID,
    element: <FindIDPage />,
    label: '아이디 찾기',
  },
  {
    path: ROUTER_PATHS.FIND_ID_COMPLETE_PAGE,
    element: <FindIDCompletePage />,
    label: '아이디 찾기',
  },
  {
    path: ROUTER_PATHS.FIND_PW,
    element: <FindPwPage />,
    label: '비밀번호 찾기',
  },
  {
    path: ROUTER_PATHS.FIND_PW_CHECK_ID_PAGE,
    element: <FindPwCheckIDPage />,
    label: '비밀번호 찾기',
  },
  {
    path: ROUTER_PATHS.FIND_PW_CHANGE_PW,
    element: <ChangePwPage />,
    label: '비밀번호 변경',
  },
  {
    path: ROUTER_PATHS.MY_PAGE,
    element: <MyPage />,
    label: '내 정보',
    noMargin: true,
    isProtected: true,
  },
  {
    path: ROUTER_PATHS.MY_EDIT_PROFILE,
    element: <EditProfile />,
    label: '회원정보 수정',
  },
  {
    path: ROUTER_PATHS.MY_EDIT_PW,
    element: <EditPassword />,
    label: '비밀번호 변경',
  },
  {
    path: ROUTER_PATHS.MY_PW_MIS,
    element: <PasswordMis />,
  },
  {
    path: ROUTER_PATHS.MY_SCRAP,
    element: <MyScrap />,
    label: '스크랩',
    paddingX: true,
  },
  {
    path: ROUTER_PATHS.MY_POST,
    element: <MyPost />,
    label: '내가 작성한 글',
    paddingX: true,
  },
  {
    path: ROUTER_PATHS.MY_RECENT_LIST,
    element: <MyRecentList />,
    label: '최근 본 목록',
    paddingX: true,
  },
  {
    path: ROUTER_PATHS.MY_DRAFTS,
    element: <MyDrafts />,
    label: '임시저장 글',
    paddingX: true,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: ROUTER_PATHS.KAKAO_SUCCESS,
    element: <KakaoSuccess />,
  },
  {
    path: ROUTER_PATHS.NAVER_SUCCESS,
    element: <NaverSuccess />,
  },
  {
    path: ROUTER_PATHS.TERMS_OF_SERVICE,
    element: <TermsOfService />,
  },
  {
    path: ROUTER_PATHS.PRIVACY_POLICY,
    element: <PrivacyPolicy />,
  },
  {
    path: ROUTER_PATHS.INSTALL_METHOD,
    element: <InstallMethod />,
  },
]

export default routes
