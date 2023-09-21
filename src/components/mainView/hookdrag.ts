import reducerHook from "./hookReducer";
import { useReducer, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, DragEvent } from "./types";
import { verifyFile } from "./utils";

function useDragAndDrop() {
  const [data, dispatch] = useReducer(reducerHook, {
    dropped: false,
    file: { body: null, error: null },
    isDragging: false,
  });
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()!;
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "SET_IS_DRAGGING",
      dropped: false,
      isDragging: true,
      file: null,
    });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "SET_IS_DRAGGING",
      isDragging: false,
      file: null,
      dropped: false,
    });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    const fileUploaded = e.dataTransfer.files;
    setIsLoading(true);
    // ensure a file or files are dropped
    const { state, error } = await verifyFile(
      fileUploaded,
      searchParams.toString()
    );

    if (error || state.file === null) {
      dispatch(state);
      return setIsLoading(false);
    }

    router.push("/image?" + state.file.body);
  };

  const handleFileChange = async (e: ChangeEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fileUploaded = e.target.files;
    setIsLoading(true);

    const { state, error } = await verifyFile(
      fileUploaded,
      searchParams.toString()
    );

    if (error || state.file === null) {
      dispatch(state);
      return setIsLoading(false);
    }

    router.push("/image?" + state.file.body);
  };

  return {
    data,
    isloading,
    methods: {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
    },
  };
}

export default useDragAndDrop;
