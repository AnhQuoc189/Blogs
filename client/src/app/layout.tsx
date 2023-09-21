"use client";

import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

//components
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "src/components/Header";
import AppFooter from "src/components/Footer";
import Container from "react-bootstrap/Container";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//redux
import { Provider } from "react-redux";
import store from "src/redux/store";

import { motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <div className="flex flex-1 flex-col justify-between">
            <AppHeader />
            <Container>{children}</Container>
            <AppFooter />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Provider>
      </body>
    </html>
  );
}
