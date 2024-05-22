import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Layout/Providers";

export const metadata: Metadata = {
  title: "Guardify",
  description: "",
  icons: [
    {
      rel: "icon",
      url: "favicon.ico",
      sizes: "any",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
