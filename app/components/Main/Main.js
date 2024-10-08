"use client";

import styles from "./Main.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import SearchForm from "../SearchForm/Search";
import Parts from "../../search/[name]/page";
import { useState, useEffect } from "react";

const Main = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const query = searchParams.get("query") ?? "";
    setSearchQuery(query);
  }, [searchParams]);

  const formSubmit = (newQuery) => {
    if (newQuery === searchQuery) return;

    router.push(`/?query=${encodeURIComponent(newQuery)}`);
  };
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Ремонт телефонів у Львові</h1>
        <p>
          Ми пропонуємо швидкий та якісний ремонт телефонів у Львові. Наша
          команда спеціалістів використовує лише оригінальні запчастини і надає
          гарантію на всі види послуг.
        </p>
      </section>
      <section>
        <div className={styles.searchBlock}>
          <h1>Пошук запчастин та види ремонту</h1>
          <SearchForm onSubmit={formSubmit} />
          <Parts query={searchQuery} />
        </div>
      </section>
      <section className={styles.services}>
        <h2>Наші послуги</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Заміна екрану та скла дисплею</li>
          <li className={styles.listItem}>Ремонт пошкоджень водою</li>
          <li className={styles.listItem}>Заміна батареї</li>
          <li className={styles.listItem}>Проблеми з зарядним портом</li>
          <li className={styles.listItem}>Прошивка та оновлення ПЗ</li>
        </ul>
      </section>

      <section className={styles.benefits}>
        <h2>Чому обирають нас?</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Гарантія на всі види робіт</li>
          <li className={styles.listItem}>Швидкий ремонт протягом 24 годин</li>
          <li className={styles.listItem}>Тільки оригінальні запчастини</li>
          <li className={styles.listItem}>Зручне розташування у Львові</li>
        </ul>
      </section>

      <section className={styles.faq}>
        <h2>Часті питання</h2>
        <div className={styles.faqItem}>
          <h3>Який час ремонту телефону?</h3>
          <p>
            Зазвичай ремонт займає від 1 до 3 годин в залежності від складності
            проблеми.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h3>Чи є гарантія на ремонт?</h3>
          <p>Так, ми надаємо гарантію на всі види ремонтних робіт.</p>
        </div>
      </section>

      <section className={styles.aboutUs}>
        <h2>Про нас</h2>
        <p>
          Наша компанія була заснована у 2010 році і за цей час ми стали одними
          з провідних постачальників послуг ремонту телефонів у Львові. Ми
          прагнемо забезпечити високоякісний сервіс для кожного клієнта.
        </p>
      </section>

      <section className={styles.specialOffers}>
        <h2>Спеціальні пропозиції</h2>
        <p>
          Зараз у нас діє акція: знижка 10% на всі види ремонту при
          пред&apos;явленні цього повідомлення.
        </p>
      </section>

      <section className={styles.contact}>
        <h2>Зв&apos;яжіться з нами</h2>
        <p>Телефон: +380 98 123 4567</p>
        <p>Email: info@myphonerepair.com</p>
      </section>
    </main>
  );
};

export default Main;
