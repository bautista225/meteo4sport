import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // import font
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { FooterBar } from "@/components/Footer";

export const metadata: Metadata = {
  title: "meteo4sport",
  description:
    "¡Consulta el tiempo y prepara tu próxima carrera al aire libre con la IA integrada!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.className} antialiased`}>
      <link rel="icon" href="/favicon_2.svg" sizes="any" />
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body className="dark:bg-gray-950 flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="white">
          <Navbar />
          <div className="flex flex-1 justify-center">{children}</div>
          <FooterBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
