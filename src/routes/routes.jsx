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

const routes = [
  {
    path: ROUTER_PATHS.MAIN_PAGE,
    element: <MainPage />,
    noMargin: true,
  },
  {
    path: ROUTER_PATHS.LOGIN_MAIN,
    element: <LoginMain />,
  },
  {
    path: ROUTER_PATHS.JOIN,
    element: <Join />,
  },
  {
    path: ROUTER_PATHS.MEMBER_DATA_ENTRY,
    element: <MemberDataEntry />,
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
  },

  {
    path: ROUTER_PATHS.JOB_MAIN,
    element: <JobMainPage />,
    noMargin: true,
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
  },
  {
    path: ROUTER_PATHS.FIND_ID_COMPLETE_PAGE,
    element: <FindIDCompletePage />,
  },
  {
    path: ROUTER_PATHS.FIND_PW,
    element: <FindPwPage />,
  },
  {
    path: ROUTER_PATHS.FIND_PW_CHECK_ID_PAGE,
    element: <FindPwCheckIDPage />,
  },
  {
    path: ROUTER_PATHS.FIND_PW_CHANGE_PW,
    element: <ChangePwPage />,
  },
  {
    path: ROUTER_PATHS.FIND_ID,
    element: <FindIDPage />,
  },
  {
    path: ROUTER_PATHS.FIND_ID_COMPLETE_PAGE,
    element: <FindIDCompletePage />,
  },
  {
    path: ROUTER_PATHS.FIND_PW,
    element: <FindPwPage />,
  },
  {
    path: ROUTER_PATHS.FIND_PW_CHECK_ID_PAGE,
    element: <FindPwCheckIDPage />,
  },
  {
    path: ROUTER_PATHS.FIND_PW_CHANGE_PW,
    element: <ChangePwPage />,
  },
  {
    path: ROUTER_PATHS.MY_PAGE,
    element: <MyPage />,
    noMargin: true,
    isProtected: true,
  },
  {
    path: ROUTER_PATHS.MY_EDIT_PROFILE,
    element: <EditProfile />,
  },
  {
    path: ROUTER_PATHS.MY_EDIT_PW,
    element: <EditPassword />,
  },
  {
    path: ROUTER_PATHS.MY_PW_MIS,
    element: <PasswordMis />,
  },
  {
    path: ROUTER_PATHS.MY_SCRAP,
    element: <MyScrap />,
  },
  {
    path: ROUTER_PATHS.MY_POST,
    element: <MyPost />,
  },
  {
    path: ROUTER_PATHS.MY_DRAFTS,
    element: <MyDrafts />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: ROUTER_PATHS.KAKAO_SUCCESS,
    element: <KakaoSuccess />,
  },
]

export default routes
