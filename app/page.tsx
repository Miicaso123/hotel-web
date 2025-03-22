import Link from 'next/link';
import MainDisplay from '@/components/MainDisplay';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.main}>
      <section className={styles.home}>
        <MainDisplay />
        <div className={styles.container}>
          <div className={styles.intro}>
            <h1 className={styles.title}>
              ДОБРО ПОЖАЛОВАТЬ <br />
              <span style={{ color: 'red' }}>HOTEL</span>
            </h1>
            <p className={styles.description}>
              Экзотический, уютный отель в городе Алматы с комфортными номерами и деликатным
              сервисом
            </p>
            <Link href="/rooms" passHref>
              <button className={styles.button}>Посмотреть номера</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
