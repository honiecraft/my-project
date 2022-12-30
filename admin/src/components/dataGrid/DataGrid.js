import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./dataGrid.css";

import useFetch from "../../hooks/useFetch";

const Datagrid = ({ col }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const tokenInfor = token ? token : null;

  const { data, isLoading, error } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/${
      path === "" ? "transactions?limit=8" : path
    }`,
    null,
    null
  );

  useEffect(() => {
    setList([...data]);
  }, [data]);

  const handleDelete = async (id) => {
    if (window.confirm("Confirm to Delete?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/${path}/${id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenInfor ? `Bearer ${tokenInfor}` : ``,
            },
          }
        );
        const body = await response.json();
        if (!response.ok) {
          alert("Can not delete!");
          throw new Error(body.message);
        } else setList(list.filter((item) => item._id !== id));
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        const editPath = `/${path}/${params.id}`;
        return (
          <div className="cellAction">
            <Link to={editPath} className="link">
              <Button variant="outlined" className="editButton">
                Edit
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="error"
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  let columnType;
  let title;
  let addBtn;

  switch (path) {
    case "hotels":
      columnType = col.concat(actionColumn);
      title = "Hotels List";
      addBtn = true;
      break;
    case "rooms":
      columnType = col.concat(actionColumn);
      title = "Rooms List";
      addBtn = true;
      break;
    case "transactions":
      columnType = col;
      title = "Transactions List";
      addBtn = false;
      break;
    default:
      columnType = col;
      title = "Latest Transactions";
      addBtn = false;
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {addBtn && (
          <Link to={`/${path}/new`} className="link">
            <Button variant="outlined" color="success" className="addNewButton">
              Add New
            </Button>
          </Link>
        )}
      </div>
      <DataGrid
        rows={list}
        columns={columnType}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datagrid;
