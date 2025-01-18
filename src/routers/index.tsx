import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/not-found";
import AdminPage from "../modules/admin/AdminPage";
import TheLayoutAdmin from "../modules/admin/layout/TheLayoutAdmin";
import { DEFINE_ROUTERS_ADMIN } from "../constants/route-mapper";
import LoginAdmin from "../modules/admin/auth/LoginAdmin";
import EventsManger from "../modules/admin/menu/room/EventsManger";
import CreateEvent from "../modules/admin/menu/room/CreateEvent";
import EditEvent from "../modules/admin/menu/room/EditEvent";

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
      {
        path: DEFINE_ROUTERS_ADMIN.eventsManager,
        element: <EventsManger />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.newEvent,
        element: <CreateEvent />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.editEvent,
        element: <EditEvent />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS_ADMIN.loginAdmin,
    element: <LoginAdmin />,
  },
]);

export default router;
