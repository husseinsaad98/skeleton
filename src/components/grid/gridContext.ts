import { createContext, useContext } from "react";
import { DataType, FieldConfig, Filtering } from "./gridModels";

export const GridContext = createContext<{
  triggerFilter: (newFilters: Filtering) => void;
  filteringParams: Filtering;
  filteredData: DataType[];
}>({} as any);

export function useContextStore() {
  return useContext(GridContext);
}
