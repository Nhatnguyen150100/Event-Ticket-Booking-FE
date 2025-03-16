import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/not-found";
import AdminPage from "../modules/admin/AdminPage";
import TheLayoutAdmin from "../modules/admin/layout/TheLayoutAdmin";
import { DEFINE_ROUTERS_ADMIN, DEFINE_USER_ROUTERS } from "../constants/route-mapper";
import LoginAdmin from "../modules/admin/auth/LoginAdmin";
import EventsManger from "../modules/admin/menu/event-manager/EventsManger";
import CreateEvent from "../modules/admin/menu/event-manager/CreateEvent";
import EditEvent from "../modules/admin/menu/event-manager/EditEvent";
import TheLayout from "../components/layout/TheLayout";
import HomeUser from "../modules/app/home/HomeUser";
import EventDetail from "../modules/app/home/EventDetail";

const router = createBrowserRouter([
  {
    path: DEFINE_USER_ROUTERS.home,
    errorElement: <ErrorPage />,
    Component: TheLayout,
    children: [
      {
        index: true,
        element: <HomeUser />
      },
      {
        path: DEFINE_USER_ROUTERS.eventDetail,
        element: <EventDetail />
      }
    ]
  },
  {
    path: DEFINE_ROUTERS_ADMIN.homeAdmin,
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
