"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2, Truck, Plus, Minus } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  image: string;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Kruvaze Keten Blazer Ceket",
    price: 1650,
    quantity: 1,
    variant: "Ekru / 38",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=160&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Sırt Dekolteli Saten Midi Elbise",
    price: 1350,
    quantity: 1,
    variant: "Siyah / S",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=160&auto=format&fit=crop&q=80",
  },
];

const FREE_SHIPPING_THRESHOLD = 1500;

export default function CartButton() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label={`Alışveriş sepeti, ${totalCount} ürün`}
            className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors"
          />
        }
      >
        <ShoppingBag className="size-4.5 stroke-[1.5]" />
        {totalCount > 0 && (
          <span className="absolute top-1 right-1 size-4 rounded-full bg-stone-900 text-white text-[9px] font-medium flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 bg-white">
        <SheetHeader className="p-5 border-b border-stone-200">
          <SheetTitle className="font-serif text-xl tracking-tight text-stone-900 font-normal">
            Alışveriş Çantası ({totalCount})
          </SheetTitle>
          <SheetDescription className="text-xs text-stone-500 font-light">
            Seçtiğiniz butik parçalar ve sipariş özeti.
          </SheetDescription>

          {/* Kargo Çubuğu */}
          <div className="mt-3 bg-[#faf9f6] p-3 border border-stone-200 text-xs">
            <div className="flex items-center gap-2 font-medium text-stone-800 mb-1.5">
              <Truck className="size-3.5 text-stone-600" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Ücretsiz kargo için <strong>{remainingForFreeShipping.toLocaleString("tr-TR")} TL</strong> daha ekleyin.
                </span>
              ) : (
                <span className="text-emerald-700 font-medium">
                  Tebrikler! Kargo ücretsiz.
                </span>
              )}
            </div>
            <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </SheetHeader>

        {/* Ürün Listesi */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <ShoppingBag className="size-10 mb-2 stroke-[1] text-stone-300" />
              <p className="font-serif text-lg text-stone-700">Çantanız Boş</p>
              <p className="text-xs text-stone-500 mt-1">
                Yeni sezon lookbook parçalarını keşfetmeye başlayın.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 pb-4 border-b border-stone-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-18 object-cover bg-stone-100"
                  loading="lazy"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-stone-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 font-light">{item.variant}</p>
                  <p className="text-xs font-semibold text-stone-900 mt-1">
                    {(item.price * item.quantity).toLocaleString("tr-TR")} TL
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Ürünü çıkar"
                    className="text-stone-400 hover:text-stone-900 transition-colors p-1"
                  >
                    <Trash2 className="size-3.5" />
                  </button>

                  <div className="flex items-center border border-stone-200">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-stone-500 hover:bg-stone-100"
                    >
                      <Minus className="size-2.5" />
                    </button>
                    <span className="px-2 text-xs text-stone-900 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 text-stone-500 hover:bg-stone-100"
                    >
                      <Plus className="size-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sepet Özeti */}
        {items.length > 0 && (
          <SheetFooter className="p-5 border-t border-stone-200 bg-[#faf9f6] flex-col gap-3">
            <div className="space-y-1.5 w-full text-xs">
              <div className="flex items-center justify-between text-stone-500">
                <span>Ara Toplam</span>
                <span>{subtotal.toLocaleString("tr-TR")} TL</span>
              </div>
              <div className="flex items-center justify-between text-stone-500">
                <span>Kargo</span>
                <span>{remainingForFreeShipping === 0 ? "Ücretsiz" : "59 TL"}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
                <span>Toplam</span>
                <span>
                  {(subtotal + (remainingForFreeShipping === 0 ? 0 : 59)).toLocaleString("tr-TR")} TL
                </span>
              </div>
            </div>

            <div className="w-full space-y-2 pt-2">
              <Link
                href="/odeme"
                className="w-full block py-3 bg-stone-950 hover:bg-stone-800 text-white text-xs tracking-[0.2em] uppercase font-medium text-center transition-colors"
              >
                SİPARİŞİ TAMAMLA
              </Link>
              <Link
                href="/sepet"
                className="w-full block py-2 text-stone-600 hover:text-stone-950 text-xs text-center font-medium"
              >
                Çantayı Görüntüle
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
