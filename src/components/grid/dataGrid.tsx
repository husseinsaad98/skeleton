"use client";

import { createContext, useEffect, useState } from "react";
import Column from "./column";
import { FieldConfig } from "./grid";
import { GridContext } from "./gridContext";
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
const data = [
  {
    user: "John Doe",
    role: { value: "Admin", render: <></> },
    plan: "Premium",
    billing: "$29.99/month",
    status: "Active",
    grade: 5,
    action: <></>,
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
];
export default function DataGrid() {
  const [tableData, setTableData] = useState<any>(data);

  const updateState = (newValue: any) => {
    setTableData([...newValue]);
  };

  return (
    <GridContext.Provider value={{ tableData, updateState }}>
      <div>
        <div className="flex justify-between px-5 py-5 border-bottom">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
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
        <table width="100%">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <Column key={index} column={column} />
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row: any, rowIndex) => (
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
          </tbody>
        </table>
      </div>
    </GridContext.Provider>
  );
}
