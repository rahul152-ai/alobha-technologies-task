import { DateTime } from "luxon";
import { Badge, Button } from "react-bootstrap";
import {} from "react-router-dom";

const getColumns = (userId, navigate) => {
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
      headerName: "Title",
      field: "title",
      sortable: false,
      resizable: true,
      width: 90,
      editable: false,
      suppressMovable: true,
    },
    {
      headerName: "Creator Name",
      field: "creator.name",
      valueGetter: (params) => params.data?.creator?.name || "",
      sortable: false,
      filter: false,
      editable: false,
      suppressMovable: true,
      width: 150,
      resizable: false,
    },
    {
      headerName: "Team Name",
      field: "team.name",
      valueGetter: (params) => params.data?.team?.name || "",
      sortable: false,
      filter: false,
      editable: false,
      suppressMovable: true,
      resizable: false,
    },
    {
      headerName: "Status",
      width: 90,
      field: "status",
      cellRenderer: (params) => {
        const status = params.value;
        return (
          <Badge bg={status === "pending" ? "danger" : "success"}>
            {status === "pending" ? "Pending" : "Active"}
          </Badge>
        );
      },
      sortable: false,
      filter: false,
      editable: false,
      suppressMovable: true,
      resizable: false,
    },
    {
      headerName: "Description",
      field: "description",
      sortable: false,
      filter: false,
      editable: false,
      suppressMovable: true,
      resizable: true,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: (params) =>
        DateTime.fromISO(params.value).toLocaleString(DateTime.DATETIME_MED),
      sortable: false,
      filter: false,
      editable: false,
      suppressMovable: true,
      resizable: true,
    },
  ];

  const conditionalColumns = [
    {
      headerName: "Add Editor",
      cellRenderer: (params) => {
        if (params.data?.creator?._id === userId) {
          return (
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                params.context.openAddEditorModal(
                  params.data.team._id,
                  params.data._id
                )
              }
            >
              Add Editor
            </Button>
          );
        }
        return null;
      },
      width: 120,
    },
    {
      headerName: "Edit",
      width: 80,
      cellRenderer: (params) => {
        if (params.data?.isEditable) {
          return (
            <Button
              size="sm"
              variant="warning"
              onClick={() => navigate(`/edit-todo/${params.data._id}`)}
            >
              Edit
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return [...baseColumns, ...conditionalColumns];
};

export { getColumns };
