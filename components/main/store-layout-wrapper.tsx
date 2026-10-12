"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/main/header";
import Footer from "@/components/main/footer";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/main/cart-drawer";
import FloatingWhatsApp from "@/components/main/floating-whatsapp";

export default function StoreLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </CartProvider>
  );
}
