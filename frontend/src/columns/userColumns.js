const columns = [
  {
    headerName: "SN",
    cellRenderer: (params) => params.node.rowIndex + 1,
    sortable: false,
    resizable: false,
    width: 90,
    editable: false,
    suppressMovable: true,
  },
  {
    headerName: "Name",
    field: "name",
    sortable: false,
    filter: false,
    editable: false,
    suppressMovable: true,
    resizable: false,
  },
  {
    headerName: "Email",
    field: "email",
    sortable: false,
    filter: false,
    editable: false,
    suppressMovable: true,
    resizable: false,
  },
  {
    headerName: "Role",
    field: "role",
    sortable: false,
    filter: false,
    editable: false,
    suppressMovable: true,
    resizable: false,
  },
];

export { columns };
