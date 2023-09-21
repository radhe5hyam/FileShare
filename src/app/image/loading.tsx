import styles from "./page.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <section className={styles.containerCard}>
        <p>Uploading...</p>
        <div className={styles.containerLoader}>
          <div className={styles.loader}></div>
        </div>
      </section>
    </div>
  );
}
