import { dbConnect } from "@/app/lib/lmongodb";
import Product from "../../components/Mongo/ServiceModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  try {
    await dbConnect();

    const services = await Product.find(
      query
        ? { items: { $elemMatch: { name: { $regex: query, $options: "i" } } } }
        : {}
    ).exec();

    if (services.length > 0) {
      return NextResponse.json(services);
    } else {
      return NextResponse.json(
        { message: "Нічого не знайдено" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Помилка сервера", details: error.message },
      { status: 500 }
    );
  }
}
