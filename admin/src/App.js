import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./app.css";

import { AuthContext } from "./context/AuthContext";

import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Transactions from "./pages/transactions/Transactions";
import List from "./pages/list/List";
import HotelForm from "./pages/hotelForm/HotelForm";
import RoomForm from "./pages/roomForm/RoomForm";

import { transCol, hotelsCol, roomsCol } from "./template/dataGrid";

function App() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const RequireAuth = ({ children }) => {
    const { user, token, dispatch } = useContext(AuthContext);

    if (!user || !token) {
      dispatch({ type: "LOGOUT" });
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="wrapper">
      {path !== "login" && <Sidebar />}

      <div className="container">
        {path !== "login" && <Topbar />}
        <Routes>
          <Route path="/">
            <Route path="/login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home col={transCol} />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="/transactions"
            element={
              <RequireAuth>
                <Transactions col={transCol} />
              </RequireAuth>
            }
          />
          <Route path="/hotels">
            <Route
              index
              element={
                <RequireAuth>
                  <List col={hotelsCol} />
                </RequireAuth>
              }
            />
            <Route
              path=":hotelId"
              element={
                <RequireAuth>
                  <HotelForm />
                </RequireAuth>
              }
            />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <HotelForm />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/rooms">
            <Route
              index
              element={
                <RequireAuth>
                  <List col={roomsCol} />
                </RequireAuth>
              }
            />
            <Route
              path=":roomId"
              element={
                <RequireAuth>
                  <RoomForm />
                </RequireAuth>
              }
            />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <RoomForm />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
