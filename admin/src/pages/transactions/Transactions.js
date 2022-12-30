import "./transactions.css";

import DataGrid from "../../components/dataGrid/DataGrid";

const Transactions = ({ col, row }) => {
  return (
    <div className="home">
      <div className="listContainer">
        <DataGrid col={col} row={row} />
      </div>
    </div>
  );
};

export default Transactions;
