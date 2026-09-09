import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '900']
})

export const metadata: Metadata = {
  title: "Tienda de comida Next.js con App Router y Prima",
  description: "Tienda de comida Next.js con App Router y Prima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} bg-gray-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
