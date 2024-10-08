import { model, models, Schema } from "mongoose";

const itemSchema = new Schema({
  name: String,
  description_ua: String,
  categoryId: Number,
  portal_category_id: Number,
  price: Number,
  image: String,
  vendor: String,
  vendorCode: String,
  available: Boolean,
  quantity_in_stock: Number,
  param: String,
});

const productSchema = new Schema(
  {
    currencies: [
      {
        id: String,
        rate: Number,
      },
    ],
    categories: [
      {
        id: String,
        portal_id: String,
        name: String,
      },
    ],
    items: [itemSchema],
  },
  { timestamps: true }
);

const Product = models.parts || model("parts", productSchema);

export default Product;
