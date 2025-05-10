import ROUTER_PATHS from './RouterPath'
import JobMainPage from '../domains/job/main/page/JobMainPage'
import CommunityMainPage from '../domains/community/main/page/CommunityMainPage'
import WriteCommunityPostPage from '../domains/community/write/page/WriteCommunityPostPage'
import WriteRecruitmentPostPage from '../domains/job/recruitment/page/WriteRecruitmentPostPage'
import WriteJobSearchPostPage from '../domains/job/search/page/WriteJobSearchPostPage'
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
import DetailJobSearchPost from '../domains/job/search/DetailJobSearchPost'
import ErrorPage from '../domains/error/page/ErrorPage'

const routes = [
  {
    path: ROUTER_PATHS.MAIN_PAGE,
    element: <MainPage />,
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
  },
  {
    path: ROUTER_PATHS.WRITE_JOB_SEARCH_POST,
    element: <WriteJobSearchPostPage />,
    label: '구직 글 작성',
  },
  {
    path: '/job/job-search/post/:id',
    element: <DetailJobSearchPost />,
    label: '구직 글',
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
]

export default routes
