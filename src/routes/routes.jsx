import Join from '../domains/login/main/Join'
import LoginMain from '../domains/login/main/LoginMain'
import MemberDataEntry from '../domains/login/main/MemberDataEntry'
import MainPage from '../domains/main/main/MainPage'
import ROUTER_PATHS from './RouterPath'
import JobMainPage from '../domains/job/main/JobMainPage'
import CommunityMainPage from '../domains/community/main/page/CommunityMainPage'
import WriteCommunityPost from '../domains/community/write/page/WriteCommunityPost'
import WriteRecruitmentPosting from '../domains/job/recruitment/WriteRecruitmentPosting'
import WriteJobSearchPosting from '../domains/job/job-search/WriteJobSearchPosting'
import DetailJobSearchPost from '../domains/job/job-search/DetailJobSearchPost'
import FindIDPage from '../domains/Find/main/FindIDPage'
import FindPwPage from '../domains/Find/main/FindPwPage'
import FindPwCheckIDPage from '../domains/Find/detail/FindPwCheckIDPage'
import ChangePwPage from '../domains/Find/detail/ChangePwPage'
import FindIDCompletePage from '../domains/Find/detail/FindIDCompletePage'
import UserPosts from '../domains/community/detail/page/UserPosts'
import MyPage from '../domains/my/main/MyPage'
import EditProfile from '../domains/my/detail/EditProfile'

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
    path: ROUTER_PATHS.JOB_MAIN,
    element: <JobMainPage />,
  },
  {
    path: ROUTER_PATHS.COMMUNITY,
    element: <CommunityMainPage />,
  },
  {
    path: ROUTER_PATHS.USER_POST,
    element: <UserPosts />,
  },
  {
    path: ROUTER_PATHS.WRITE_COMMUNITY_POST,
    element: <WriteCommunityPost />,
  },
  {
    path: ROUTER_PATHS.WRITE_RECRUITMENT_POST,
    element: <WriteRecruitmentPosting />,
  },
  {
    path: ROUTER_PATHS.WRITE_JOB_SEARCH_POST,
    element: <WriteJobSearchPosting />,
  },
  {
    path: ROUTER_PATHS.JOB_SEARCH_POST_DETAIL,
    element: <DetailJobSearchPost />,
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
    noMargin: true,
  },
]

export default routes
