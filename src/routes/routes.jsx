import Join from "../domains/login/main/Join";
import JoinInfoData from "../domains/login/main/JoinInfoData";
import LoginMain from "../domains/login/main/LoginMain";
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
    path: ROUTER_PATHS.JOIN_INFO_DATA,
    element: <JoinInfoData />,
  },
];

export default routes;