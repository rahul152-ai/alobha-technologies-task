import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";

export const MyTask = () => {
  const bookingData = [
    {
      id: 1,
      memberName: "John Doe",
      companyName: "",
      contactDetails: "john.doe@example.com",
      bookingSpace: "Full Day",
      dateOfBooking: "2025-04-21",
      boardMeetingRoom: "",
      productPromotion: "Screen",
    },
    {
      id: 2,
      memberName: "Jane Smith",
      companyName: "",
      contactDetails: "jane.smith@example.com",
      bookingSpace: "Half Day",
      dateOfBooking: "2025-04-22",
      boardMeetingRoom: "2025-04-22, 2:00 PM",
      productPromotion: "Shelf",
    },
    {
      id: 3,
      memberName: "XYZ Corp.",
      companyName: "XYZ Corporation",
      contactDetails: "contact@xyzcorp.com",
      bookingSpace: "Multiple Days",
      dateOfBooking: "2025-04-21 to 2025-04-26",
      boardMeetingRoom: "2025-04-24, 10:00 AM",
      productPromotion: "Both",
    },
    {
      id: 4,
      memberName: "Michael Brown",
      companyName: "",
      contactDetails: "michael.brown@example.com",
      bookingSpace: "Full Day",
      dateOfBooking: "2025-04-23",
      boardMeetingRoom: "",
      productPromotion: "Screen",
    },
    {
      id: 5,
      memberName: "Creative Minds Co.",
      companyName: "Creative Minds Co.",
      contactDetails: "info@creativeminds.com",
      bookingSpace: "Multiple Days",
      dateOfBooking: "2025-04-20 to 2025-04-25",
      boardMeetingRoom: "",
      productPromotion: "Shelf",
    },
  ];
  const [rowData, setRowData] = useState(bookingData);

  // Handle cancel booking button click
  const handleCancelBooking = (bookingId) => {
    const updatedData = rowData.filter((booking) => booking.id !== bookingId);
    setRowData(updatedData);
    alert(`Booking with ID ${bookingId} has been cancelled.`);
  };

  // Column definitions for the lounge booking table
  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      maxWidth: 120,
      minWidth: 100,
      headerClass: "activity-log-header",
      cellStyle: {
        color: "#414141",
        fontSize: "14px",
        fontWeight: "400",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins",
      },
    },
    {
      headerName: "Member / Company Name",
      field: "memberName",
      flex: 1,
      minWidth: 200,
      headerClass: "activity-log-header",
      cellRenderer: (params) => {
        return params.data.companyName
          ? `${params.data.companyName}`
          : params.data.memberName;
      },
      cellStyle: {
        color: "#414141",
        fontSize: "14px",
        fontWeight: "400",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins",
      },
    },
    {
      headerName: "Contact Details",
      field: "contactDetails",
      flex: 1,
      minWidth: 200,
      headerClass: "activity-log-header",
      cellStyle: {
        color: "#414141",
        fontSize: "14px",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins",
      },
    },
    {
      headerName: "Booking Space",
      field: "bookingSpace",
      flex: 1,
      minWidth: 180,
      headerClass: "activity-log-header",
      cellStyle: {
        color: "#414141",
        fontSize: "14px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins",
      },
    },
    {
      headerName: "Date of Booking",
      field: "dateOfBooking",
      flex: 1,
      minWidth: 200,
      headerClass: "activity-log-header",
      cellStyle: {
        color: "#414141",
        fontSize: "14px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins",
      },
      cellRenderer: (params) => {
        return <span>{params.value}</span>;
      },
    },
    {
      headerName: "Board Meeting Room",
      field: "boardMeetingRoom",
      flex: 1,
      minWidth: 180,
      headerClass: "activity-log-header",
      cellStyle: {
        color: "#414141",
        fontSize: "14px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins",
      },
    },
    {
      headerName: "Product Promotion",
      field: "productPromotion",
      flex: 1,
      minWidth: 150,
      headerClass: "activity-log-header",
      cellStyle: {
        color: "#414141",
        fontSize: "14px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins",
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      minWidth: 150,
      headerClass: "activity-log-header",
      cellRenderer: (params) => {
        return (
          <button
            className="btn-cancel"
            onClick={() => handleCancelBooking(params.data.id)}
            style={{
              cursor: "pointer",
              backgroundColor: "#ad1010",
              color: "white",
              border: "none",
              padding: "3px 8px",
              borderRadius: "5px",
            }}
          >
            Cancel Booking
          </button>
        );
      },
    },
  ];

  return (
    <section className="h-100 mx-auto">
      <div>
        <div className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout="autoHeight" // Adjust table height automatically
            className="activity-log-table"
            suppressCellSelection={true}
            headerHeight={40}
            rowHeight={48}
            getRowStyle={(params) => ({
              backgroundColor:
                params.node.rowIndex % 2 === 0 ? "#F8F9FC" : "white",
            })}
          />
        </div>
      </div>
    </section>
  );
};
