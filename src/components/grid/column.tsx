"use Client";
import { useState } from "react";
import { FieldConfig } from "./gridModels";
import { useContextStore } from "./gridContext";

export default function Column({ column }: { column: FieldConfig }) {
  const [sortType, setSortType] = useState<"asc" | "desc" | "none">("none");
  let { triggerFilter, filteringParams } = useContextStore();

  const getNextSortType = (
    currentSortType: "asc" | "desc" | "none"
  ): "asc" | "desc" | "none" => {
    switch (currentSortType) {
      case "asc":
        return "desc";
      default:
        return "asc";
    }
  };

  const handleSorting = () => {
    if (column.type === "action") return;

    const nextSortType = getNextSortType(sortType);
    setSortType(nextSortType);

    filteringParams.sorting = {
      field: column.field,
      sortType: nextSortType,
      type: column.type,
    };

    triggerFilter(filteringParams);
  };

  return (
    <th
      className={`border-bottom text-start px-5 py-3 text-light-grey font-medium text-sm uppercase  ${
        column.type !== "action" && "cursor-pointer"
      }`}
      key={column.field}
      onClick={handleSorting}
    >
      <div className="flex justify-between">
        {column.headerName}
        <div
          className={`flex flex-col ${column.type === "action" && "hidden"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-2 h-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-2 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </th>
  );
}
