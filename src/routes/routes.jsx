import Join from '../domains/login/main/Join'
import LoginMain from '../domains/login/main/LoginMain'
import MemberDataEntry from '../domains/login/main/MemberDataEntry'
import MainPage from '../domains/main/main/MainPage'
import ROUTER_PATHS from './RouterPath'
import JobMainPage from '../domains/job/main/page/JobMainPage'
import CommunityMainPage from '../domains/community/main/page/CommunityMainPage'
import WriteCommunityPostPage from '../domains/community/write/page/WriteCommunityPostPage'
import WriteRecruitmentPostPage from '../domains/job/recruitment/page/WriteRecruitmentPostPage'
import WriteJobSearchPostPage from '../domains/job/search/page/WriteJobSearchPostPage'

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
  },
  {
    path: ROUTER_PATHS.WRITE_COMMUNITY_POST,
    element: <WriteCommunityPostPage />,
  },
  {
    path: ROUTER_PATHS.JOB_MAIN,
    element: <JobMainPage />,
  },
  {
    path: ROUTER_PATHS.WRITE_RECRUITMENT_POST,
    element: <WriteRecruitmentPostPage />,
  },
  {
    path: ROUTER_PATHS.WRITE_JOB_SEARCH_POST,
    element: <WriteJobSearchPostPage />,
  },
]

export default routes
