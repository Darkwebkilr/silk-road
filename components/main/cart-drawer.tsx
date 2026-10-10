"use client";

import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Truck,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalCount,
    subtotal,
    remainingForFreeShipping,
    freeShippingProgress,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const shippingFee = remainingForFreeShipping === 0 ? 0 : 59;
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      
      <div className="relative w-full sm:max-w-md h-full bg-white shadow-2xl z-10 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        <div className="p-5 border-b border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-4.5 text-stone-900 stroke-[1.8]" />
              <h2 className="font-serif text-xl tracking-tight text-stone-950 font-normal">
                Alışveriş Çantası ({totalCount})
              </h2>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-stone-400 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="size-5" />
            </button>
          </div>

          
          <div className="mt-4 bg-[#faf9f6] p-3 border border-stone-200 text-xs">
            <div className="flex items-center justify-between font-medium text-stone-800 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="size-3.5 text-stone-700" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Ücretsiz kargo için son{" "}
                    <strong className="text-stone-950 font-bold">
                      {remainingForFreeShipping.toLocaleString("tr-TR")} TL
                    </strong>
                    !
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span>Tebrikler! Kargo Bedava 🚀</span>
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400 font-mono">
                %{freeShippingProgress}
              </span>
            </div>

            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  remainingForFreeShipping === 0
                    ? "bg-emerald-700"
                    : "bg-stone-900"
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-3">
              <ShoppingBag className="size-12 stroke-[1] text-stone-300" />
              <p className="font-serif text-xl text-stone-700">Çantanız Boş</p>
              <p className="text-xs text-stone-500 max-w-xs font-light">
                Yeni sezon lookbook parçalarından dilediğinizi ekleyin.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-stone-950 text-white text-xs tracking-widest uppercase font-medium"
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 pb-4 border-b border-stone-100"
              >
                
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-20 object-cover bg-stone-100 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-xs font-medium text-stone-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-light">
                    Beden: <span className="font-medium text-stone-800">{item.size}</span>
                  </p>
                  <p className="text-xs font-semibold text-stone-950 pt-0.5">
                    {(item.price * item.quantity).toLocaleString("tr-TR")} TL
                  </p>
                </div>

                
                <div className="flex flex-col items-end gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Ürünü çıkar"
                    className="text-stone-400 hover:text-rose-700 transition-colors p-1"
                  >
                    <Trash2 className="size-3.5" />
                  </button>

                  <div className="flex items-center border border-stone-300 bg-white">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                      aria-label="Adet azalt"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="px-2.5 text-xs text-stone-900 font-semibold min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                      aria-label="Adet artır"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#faf9f6] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Ara Toplam</span>
                <span className="font-medium">{subtotal.toLocaleString("tr-TR")} TL</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Kargo</span>
                <span>
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">ÜCRETSİZ</span>
                  ) : (
                    "59 TL"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
                <span>Toplam Tutar</span>
                <span className="font-serif text-lg font-normal">
                  {grandTotal.toLocaleString("tr-TR")} TL
                </span>
              </div>
            </div>

            
            <Link
              href="/odeme"
              onClick={closeCart}
              className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg text-center"
            >
              <span>ÖDEMEYE GEÇ ({grandTotal.toLocaleString("tr-TR")} TL)</span>
              <ArrowRight className="size-4" />
            </Link>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-stone-700" />
                <span>Şeffaf Kargo Güvencesi</span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="underline hover:text-stone-950 cursor-pointer"
              >
                Alışverişe Devam Et
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
