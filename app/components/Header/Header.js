import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        {/* <Link href="/" className={styles.logoLink}>
       href='./'
                          alt={item.name}
                          width={200}
                          height={200}
                          className={styles.partImage}
        </Link> */}
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
