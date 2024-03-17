export interface FieldConfig {
  field: string;
  headerName: string;
  type: "string" | "number" | "date" | "action" | "object";
}
export type DataType = {
  [key: string]: string | number | any | JSX.Element;
};

export interface Filtering {
  searchTerm: string;
  sorting: Sorting;
  pagination: Pagination;
}
export interface Sorting {
  field: string;
  type: "string" | "number" | "date" | "action" | "object";
  sortType: "asc" | "desc" | "none";
}
export interface Pagination {
  recordsPerPage: number;
  pageNumber: number;
}
