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
  const { user, token } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (user && !token) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return children;
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <RequireAuth>
                <Home />
              </RequireAuth>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
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
