// app/layout.js
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import "./globals.css";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="uk" className={inter.className}>
//       <Head>
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//         <meta
//           name="keywords"
//           content="ремонт телефонів, ремонт смартфонів Львів, заміна дисплея, заміна акумулятора, сервіс телефонів, ремонт iPhone, ремонт Xiaomi, ремонт Huawei"
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="robots" content="index, follow" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <body>
//         <Suspense fallback={<Loader />}>
//           <header>
//             <Header />
//           </header>
//           <main>{children}</main>
//           <ToastContainer />
//         </Suspense>
//       </body>
//     </html>
//   );
// }

export const metadata = {
  title: "Послуги з ремонту телефонів у Львові | Ваш надійний сервіс",
  description:
    "Надійний ремонт смартфонів у Львові. Якісне обслуговування, швидкий ремонт дисплеїв, акумуляторів та інших комплектуючих.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={inter.className}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="keywords"
          content="ремонт телефонів, ремонт смартфонів Львів, заміна дисплея, заміна акумулятора, сервіс телефонів, ремонт iPhone, ремонт Xiaomi, ремонт Huawei"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="./favicon.ico" />
      </Head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
