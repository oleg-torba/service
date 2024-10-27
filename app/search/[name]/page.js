"use client";

import Loader from "@/app/components/Loader/Loader";
import { useEffect, useState } from "react";
import { showToast } from "@/app/components/Notifications/Notifications";
import CategoryList from "@/app/components/Category/CategoryDrop";
import { useSearchParams } from "next/navigation";

const Parts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("query") || "";

  useEffect(() => {
    const fetchData = async () => {
      if (search === "") {
        setData([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?query=${search}`);
        const resJson = await res.json();

        const itemsArray = resJson[0].items;
        console.log(itemsArray);
        const fullArray = itemsArray.filter((data) =>
          data.name.toLowerCase().includes(search.toLowerCase())
        );

        const categoryIds = [
          52804, 5090313, 5090321, 5090210, 5090214, 5090212, 5090312, 5090213,
          5090318, 5090309, 380230, 5090311, 5090315,
        ];

        const filteredArray = fullArray
          .filter(
            (data) =>
              categoryIds.includes(data.categoryId) &&
              data.available &&
              data.name.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name));

        if (fullArray.length === 0) {
          showToast(`По запиту ${search} нічого не знайдено`, "error");
          setData([]);
        } else {
          setData(
            filteredArray.filter(
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
                !data.name.includes("без шлейфа")
            )
          );
          showToast(`Знайдено ${filteredArray.length} позицій`, "success");
        }
      } catch (error) {
        setError(error);
        showToast("Помилка при завантаженні даних", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  if (loading) return <Loader />;

  if (error) {
    return showToast(`Помилка: ${error}`, "error");
  }

  return <div>{data.length > 0 && <CategoryList itemsArray={data} />}</div>;
};

export default Parts;
