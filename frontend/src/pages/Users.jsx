"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import NoDataImg from "../components/NoDataImg";

import { columns } from "../columns/userColumns";
import CustomPagination from "../components/CustomPagination";
import { ProtectedApi } from "../api/axiosApis";
ModuleRegistry.registerModules([AllCommunityModule]);

const Users = () => {
  const navigate = useNavigate();
  const gridApi = useRef(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const encodedQuery = new URLSearchParams(query).toString();
      const response = await ProtectedApi.getUsers(encodedQuery);
      setData(response.users);
      setTotalData(response.pagination.totalUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const getRowStyle = useCallback((params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "#f3f3f3" };
    }
  }, []);

  const pageChange = (page) => {
    setQuery({ ...query, page: page });
  };

  const handleRowPerPage = (newPerPage, page) => {
    setQuery({ ...query, limit: newPerPage, page: page });
  };

  return (
    <div>
      {error && !loading ? (
        <div className="text-center">{error}</div>
      ) : (
        <div className="m-4">
          <div className="text-end mb-2">
            <Button
              onClick={() => navigate("/add-user")}
              className="btn-primary"
            >
              Add
            </Button>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "500px", width: "100%" }}
          >
            <AgGridReact
              ref={gridApi}
              columnDefs={columns}
              rowData={data}
              getRowStyle={getRowStyle}
              onGridReady={(params) => params.api.sizeColumnsToFit()}
              loading={loading}
              rowHeight={52}
              suppressCellSelection={true}
              suppressDragLeaveHidesColumns={true}
              noRowsOverlayComponent={NoDataImg}
            />
          </div>
          <CustomPagination
            currentPage={query.page}
            totalData={totalData}
            rowsPerPage={query.limit}
            handlePageChange={pageChange}
            handleRowsPerPageChange={handleRowPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
