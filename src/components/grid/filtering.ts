import { DataType, FieldConfig, Pagination, Sorting } from "./gridModels";

export const filterBySearchTerm = (
  searchTerm: string,
  data: DataType[],
  columns: FieldConfig[]
) => {
  return data.filter((item) => {
    for (const column of columns) {
      const fieldValue = item[column.field];
      if (typeof fieldValue === "string" || typeof fieldValue === "number") {
        if (
          String(fieldValue).toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }
      } else if (typeof fieldValue === "object" && "value" in fieldValue) {
        const objectValue = fieldValue.value;
        if (
          typeof objectValue === "string" ||
          typeof objectValue === "number"
        ) {
          if (
            String(objectValue).toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
        }
      }
    }
    return false;
  });
};

export const sortByString = (data: DataType[], sortingFilter: Sorting) => {
  return data.sort((a, b): any => {
    if (sortingFilter.type === "action") return;

    const firstValue =
      sortingFilter.type === "object"
        ? a[sortingFilter.field]["value"].toUpperCase()
        : a[sortingFilter.field].toUpperCase();
    const secondValue =
      sortingFilter.type === "object"
        ? b[sortingFilter.field]["value"].toUpperCase()
        : b[sortingFilter.field].toUpperCase();

    if (firstValue < secondValue) {
      return sortingFilter.sortType === "asc" ? -1 : 1;
    }
    if (firstValue > secondValue) {
      return sortingFilter.sortType === "asc" ? 1 : -1;
    }
    return 0;
  });
};
export const sortByNumber = (
  data: DataType[],
  sortingFilter: Sorting
): any[] => {
  if (sortingFilter.sortType === "asc")
    return data
      .slice()
      .sort((a, b) => a[sortingFilter.field] - b[sortingFilter.field]);
  else
    return data
      .slice()
      .sort((a, b) => b[sortingFilter.field] - a[sortingFilter.field]);
};

export const paginateResult = (
  data: DataType[],
  pagination: Pagination
): any[] => {
  const startIndex = (pagination.pageNumber - 1) * pagination.recordsPerPage;
  const endIndex = startIndex + pagination.recordsPerPage;
  return data.slice(startIndex, endIndex);
};
