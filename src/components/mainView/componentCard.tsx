"use client";
import styles from "./page.module.css";
import Image from "next/image";

export const MainCard = () => {
  function onChange(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (e && e.target && e.target) {
      console.log(e.target);
    }
  }
  return (
    <section className={styles.mainCard}>
      <div className={styles.container}>
        <div className={styles.cardHeader}>
          <h1>Upload Image</h1>
          <p>File should be Jpeg,Png,..</p>
        </div>
        <form className={styles.form} action="" method="post">
          <div className={styles.area}>
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
