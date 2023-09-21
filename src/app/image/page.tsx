import { ImageUploaded } from "@/components/cardSuccess/cardImage";
import styles from "./page.module.css";

export default function CardContainer({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  if (!searchParams) {
    return;
  }
  const data = searchParams.image;

  return (
    <section className={styles.mainContainer}>
      <ImageUploaded url={data} />
    </section>
  );
}
