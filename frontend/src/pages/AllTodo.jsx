"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import NoDataImg from "../components/NoDataImg";

import { getColumns } from "../columns/todoColumn";
import CustomPagination from "../components/CustomPagination";
import { ProtectedApi } from "../api/axiosApis";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddEditorModal from "../components/AddEditorModel";

ModuleRegistry.registerModules([AllCommunityModule]);

const AllTodos = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const gridApi = useRef(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  // Filters & Query
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    creator: "",
    title: "",
    team: "",
    fromDate: "",
    toDate: "",
  });

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const encodedQuery = new URLSearchParams(query).toString();
      const response = await ProtectedApi.getAllTodos(encodedQuery);
      setData(response.todos);
      setTotalData(response.pagination.totalTodos);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (teamId, todoId) => {
    setSelectedTeamId(teamId);
    setSelectedTodoId(todoId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // setSelectedTeamId(null);
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
    setQuery({ ...query, page });
  };

  const handleRowPerPage = (newPerPage, page) => {
    setQuery({ ...query, limit: newPerPage, page });
  };

  // Clear Filters
  const clearFilters = () => {
    setQuery({
      page: 1,
      limit: 10,
      creator: "",
      title: "",
      team: "",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <>
      {error && !loading ? (
        <div className="text-center">{error}</div>
      ) : (
        <div className="m-4">
          {/* Filter Section */}
          <div className="d-flex flex-wrap gap-4 mb-4 justify-content-end">
            <div className="d-flex flex-column gap-1">
              <label htmlFor="creator" className="text-sm font-medium mb-1">
                Actor Name
              </label>
              <input
                id="creator"
                type="text"
                placeholder="Search by actor"
                value={query.creator}
                onChange={(e) =>
                  setQuery({ ...query, creator: e.target.value, page: 1 })
                }
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="d-flex flex-column gap-1">
              <label htmlFor="title" className="text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Search by title"
                value={query.title}
                onChange={(e) =>
                  setQuery({ ...query, title: e.target.value, page: 1 })
                }
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="d-flex flex-column gap-1">
              <label htmlFor="team" className="text-sm font-medium mb-1">
                Team
              </label>
              <input
                id="team"
                type="text"
                placeholder="Search by team"
                value={query.team}
                onChange={(e) =>
                  setQuery({ ...query, team: e.target.value, page: 1 })
                }
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="d-flex flex-column gap-1">
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

            <div className="d-flex flex-column gap-1">
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

            {/* Clear Filters Button */}
            <div className="d-flex align-items-end">
              <button
                onClick={clearFilters}
                className="btn btn-outline-primary btn-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div
            className="ag-theme-alpine"
            style={{ height: "500px", width: "100%" }}
          >
            <AgGridReact
              ref={gridApi}
              columnDefs={getColumns(user._id, navigate)}
              rowData={data}
              getRowStyle={getRowStyle}
              onGridReady={(params) => params.api.sizeColumnsToFit()}
              loading={loading}
              rowHeight={52}
              suppressCellSelection={true}
              suppressDragLeaveHidesColumns={true}
              noRowsOverlayComponent={NoDataImg}
              context={{ openAddEditorModal: openModal }}
            />
          </div>
          {/* Pagination */}
          <CustomPagination
            currentPage={query.page}
            totalData={totalData}
            rowsPerPage={query.limit}
            handlePageChange={pageChange}
            handleRowsPerPageChange={handleRowPerPage}
          />
        </div>
      )}

      {showModal && (
        <AddEditorModal
          show={showModal}
          onClose={closeModal}
          teamId={selectedTeamId}
          todoId={selectedTodoId}
        />
      )}
    </>
  );
};

export default AllTodos;
