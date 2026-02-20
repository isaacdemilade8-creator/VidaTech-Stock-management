import { useContext } from "react";
import { StoreContext } from "./StoreContextFile";

export function useStore() {
  return useContext(StoreContext);
}
