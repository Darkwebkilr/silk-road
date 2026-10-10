import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/main/header";
import Footer from "@/components/main/footer";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/main/cart-drawer";
import FloatingWhatsApp from "@/components/main/floating-whatsapp";
import TopLoader from "@/components/ui/top-loader";

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
    default: "Atelier Silk | Özel Kadın Giyim & Yeni Sezon Butik",
    template: "%s | Atelier Silk",
  },
  description:
    "Özel tasarım keten elbiseler, kruvaze blazer ceketler ve dökümlü takımlar Atelier Silk'te. Şeffaf kargo ve 14 gün değişim garantisi.",
  keywords: [
    "butik giyim",
    "kadın giyim",
    "instagram butik",
    "keten elbise",
    "blazer ceket",
    "keten takım",
    "şeffaf kargo",
    "yeni sezon",
  ],
  authors: [{ name: "Atelier Silk" }],
  openGraph: {
    title: "Atelier Silk | Özel Kadın Giyim & Yeni Sezon",
    description: "Zamansız butik parçaları, şeffaf kargo ve aynı gün teslimat avantajıyla.",
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
      <body className="min-h-full flex flex-col bg-white text-stone-900 selection:bg-stone-900 selection:text-white">
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
