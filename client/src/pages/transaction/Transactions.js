import { useContext } from "react";

import "./transaction.css";

import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Transaction = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, error } = useFetch(
    `http://localhost:5000/transactions/${user._id}`,
    null,
    null
  );

  return (
    <div className="tableContainer">
      <h2>Your Transactions</h2>
      <table id="customers">
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? null
            : data &&
              data.map((t, i) => {
                return (
                  <tr key={t._id}>
                    <td>{i + 1}</td>
                    <td>{t.hotel}</td>
                    <td>{t.room}</td>
                    <td>{t.date}</td>
                    <td>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(t.price)}
                    </td>
                    <td>{t.payment}</td>
                    <td id={t.status} className="status">
                      <span>{t.status}</span>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
