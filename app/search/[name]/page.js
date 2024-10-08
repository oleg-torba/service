"use client";

import Loader from "@/app/components/Loader/Loader";
import { useEffect, useState } from "react";
import { showToast } from "@/app/components/Notifications/Notifications";
import CategoryList from "@/app/components/Category/CategoryDrop";

const Parts = ({ query }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?query=${query}`);
        if (!res.ok) {
          throw new Error("Помилка виконання запиту");
        }

        const responseData = await res.json();

        if (!responseData) {
          setData([]);
          showToast(
            "Дані не знайдені або мають неправильну структуру",
            "error"
          );
          return;
        }

        const itemsArray = responseData[0].items;

        const categoryIds = [
          52804, 5090313, 5090321, 5090210, 5090214, 5090212, 5090312, 5090213,
          5090318, 5090309, 380230, 5090311, 5090315,
        ];

        const fullArray = itemsArray
          .filter(
            (data) =>
              categoryIds.includes(data.categoryId) &&
              data.available === true &&
              data.name.toLowerCase().includes(query.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name));
        if (fullArray.length === 0) {
          showToast(`По запиту ${query} нічого не знайдено`, "error");
        } else {
          showToast(`Знайдено ${fullArray.length} позицій`, "success");
        }

        setData(
          fullArray.filter(
            (data) =>
              !data.name.includes("MECHANIC") &&
              !data.name.includes("Шлейф для тестера") &&
              !data.name.includes("для програматора") &&
              !data.name.includes("без шлейфа") &&
              !data.name.includes("INCELL") &&
              !data.name.includes("скотч для фіксації") &&
              !data.name.includes("в упаковці") &&
              !data.name.includes("TORNADO") &&
              !data.name.includes("Mechanic") &&
              !data.name.includes("TOTA") &&
              !data.name.includes("Уцінка") &&
              !data.name.includes("Набір") &&
              !data.name.includes("Програматор") &&
              !data.name.includes("Скло дисплея")
          )
        );
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  if (loading) return <Loader />;

  return <div>{data.length > 0 && <CategoryList itemsArray={data} />}</div>;
};
export default Parts;
