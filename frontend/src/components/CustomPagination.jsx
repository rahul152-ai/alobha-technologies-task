import { useState, useMemo, useCallback } from "react";

const CustomPagination = ({
  currentPage = 1,
  totalData = 0,
  rowsPerPage = 10,
  handlePageChange,
  handleRowsPerPageChange,
}) => {
  const [inputPage, setInputPage] = useState("");

  // Ensure values are always integers
  const intCurrentPage = useMemo(
    () => parseInt(currentPage, 10) || 1,
    [currentPage]
  );
  const intRowsPerPage = useMemo(
    () => parseInt(rowsPerPage, 10) || 10,
    [rowsPerPage]
  );
  const intTotalData = useMemo(() => parseInt(totalData, 10) || 0, [totalData]);

  // Calculate total pages
  const totalPages = useMemo(
    () => Math.ceil(intTotalData / intRowsPerPage),
    [intTotalData, intRowsPerPage]
  );

  // Handle Jump to Page input
  const handleJumpToPage = useCallback((e) => setInputPage(e.target.value), []);

  // Handle Jump Submit
  const handleJumpSubmit = useCallback(() => {
    // Ensure page is between 1 and total pages
    const page = Math.min(
      Math.max(parseInt(inputPage, 10) || 1, 1),
      totalPages
    );
    handlePageChange(page);
    setInputPage("");
  }, [inputPage, totalPages, handlePageChange]);

  return (
    <div className="t-pagination-c">
      {/* Rows Per Page */}

      <div className="p-rpp">
        <label>Rows per page: </label>
        <select
          value={intRowsPerPage}
          onChange={(e) => {
            if (handleRowsPerPageChange) {
              handleRowsPerPageChange(
                parseInt(e.target.value, 10),
                intCurrentPage
              );
            }
          }}
          disabled={!handleRowsPerPageChange}
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="p-btn-grp">
        <span className="me-1">
          Page {intCurrentPage} of {totalPages}
        </span>
        | Entries {totalData}
        {[
          {
            id: "pagination-first-page",
            onClick: () => handlePageChange(1),
            disabled: intCurrentPage === 1,
            icon: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z",
          },
          {
            id: "pagination-previous-page",
            onClick: () => handlePageChange(intCurrentPage - 1),
            disabled: intCurrentPage === 1,
            icon: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
          },
          {
            id: "pagination-next-page",
            onClick: () => handlePageChange(intCurrentPage + 1),
            disabled: intCurrentPage === totalPages,
            icon: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
          },
          {
            id: "pagination-last-page",
            onClick: () => handlePageChange(totalPages),
            disabled: intCurrentPage === totalPages,
            icon: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z",
          },
        ].map(({ id, onClick, disabled, icon }) => (
          <button
            key={id}
            onClick={onClick}
            disabled={disabled}
            className="t-pagination"
            id={id}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d={icon}></path>
            </svg>
          </button>
        ))}
      </div>

      {/* Jump to Page */}
      {/* <div className="p-jtp">
        <input
          type="number"
          value={inputPage}
          onChange={handleJumpToPage}
          placeholder="Jump to..."
        />
        <button
          type="button"
          className="t-goto-btn"
          id="go-to-page"
          onClick={handleJumpSubmit}
          disabled={!inputPage}
        >
          Go
        </button>
      </div> */}
    </div>
  );
};

export default CustomPagination;
