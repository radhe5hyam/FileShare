import styles from "./page.module.css";
import { MainCard } from "@/components/mainView/componentCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <MainCard />
    </main>
  );
}
