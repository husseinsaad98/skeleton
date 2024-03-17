import { useState } from "react";
import { ChangeEvent } from "react";
import { useContextStore } from "./gridContext";

export default function TableHead() {
  let { triggerFilter, filteringParams } = useContextStore();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>): void {
    filteringParams.searchTerm = e.target.value;
    triggerFilter(filteringParams);
  }
  const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
  return (
    <>
      <div className="flex justify-between px-5 py-5 border-bottom">
        <select
          value={recordsPerPage}
          onChange={(e) => {
            setRecordsPerPage(Number(e.target.value));
            filteringParams.pagination.recordsPerPage = Number(e.target.value);
            triggerFilter(filteringParams);
          }}
          autoComplete="pagination"
          className="block w-20 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
        <div className="flex gap-5">
          <div>
            <input
              type="text"
              onChange={(e) => handleOnChange(e)}
              name="first-name"
              id="first-name"
              placeholder="Search.."
              autoComplete="given-name"
              className="block w-30 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="px-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600  text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="hidden md:block">Add New User</span>
          </button>
        </div>
      </div>
    </>
  );
}
