import Join from "../domains/login/main/Join";
import LoginMain from "../domains/login/main/LoginMain";
import MemberDataEntry from "../domains/login/main/MemberDataEntry";
import MainPage from "../domains/main/main/MainPage";
import ROUTER_PATHS from "./RouterPath";

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
];

export default routes;