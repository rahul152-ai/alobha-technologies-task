"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import NoDataImg from "../components/NoDataImg";

import { columns } from "../columns/systemLogColumn";
import CustomPagination from "../components/CustomPagination";
import { ProtectedApi } from "../api/axiosApis";
ModuleRegistry.registerModules([AllCommunityModule]);

const SystemLogs = () => {
  const gridApi = useRef(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    actorName: "",
    fromDate: "",
    toDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const encodedQuery = new URLSearchParams(query).toString();
      const response = await ProtectedApi.systemLogs(encodedQuery);
      setData(response.logs);
      setTotalData(response.pagination.totalLogs);
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
          <div className="d-flex gap-4 mb-4 justify-content-end">
            <div className="d-flex flex-col gap-1 justify-content-between align-items-center">
              <label htmlFor="actorName" className="text-sm font-medium mb-1">
                Actor Name
              </label>
              <input
                id="actorName"
                type="text"
                placeholder="Search by actor"
                value={query.actorName}
                onChange={(e) =>
                  setQuery({ ...query, actorName: e.target.value, page: 1 })
                }
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="d-flex flex-col gap-1 justify-content-between align-items-center">
              <label htmlFor="fromDate" className="text-sm font-medium mb-1">
                From Date
              </label>
              <input
                id="fromDate"
                type="date"
                value={query.fromDate}
                onChange={(e) =>
                  setQuery({ ...query, fromDate: e.target.value, page: 1 })
                }
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="d-flex flex-col gap-1 justify-content-between align-items-center">
              <label htmlFor="toDate" className="text-sm font-medium mb-1">
                To Date
              </label>
              <input
                id="toDate"
                type="date"
                value={query.toDate}
                onChange={(e) =>
                  setQuery({ ...query, toDate: e.target.value, page: 1 })
                }
                className="border rounded px-3 py-2"
              />
            </div>
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

export default SystemLogs;
