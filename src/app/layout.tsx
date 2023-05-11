import { motion } from "framer-motion";
import "./globals.css";

export const metadata = {
  title: "Hubspot",
  description: "Generated by John",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased transition-transform ease-in-out duration-300">
        <main>{children}</main>
      </body>
    </html>
  );
}
