import { DateTime } from "luxon";

const getTeamColumns = (role) => {
  const baseColumns = [
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
  ];

  // Only add these columns if role is not "user"
  if (role !== "user") {
    baseColumns.splice(1, 0, {
      headerName: "Total Members",
      cellRenderer: (params) => params.data.totalUsers,
      sortable: false,
      resizable: false,
      editable: false,
      suppressMovable: true,
    });

    baseColumns.push({
      headerName: "Add User",
      cellRenderer: (params) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => params.context.openAddUserModal(params.data._id)}
        >
          Add
        </button>
      ),
    });
  }

  return baseColumns;
};

export { getTeamColumns };
