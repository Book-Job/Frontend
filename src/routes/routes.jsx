import LoginMain from "../domains/login/main/LoginMain";
import MainPage from "../domains/main/main/MainPage";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/loginMain", element: <LoginMain /> },
];

export default routes;