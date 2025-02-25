import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/providers/Provider";

export const metadata: Metadata = {
  title: "To Do List",
  description: "개인 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
