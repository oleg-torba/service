import mongoose from "mongoose";
import xml2js from "xml2js";
import Product from "../components/Mongo/ServiceModel"; // Залишаємо імпорт
import axios from "axios"; // Використовуємо ES6 імпорт

// Функція для перетворення потоку в рядок
async function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", (error) => reject(error));
  });
}

// Основна функція для оновлення MongoDB
export async function updateMongoDB() {
  // Використовуємо export для Next.js
  try {
    const response = await axios({
      method: "get",
      url: "https://gsm-forsage.com.ua/dealerPartImagesPromUSD.xml",
      responseType: "stream",
    });

    const xmlData = await streamToString(response.data);
    const jsonData = await xml2js.parseStringPromise(xmlData);

    // Очищуємо колекцію продуктів
    await Product.deleteMany({});

    // Отримуємо валюти
    const currencies =
      jsonData.shop.currencies?.[0]?.currency?.map((curr) => ({
        id: curr.$.id,
        rate: parseFloat(curr.$.rate),
      })) || [];

    // Отримуємо категорії
    const categories =
      jsonData.shop.categories?.[0]?.category?.map((cat) => ({
        id: cat.$.id,
        portal_id: cat.$.portal_id,
        name: cat._,
      })) || [];

    // Отримуємо продукти
    const items =
      jsonData.shop.items?.[0]?.item?.map((item) => ({
        id: item.$.id,
        selling_type: item.$.selling_type,
        presence_sure: item.$.presence_sure === "true",
        name: item.name?.[0] || "",
        description_ua: item.description_ua?.[0] || "",
        categoryId: item.categoryId?.[0] || "",
        portal_category_id: item.portal_category_id?.[0] || "",
        price: parseFloat(item.price?.[0]) || 0,
        image: item.image?.[0] || "",
        vendor: item.vendor?.[0] || "",
        vendorCode: item.vendorCode?.[0] || "",
        available: item.available?.[0] === "true",
        quantity_in_stock: parseInt(item.quantity_in_stock?.[0]) || 0,
        params:
          item.param?.map((param) => ({
            name: param.$.name,
            value: param._,
            _id: new mongoose.Types.ObjectId(), // Створюємо ObjectId для кожного параметра
          })) || [],
      })) || [];

    // Зберігаємо в MongoDB
    await Product.create({
      currencies,
      categories,
      items,
    });

    console.log("Дані успішно вставлені в базу даних MongoDB.");
  } catch (error) {
    console.error("Помилка:", error);
  }
}

export default updateMongoDB;
