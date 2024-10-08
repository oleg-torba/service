import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          I-SERV
        </Link>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>Послуги</li>
          <li className={styles.navItem}>Про нас</li>
          <li className={styles.navItem}>Контакти</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
