"use Client";
import { useContext, useState } from "react";
import { FieldConfig } from "./grid";
import { useContextStore } from "./gridContext";

export default function Column({ column }: { column: FieldConfig }) {
  const [sortType, setSortType] = useState<"asc" | "desc" | "none">("none");
  let { tableData, updateState } = useContextStore();
  const getNextSortType = (
    currentSortType: "asc" | "desc" | "none"
  ): "asc" | "desc" | "none" => {
    switch (currentSortType) {
      case "asc":
        return "desc";
      case "desc":
        return "none";
      case "none":
        return "asc";
      default:
        return "none";
    }
  };

  const sortByString = (sortBy: "asc" | "desc" | "none") => {
    return tableData.sort((a, b) => {
      if (column.type === "action") return;

      const firstValue =
        column.type === "object"
          ? a[column.field]["value"].toUpperCase()
          : a[column.field].toUpperCase();
      const secondValue =
        column.type === "object"
          ? b[column.field]["value"].toUpperCase()
          : b[column.field].toUpperCase();

      if (firstValue < secondValue) {
        return sortBy === "asc" ? -1 : 1;
      }
      if (firstValue > secondValue) {
        return sortBy === "asc" ? 1 : -1;
      }
      return 0;
    });
  };
  function sortByNumber(sortBy: "asc" | "desc" | "none"): any[] {
    if (sortBy === "asc")
      return tableData
        .slice()
        .sort((a, b) => a[column.field] - b[column.field]);
    else
      return tableData
        .slice()
        .sort((a, b) => b[column.field] - a[column.field]);
  }
  const handleSorting = () => {
    if (column.type === "action") return;

    const nextSortType = getNextSortType(sortType);
    setSortType(nextSortType);

    let tempData: any[] = [];

    if (column.type === "string" || column.type === "object")
      tempData = sortByString(nextSortType);
    if (column.type === "number") tempData = sortByNumber(nextSortType);

    updateState(tempData);
  };

  return (
    <th
      width="(100/x)%"
      className="border-bottom text-start px-5 py-3 text-light-grey font-medium text-sm uppercase cursor-pointer"
      key={column.field}
      onClick={handleSorting}
    >
      {column.headerName}
    </th>
  );
}
