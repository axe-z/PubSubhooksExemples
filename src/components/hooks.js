import { useContext } from "react";
import monContext from "../context";

//pour skipper l import du hooks partout.
export const useCustomContext = () => {
  return useContext(monContext);
};
