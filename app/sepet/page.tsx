"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ChevronRight } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useState([
    {
      product: ALL_PRODUCTS[0],
      quantity: 1,
      size: "38",
    },
    {
      product: ALL_PRODUCTS[1],
      quantity: 1,
      size: "S",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 1500 ? 0 : 59;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "BUTIK10") {
      setDiscount(Math.round(subtotal * 0.1));
    }
  };

  const updateQuantity = (idx: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item, i) => {
          if (i === idx) {
            const next = item.quantity + delta;
            return next > 0 ? { ...item, quantity: next } : null;
          }
          return item;
        })
        .filter(Boolean) as any
    );
  };

  const removeItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#faf9f6] border-b border-stone-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase mb-2">
            <Link href="/" className="hover:text-stone-900">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">Alışveriş Çantası</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
            Alışveriş Çantanız ({items.length})
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        {items.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="font-serif text-2xl text-stone-800">Alışveriş çantanız boş.</p>
            <p className="text-xs text-stone-500">Koleksiyonumuzdaki zarif parçaları keşfedin.</p>
            <Link
              href="/kategori/yeni-gelenler"
              className="inline-block px-8 py-3.5 bg-stone-950 text-white text-xs tracking-widest uppercase font-medium mt-2"
            >
              Koleksiyonu Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="border border-stone-200 divide-y divide-stone-200">
                {items.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="size-24 object-cover bg-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] tracking-widest uppercase text-stone-400 font-medium">
                        {item.product.category}
                      </span>
                      <h3 className="text-sm font-medium text-stone-950 truncate">
                        <Link href={`/urun/${item.product.slug}`} className="hover:underline">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-stone-500">Beden: {item.size}</p>
                      <p className="text-sm font-semibold text-stone-900 pt-1">
                        {(item.product.price * item.quantity).toLocaleString("tr-TR")} TL
                      </p>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="flex items-center border border-stone-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, -1)}
                          className="p-1.5 text-stone-500 hover:bg-stone-100"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, 1)}
                          className="p-1.5 text-stone-500 hover:bg-stone-100"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="p-2 text-stone-400 hover:text-stone-950 transition-colors"
                        aria-label="Ürünü çıkar"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3.5 bg-[#faf9f6] border border-stone-200 text-xs text-stone-700">
                  <Truck className="size-4 text-stone-900 shrink-0" />
                  <span>1.500 TL üzeri tüm siparişlerde ücretsiz kargo.</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-[#faf9f6] border border-stone-200 text-xs text-stone-700">
                  <ShieldCheck className="size-4 text-stone-900 shrink-0" />
                  <span>Şeffaf kargo ile görerek kontrollü teslimat.</span>
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-[#faf9f6] border border-stone-200 space-y-4">
                <h3 className="font-serif text-xl text-stone-950 font-normal border-b border-stone-200 pb-3">
                  Sipariş Özeti
                </h3>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{subtotal.toLocaleString("tr-TR")} TL</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>İndirim (BUTIK10)</span>
                      <span>-{discount.toLocaleString("tr-TR")} TL</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Kargo</span>
                    <span>{shippingFee === 0 ? "ÜCRETSİZ" : `${shippingFee} TL`}</span>
                  </div>

                  <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-semibold text-stone-950">
                    <span>Toplam Tutar</span>
                    <span>{grandTotal.toLocaleString("tr-TR")} TL</span>
                  </div>
                </div>

                
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex border border-stone-300 bg-white">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="İndirim Kodu (örn: BUTIK10)"
                      className="w-full px-3 py-2 text-xs uppercase outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-stone-900 text-white text-[11px] tracking-wider uppercase font-medium shrink-0"
                    >
                      Uygula
                    </button>
                  </div>
                </form>

                <Link
                  href="/odeme"
                  className="w-full block py-4 bg-stone-950 hover:bg-stone-800 text-white text-xs tracking-[0.25em] uppercase font-semibold text-center transition-colors shadow-md"
                >
                  ÖDEMEYE GEÇ
                </Link>

                <p className="text-[10px] text-stone-400 text-center tracking-wider uppercase">
                  256-Bit SSL • Güvenli Butik Alışverişi
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
