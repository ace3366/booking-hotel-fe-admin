import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Login, { action as loginAction } from "./pages/Login";
import Dashboard, {
  loader as dashboardLoader,
} from "./pages/dashboard/Dashboard.jsx";
import Users from "./pages/Users";
import { loader as userLoader } from "./components/table/UserTable";

import Hotels from "./pages/Hotels";
import EditHotel from "./pages/EditHotel";
import {
  loader as editHotelLoader,
  action as editHotelAction,
} from "./components/form/EditHotelForm";

import Rooms from "./pages/Rooms";
import EditRoom from "./pages/EditRoom";
import {
  loader as editRoomLoader,
  action as editRoomAction,
} from "./components/form/EditRoomForm";

import Transactions from "./pages/transaction/Transactions";
import NewHotel from "./pages/NewHotel";
import { action as newHotelAction } from "./components/form/NewHotelForm";
import {
  action as newRoomAction,
  loader as newRoomLoader,
} from "./components/form/NewRoomForm";
import NewRoom from "./pages/NewRoom";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  { path: "/login", element: <Login />, action: loginAction },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "dashboard", element: <Dashboard />, loader: dashboardLoader },
      { path: "users", element: <Users />, loader: userLoader },
      {
        path: "hotels",
        element: <Hotels />,
      },
      {
        path: "edit-hotel/:hotelId",
        element: <EditHotel />,
        loader: editHotelLoader,
        action: editHotelAction,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "edit-room/:roomId",
        element: <EditRoom />,
        loader: editRoomLoader,
        action: editRoomAction,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "new-hotel",
        element: <NewHotel />,
        action: newHotelAction,
      },
      {
        path: "new-room",
        element: <NewRoom />,
        loader: newRoomLoader,
        action: newRoomAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
