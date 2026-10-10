"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartButton() {
  const { totalCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Alışveriş Çantası, ${totalCount} ürün`}
      className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer group flex items-center"
    >
      <ShoppingBag className="size-4.5 stroke-[1.5] group-hover:scale-105 transition-transform" />
      {totalCount > 0 && (
        <span className="absolute top-1 right-1 size-4 rounded-full bg-stone-900 text-white text-[9px] font-semibold flex items-center justify-center animate-in zoom-in-50 duration-150">
          {totalCount}
        </span>
      )}
    </button>
  );
}
