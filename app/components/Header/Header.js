import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">MY-SERVICE</Link>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/search" className={styles.navLink}>
              Послуги
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
              Про нас
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              Контакти
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
