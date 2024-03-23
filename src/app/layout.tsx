import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Layout/Providers";

export const metadata: Metadata = {
  title: "Guardify",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={"favicon.ico"} sizes="any" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
