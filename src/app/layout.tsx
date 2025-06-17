import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Q5 - NASA Explorer",
  description: "Discover astronomy and space exploration with data directly from NASA’s APIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
