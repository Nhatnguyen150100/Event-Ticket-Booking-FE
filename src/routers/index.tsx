import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/not-found";
import AdminPage from "../modules/admin/AdminPage";
import TheLayoutAdmin from "../modules/admin/layout/TheLayoutAdmin";
import { DEFINE_ROUTERS_ADMIN } from "../constants/route-mapper";
import LoginAdmin from "../modules/admin/auth/LoginAdmin";

const router = createBrowserRouter([
  {
    path: DEFINE_ROUTERS_ADMIN.home,
    errorElement: <ErrorPage />,
    Component: TheLayoutAdmin,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS_ADMIN.loginAdmin,
    element: <LoginAdmin />,
  },
]);

export default router;
