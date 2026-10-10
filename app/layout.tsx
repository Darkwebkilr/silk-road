import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/main/header";
import Footer from "@/components/main/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontSerif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Silk Road Boutique | Özel Kadın Giyim & Yeni Sezon",
    template: "%s | Silk Road Boutique",
  },
  description:
    "Instagram butiklerinden ilham alan özel tasarım elbiseler, blazer ceketler, keten takımlar ve en trend kombinler Silk Road Boutique'de. Aynı gün kargo, şeffaf kargo ve WhatsApp sipariş desteği.",
  keywords: [
    "butik giyim",
    "kadın giyim",
    "instagram butik",
    "elbise modelleri",
    "blazer ceket",
    "keten takım",
    "şeffaf kargo",
    "yeni sezon",
  ],
  authors: [{ name: "Silk Road Boutique" }],
  openGraph: {
    title: "Silk Road Boutique | Özel Kadın Giyim & Yeni Sezon",
    description: "Instagram modasının en sevilen parçaları, şeffaf kargo ve aynı gün teslimat avantajıyla.",
    type: "website",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${fontSerif.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

