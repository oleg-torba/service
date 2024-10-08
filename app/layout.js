import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import "./globals.css";
export const metadata = {
  title: "Послуги з ремонту телефонів у Львові | Ваш надійний сервіс",
  description:
    "Надійний ремонт смартфонів у Львові. Якісне обслуговування, швидкий ремонт дисплеїв, акумуляторів та інших комплектуючих.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <meta name="description" content={metadata.description} />
        <meta
          name="keywords"
          content="ремонт телефонів, ремонт смартфонів Львів, заміна дисплея, заміна акумулятора, сервіс телефонів, ремонт iPhone, ремонт Xiaomi, ремонт Huawei"
        ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow"></meta>
      </head>
      <body className={inter.className}>
        <header>
          <Header />
        </header>
        <main>{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}
