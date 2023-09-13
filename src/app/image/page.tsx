import { ImageUploded } from "@/components/cardSucces/cardImage";
import styles from "./page.module.css";
export default async function CardContainer() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <section className={styles.mainContainer}>
      <ImageUploded />
    </section>
  );
}
