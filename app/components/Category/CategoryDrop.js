import { useState } from "react";
import Image from "next/image";
import styles from "../../search/search.module.css";

const CategoryList = ({ itemsArray }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [closingItem, setClosingItem] = useState(null);
  const categories = [
    "Акумулятори",
    "Дисплеї",
    "Камери",
    "Динаміки",
    "Задні кришки",
    "Роз'єми та плати зарядки",
  ];

  const filterByCategory = (categoryName) => {
    return itemsArray.filter((item) => {
      const itemName = item.name.toLowerCase();

      if (categoryName === "Дисплеї") {
        return itemName.includes("дисплей");
      }
      if (categoryName === "Акумулятори") {
        return itemName.includes("акумулятор");
      }
      if (categoryName === "Динаміки") {
        return itemName.includes("динамік") || itemName.includes("бузер");
      }
      if (categoryName === "Камери") {
        return itemName.includes("камера");
      }
      if (categoryName === "Роз'єми та плати зарядки") {
        return (
          itemName.includes("роз'єм зарядки") ||
          itemName.includes("з платкою") ||
          itemName.includes("зарядки")
        );
      }
      if (categoryName === "Задні кришки") {
        return (
          itemName.includes("задня частина") ||
          itemName.includes("кришка задня")
        );
      }
    });
  };

  const toggleCategory = (category) => {
    if (activeCategory === category) {
      setClosingItem(category);
      setTimeout(() => {
        setActiveCategory(null);
        setClosingItem(null);
      }, 250);
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <div>
      {categories.map((category) => {
        const filteredItems = filterByCategory(category);
        const isActive = activeCategory === category;

        return (
          <div key={category}>
            <div
              className={styles.categoryTitle}
              onClick={() => toggleCategory(category)}
            >
              <h2>
                {category} ({filteredItems.length})
              </h2>
            </div>
            {isActive && (
              <ul className={styles.itemsList}>
                {filteredItems.map((item) => {
                  let basePrice = item.price;

                  if (item.name.includes("Дисплей")) {
                    basePrice += 20;
                  } else if (item.name.includes("Шлейф")) {
                    basePrice += 10;
                  } else if (
                    item.name.includes("Динамік") ||
                    item.name.includes("Бузер") ||
                    item.name.includes("Кришка задня") ||
                    item.name.includes("Роз'єм") ||
                    item.name.includes("з платкою") ||
                    item.name.includes("Камера") ||
                    item.name.includes("Задня частина") ||
                    item.name.includes("Акумулятор")
                  ) {
                    basePrice += 10;
                  }

                  const finalPrice = (basePrice * 41.3).toFixed(2);

                  return (
                    <li
                      key={item.id}
                      className={
                        closingItem === category
                          ? `${styles.partItem} ${styles.partItemClosing}`
                          : styles.partItem
                      }
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className={styles.partImage}
                      />
                      <div className={styles.partsBlock}>
                        <h3 className={styles.partName}>{item.name}</h3>
                        <p className={styles.partPrice}>
                          Ціна: {finalPrice} грн
                        </p>
                        <p className={styles.partWarranty}>
                          Гарантія: 1 місяць
                        </p>
                        <p className={styles.partWarranty}>
                          Наявність: {item.quantity_in_stock} шт.
                        </p>
                        {item.name.toLowerCase().includes("oled") && (
                          <p className={styles.partDescription}>
                            Короткий опис: OLED Хороший замінник AMOLED дисплею.
                            Забезпечує яскраві кольори, високу контрастність та
                            глибокі чорні відтінки. Кожен піксель світиться
                            окремо, що робить зображення більш живим.
                          </p>
                        )}
                        {item.name.toLowerCase().includes("prc") &&
                          item.name.toLowerCase().includes("дисплей") && (
                            <p className={styles.partDescription}>
                              Короткий опис: це тип дисплеїв, які виготовляються
                              в Китаї. Вони часто використовуються в бюджетних
                              моделях телефонів і мають різний рівень якості.
                              PRC дисплеї іноді не відповідають стандартам, які
                              притаманні оригінальним екранам.
                            </p>
                          )}
                        {(item.name.toLowerCase().includes("amoled") ||
                          item.name.includes("Service Pack") ||
                          (item.name.includes("OR") &&
                            item.name.toLowerCase().includes("дисплей") &&
                            !item.name.includes("REF"))) && (
                          <p className={styles.partDescription}>
                            Короткий опис: Оригінальний дисплей. Є відмінним
                            вибором для глядачів, які шукають яскраві, чіткі та
                            насичені кольори в своїх пристроях. Вони часто
                            використовуються в сучасних смартфонах та
                            телевізорах, що підвищує загальний користувацький
                            досвід.
                          </p>
                        )}
                        {item.name.includes("REF") && (
                          <p className={styles.partDescription}>
                            Короткий опис: REF дисплеї (Refurbished) — це
                            відновлені екрани, які були попередньо використані,
                            перевірені та відновлені до первісного стану. Вони
                            проходять ретельну перевірку якості та заміну
                            зношених компонентів, що дозволяє забезпечити високу
                            продуктивність. REF дисплеї є економічно вигідним
                            варіантом для тих, хто шукає доступний та якісний
                            замінник оригінального дисплею, зберігаючи при цьому
                            належний рівень якості зображення та
                            кольоропередачі.
                          </p>
                        )}
                        {item.name.includes("Дисплей") &&
                          !item.name.includes("REF") &&
                          !item.name.includes("amoled") &&
                          !item.name.includes("Service Pack") &&
                          !item.name.includes("OR") &&
                          !item.name.includes("PRC") && (
                            <p className={styles.partDescription}>
                              Короткий опис: бюджетний варіант, часто
                              використовуються у недорогих замінах. Вони мають
                              обмежені кути огляду і меншу контрастність у
                              порівнянні з іншими типами дисплеїв.
                            </p>
                          )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
