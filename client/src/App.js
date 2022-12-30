import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Transaction from "./pages/transaction/Transactions";
import MailList from "./components/mailList/MailList";
import Footer from "./components/footer/Footer";

function App() {
  const { user, token, dispatch } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    const tokenInfor = token
      ? token
      : sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    if (!user || (user && !tokenInfor)) {
      dispatch({ type: "LOGOUT" });
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/hotels/search"
          element={
            <RequireAuth>
              <List />
            </RequireAuth>
          }
        />
        <Route
          path="/hotels/:id"
          element={
            <RequireAuth>
              <Hotel />
            </RequireAuth>
          }
        />
        <Route
          path="/transactions/:id"
          element={
            <RequireAuth>
              <Transaction />
            </RequireAuth>
          }
        />
      </Routes>
      <MailList />
      <Footer />
    </div>
  );
}

export default App;
