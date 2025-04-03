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
];

export default routes;