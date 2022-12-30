import "./home.css";

import Widget from "../../components/widget/Widget";
import DataGrid from "../../components/dataGrid/DataGrid";

const Home = ({ col, row }) => {
  return (
    <div className="home">
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="listContainer">
        <DataGrid col={col} row={row} />
      </div>
    </div>
  );
};

export default Home;
