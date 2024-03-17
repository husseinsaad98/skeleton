"use client";

import { useState } from "react";
import Column from "./column";
import { DataType, FieldConfig, Filtering } from "./gridModels";
import { GridContext } from "./gridContext";
import TableHead from "./tableHead";
import {
  filterBySearchTerm,
  paginateResult,
  sortByNumber,
  sortByString,
} from "./filtering";
import TableFooter from "./tableFooter";
const columns: FieldConfig[] = [
  {
    field: "user",
    headerName: "User",
    type: "string",
  },
  {
    field: "role",
    headerName: "Role",
    type: "object",
  },
  {
    field: "plan",
    headerName: "Plan",
    type: "string",
  },
  {
    field: "billing",
    headerName: "Billing",
    type: "string",
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
  },
  {
    field: "grade",
    headerName: "Grade",
    type: "number",
  },
  {
    field: "action",
    headerName: "Actions",
    type: "action",
  },
];

const data: DataType[] = [
  {
    user: "John Doe",
    role: { value: "Admin", render: <></> },
    plan: "Premium",
    billing: "$29.99/month",
    status: "Active",
    grade: 5,
    action: (
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 hover:text-red-700 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 hover:text-primary cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </div>
    ),
  },
  {
    user: "Jane Smith",
    role: { value: "User", render: <></> },
    plan: "Basic",
    billing: "$9.99/month",
    status: "Active",
    grade: 2,
    action: <></>,
  },
  {
    user: "Sam Johnson",
    role: { value: "User", render: <></> },
    plan: "Standard",
    billing: "$19.99/month",
    status: "Inactive",
    grade: 20,
    action: <></>,
  },
  // Additional records...
  {
    user: "Alice Brown",
    role: { value: "Admin", render: <></> },
    plan: "Premium",
    billing: "$29.99/month",
    status: "Active",
    grade: 7,
    action: <></>,
  },
  {
    user: "Bob White",
    role: { value: "User", render: <></> },
    plan: "Basic",
    billing: "$9.99/month",
    status: "Active",
    grade: 4,
    action: <></>,
  },
  {
    user: "Eve Green",
    role: { value: "User", render: <></> },
    plan: "Standard",
    billing: "$19.99/month",
    status: "Inactive",
    grade: 15,
    action: <></>,
  },
  {
    user: "Michael Lee",
    role: { value: "Admin", render: <></> },
    plan: "Premium",
    billing: "$29.99/month",
    status: "Active",
    grade: 9,
    action: <></>,
  },
  {
    user: "Emily Davis",
    role: { value: "User", render: <></> },
    plan: "Basic",
    billing: "$9.99/month",
    status: "Active",
    grade: 6,
    action: <></>,
  },
  {
    user: "William Martinez",
    role: { value: "User", render: <></> },
    plan: "Standard",
    billing: "$19.99/month",
    status: "Inactive",
    grade: 11,
    action: <></>,
  },
  {
    user: "Sophia Anderson",
    role: { value: "Admin", render: <></> },
    plan: "Premium",
    billing: "$29.99/month",
    status: "Active",
    grade: 8,
    action: <></>,
  },
  {
    user: "James Taylor",
    role: { value: "User", render: <></> },
    plan: "Basic",
    billing: "$9.99/month",
    status: "Active",
    grade: 3,
    action: <></>,
  },
  {
    user: "Olivia Hernandez",
    role: { value: "User", render: <></> },
    plan: "Standard",
    billing: "$19.99/month",
    status: "Inactive",
    grade: 14,
    action: <></>,
  },
  {
    user: "Benjamin Walker",
    role: { value: "Admin", render: <></> },
    plan: "Premium",
    billing: "$29.99/month",
    status: "Active",
    grade: 10,
    action: <></>,
  },
  {
    user: "Isabella King",
    role: { value: "User", render: <></> },
    plan: "Basic",
    billing: "$9.99/month",
    status: "Active",
    grade: 7,
    action: <></>,
  },
  {
    user: "Liam Scott",
    role: { value: "User", render: <></> },
    plan: "Standard",
    billing: "$19.99/month",
    status: "Inactive",
    grade: 16,
    action: <></>,
  },
];

export default function DataGrid() {
  const [filteredData, setFilteredData] = useState<any>(data);
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [filters, setFilters] = useState<Filtering>({
    pagination: {
      recordsPerPage: 5,
      pageNumber: 1,
    },
  } as Filtering);

  const triggerFilter = (newFilters: Filtering) => {
    let tempData: DataType[] = data;

    if (newFilters.searchTerm && newFilters.searchTerm.length > 0)
      tempData = filterBySearchTerm(newFilters.searchTerm, tempData, columns);

    if (newFilters.sorting) {
      if (
        newFilters.sorting.type === "string" ||
        newFilters.sorting.type === "object"
      )
        tempData = sortByString(tempData, newFilters.sorting);
      if (newFilters.sorting.type === "number")
        tempData = sortByNumber(tempData, newFilters.sorting);
    }
    setFilters({ ...newFilters });
    setFilteredData([...tempData]);
    setPaginatedData(paginateResult(tempData, filters.pagination));
    console.log(newFilters);
  };

  return (
    <GridContext.Provider
      value={{
        triggerFilter,
        filteringParams: filters,
        filteredData,
      }}
    >
      <div>
        <TableHead />

        <table width="100%">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <Column key={index} column={column} />
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row: DataType, rowIndex: number) => (
              <tr
                className="border-bottom text-start px-5  text-light-grey font-medium text-sm "
                key={rowIndex}
              >
                {columns.map((column, colIndex) => (
                  <td
                    width={`${100 / columns.length}%`}
                    key={colIndex}
                    className="px-5 py-3"
                  >
                    <>
                      {column.type === "object"
                        ? row[column.field].value
                        : row[column.field]}
                    </>
                  </td>
                ))}
              </tr>
            ))}
            <tr
              className={`border-bottom text-start px-5  text-light-grey font-medium text-sm  ${
                paginatedData.length === 0 ? "initial" : "hidden"
              }`}
            >
              <td colSpan={columns.length} className="px-5 py-3 text-center">
                No matching records found
              </td>
            </tr>
          </tbody>
        </table>
        <TableFooter />
      </div>
    </GridContext.Provider>
  );
}
