import { Reducer } from "react";

type IssuesInitialState = {
  dropped: boolean;
  file: File | null;
  isDragging: boolean;
  // isUploading: boolean;
};
type IssuesAction = {
  type: string;
  dropped: boolean;
  file: File | null;
  isDragging: boolean;
  // isUploading: boolean;
};

const reducerHook: Reducer<IssuesInitialState, IssuesAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_IN_DROP_ZONE":
      return { ...state, dropped: action.dropped, isDragging: false };
    case "ADD_FILE_TO_LIST":
      return { ...state, file: action.file };
    case "SET_IS_DRAGGING":
      return { ...state, isDragging: action.isDragging };
    // case "SET_IS_UPLOADING":
    //   return { ...state, isUploading: action.isUploading };
    default:
      return state;
  }
};

export default reducerHook;
