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
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/hotels/search" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/transactions/:id" element={<Transaction />} />
      </Routes>
      <MailList />
      <Footer />
    </div>
  );
}

export default App;
