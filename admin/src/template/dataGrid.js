import clsx from "clsx";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const transCol = [
  { field: "_id", headerName: "ID", width: 210 },
  {
    field: "user",
    headerName: "User",
    width: 80,
  },
  {
    field: "hotel",
    headerName: "Hotel",
    width: 250,
  },

  {
    field: "room",
    headerName: "Room",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 80,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
  },
  {
    field: "payment",
    headerName: "Payment Method",
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    cellClassName: (params) => {
      return clsx("status", {
        booked: params.formattedValue === "Booked",
        checkin: params.formattedValue === "Checkin",
        checkout: params.formattedValue === "Checkout",
      });
    },
  },
];

export const hotelsCol = [
  { field: "_id", headerName: "ID", width: 210 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "type",
    headerName: "Type",
    width: 80,
  },
  {
    field: "title",
    headerName: "Title",
    width: 170,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomsCol = [
  { field: "_id", headerName: "ID", width: 210 },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 80,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
