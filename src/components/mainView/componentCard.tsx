"use client";
import styles from "./page.module.css";
import Image from "next/image";
import reducerHook from "./hookReducer";
import { useReducer } from "react";
import getUrl from "@/services/uploadImage";

enum FileTypes {
  Jpeg = "image/jpeg",
  Png = "image/png",
}

export const MainCard = () => {
  const [data, dispatch] = useReducer(reducerHook, {
    dropped: false,
    file: null,
    isDragging: false,
  });
  // console.log(location.origin);
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("enter to the zone");
    dispatch({
      type: "SET_IS_DRAGGING",
      dropped: false,
      isDragging: true,
      file: null,
    });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leave the zone");
    dispatch({
      type: "SET_IS_DRAGGING",
      isDragging: false,
      file: null,
      dropped: false,
    });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("over the zone");
    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    // dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer.files);
    // get files from event on the dataTransfer object as an array
    const fileUploded = e.dataTransfer.files;

    // ensure a file or files are dropped
    if (!fileUploded) {
      dispatch({
        type: "SET_IN_DROP_ZONE",
        isDragging: false,
        file: null,
        dropped: false,
      });
      return;
    }

    if (
      (fileUploded.length > 0 && fileUploded[0]?.type === FileTypes.Jpeg) ||
      fileUploded[0]?.type === FileTypes.Png
    ) {
      // loop over existing files
      const newFormData = new FormData();
      newFormData.append("file", fileUploded[0]);
      console.log(newFormData);
      // dispatch action to add droped file or files to fileList
      const dat = await getUrl(newFormData);
      console.log(dat);
      dispatch({
        type: "SET_IN_DROP_ZONE",
        isDragging: false,
        file: fileUploded[0],
        dropped: true,
      });
      console.log("drop the zone");
      // reset inDropZone to false
      // dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
    dispatch({
      type: "SET_IN_DROP_ZONE",
      isDragging: false,
      file: null,
      dropped: false,
    });
  };
  return (
    <section className={styles.mainCard}>
      <div className={styles.container}>
        <div className={styles.cardHeader}>
          <h1>Upload your image</h1>
          <p>File should be Jpeg,Png,..</p>
        </div>
        <form className={styles.form} action="" method="post">
          <div
            className={`${styles.area} ${
              data.isDragging ? styles["area--active"] : null
            }`}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDrop(e)}
          >
            <Image
              src="/image.svg"
              width={114}
              height={88}
              alt="logo-Drag&Drop"
            />
            <span>Drag & Drop your image here</span>
          </div>
          <span>or</span>
          <label htmlFor="file" className={styles.btn}>
            <input type="file" name="file" id="file" hidden />
            Choose a file
          </label>
        </form>
      </div>
    </section>
  );
};
