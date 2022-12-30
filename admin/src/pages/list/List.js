import "./list.css";

import DataGrid from "../../components/dataGrid/DataGrid";

const List = ({ col, row }) => {
  return (
    <div className="listContainer">
      <DataGrid col={col} row={row} />
    </div>
  );
};

export default List;
