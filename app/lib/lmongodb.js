import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://olegtorba011:o14KGgu4SVDzPWm4@cluster0.g2badxu.mongodb.net/";

if (!MONGODB_URI) {
  throw new Error("Необхідна змінна середовища MONGODB_URI не встановлена");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
