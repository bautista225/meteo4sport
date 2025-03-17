import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // import font
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "meteo4sport",
  description: "Check what you wear for your next outside running",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.className} antialiased dark:bg-gray-950`}
    >
      <body className="dark:bg-gray-950">
        <ThemeProvider
          attribute="class"
          defaultTheme="white"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
