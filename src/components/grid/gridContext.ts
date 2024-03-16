import { createContext, useContext } from "react";

export const GridContext = createContext<{
  tableData: any[];
  updateState: (newValue: any) => void;
}>();

export function useContextStore() {
  return useContext(GridContext);
}
