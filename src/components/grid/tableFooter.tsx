"use client";
import { useEffect, useState } from "react";
import { useContextStore } from "./gridContext";

export default function TableFooter() {
  let { triggerFilter, filteringParams, filteredData } = useContextStore();

  const [currentPage, setCurrentPage] = useState<number>(
    filteringParams.pagination.pageNumber
  );
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  useEffect(() => {
    const calculatedNumberOfPages = Math.ceil(
      filteredData.length / filteringParams.pagination.recordsPerPage
    );
    setNumberOfPages(calculatedNumberOfPages);

    if (currentPage > calculatedNumberOfPages) {
      setCurrentPage(calculatedNumberOfPages);
    }

    filteringParams.pagination.pageNumber = currentPage;
    triggerFilter(filteringParams);
  }, [currentPage]);

  useEffect(() => {
    const calculatedNumberOfPages = Math.ceil(
      filteredData.length / filteringParams.pagination.recordsPerPage
    );
    setNumberOfPages(calculatedNumberOfPages);
  }, [filteringParams]);

  function handleOnCLick(e: any): void {
    const newPage = Number(e.target.innerText);
    setCurrentPage(newPage);
  }

  const currentPageStartIndex =
    (currentPage - 1) * filteringParams.pagination.recordsPerPage + 1;
  const currentPageEndIndex = Math.min(
    currentPage * filteringParams.pagination.recordsPerPage,
    filteredData.length
  );

  const displayRange = (
    <p className="text-sm text-gray-700">
      Showing <span className="font-medium">{currentPageStartIndex}</span> to{" "}
      <span className="font-medium">{currentPageEndIndex}</span> of{" "}
      <span className="font-medium">{filteredData.length}</span> results
    </p>
  );
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>{displayRange}</div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className={`relative
              ${currentPage === 1 && "disabled"} 
              inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <svg
                onClick={(e) => setCurrentPage(currentPage - 1)}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </a>
            {Array.from(Array(numberOfPages), (e, i) => {
              return i + 1 === currentPage ? (
                <a
                  key={i}
                  href="#"
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center bg-indigo-600 disabled px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {i + 1}
                </a>
              ) : (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => handleOnCLick(e)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {i + 1}
                </a>
              );
            })}

            <a
              href="#"
              onClick={(e) => setCurrentPage(currentPage + 1)}
              className={`relative ${
                currentPage === numberOfPages && "disabled"
              } inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
