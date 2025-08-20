import { DateTime } from "luxon";

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
    headerName: "Total Members",
    cellRenderer: (params) => params.data.totalUsers,
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
    headerName: "Created At",
    field: "createdAt",
    sortable: false,
    filter: false,
    editable: false,
    valueFormatter: (params) =>
      DateTime.fromISO(params.value).toLocaleString(DateTime.DATETIME_MED),
    suppressMovable: true,
    resizable: false,
  },

  {
    headerName: "Add User",
    cellRenderer: (params) => {
      return (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => params.context.openAddUserModal(params.data._id)}
        >
          Add
        </button>
      );
    },
    // width: 200,
  },
];

export { columns };
