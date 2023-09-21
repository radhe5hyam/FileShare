"use client";
import styles from "./page.module.css";
import Image from "next/image";
import LoadingCard from "../loading/loading";
import useDragAndDrop from "./hookdrag";

export const MainCard = () => {
  const { data, isloading, methods } = useDragAndDrop();

  return isloading ? (
    <LoadingCard />
  ) : (
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
            onDragEnter={methods.handleDragEnter}
            onDragOver={methods.handleDragOver}
            onDragLeave={methods.handleDragLeave}
            onDrop={methods.handleDrop}
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
            <input
              type="file"
              name="file"
              id="file"
              hidden
              onChange={methods.handleFileChange}
            />
            Choose a file
          </label>
        </form>
      </div>
    </section>
  );
};
