import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masseter Botox 专业医疗",
  description: "专业的咬肌注射服务，安全有效",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      {children}
    </body>
  );
}
