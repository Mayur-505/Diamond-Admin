import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "@/store";
import { useAppDispatch } from "./use-redux";

const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );
};

export default useActions;
