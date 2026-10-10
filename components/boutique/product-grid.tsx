"use client";

import { useState } from "react";
import ProductCard, { Product } from "./product-card";
import Link from "next/link";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Kruvaze Keten Blazer Ceket",
    price: 1650,
    originalPrice: 1950,
    slug: "kruvaze-keten-blazer-ceket",
    category: "Ceket",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["36", "38", "40"],
    colors: ["#d6cec2", "#1c1917", "#84827d"],
    badge: "YENİ",
  },
  {
    id: "p2",
    name: "Sırt Dekolteli Saten Midi Elbise",
    price: 1350,
    slug: "sirt-dekolteli-saten-midi-elbise",
    category: "Elbise",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["XS", "S", "M"],
    colors: ["#2d2c2a", "#c7b79d"],
  },
  {
    id: "p3",
    name: "Doğal Keten İkili Gömlek & Şort Takım",
    price: 1850,
    slug: "dogal-keten-ikili-gomlek-sort-takim",
    category: "Takım",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    colors: ["#ede8df", "#70685c"],
    badge: "ÖNE ÇIKAN",
  },
  {
    id: "p4",
    name: "Geniş Paça Kumaş Palazzo Pantolon",
    price: 980,
    slug: "genis-paca-kumas-palazzo-pantolon",
    category: "Pantolon",
    images: [
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["36", "38", "40", "42"],
    colors: ["#1c1917", "#e3dac9"],
  },
  {
    id: "p5",
    name: "Dökümlü Kemerli Trençkot",
    price: 2150,
    originalPrice: 2550,
    slug: "dokumlu-kemerli-trenckot",
    category: "Ceket",
    images: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["36", "38", "40"],
    colors: ["#c2b59b", "#1c1917"],
  },
  {
    id: "p6",
    name: "V Yaka İpek Karışımlı Triko",
    price: 680,
    slug: "v-yaka-ipek-karisimli-triko",
    category: "Üst Giyim",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["Standart"],
    colors: ["#faf7f2", "#3a3834"],
  },
  {
    id: "p7",
    name: "Askılı Fırfır Detay Şifon Elbise",
    price: 1420,
    slug: "askili-firfir-detay-sifon-elbise",
    category: "Elbise",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["XS", "S", "M"],
    badge: "SINIRLI",
  },
  {
    id: "p8",
    name: "Gömlek Yaka Keten Takım",
    price: 1750,
    slug: "gomlek-yaka-keten-takim",
    category: "Takım",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    colors: ["#ded7ca", "#4a4742"],
  },
];

const TABS = ["TÜMÜ", "ELBİSE", "CEKET", "TAKIM", "PANTOLON"];

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState("TÜMÜ");

  const filteredProducts =
    activeTab === "TÜMÜ"
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter(
          (p) => p.category.toUpperCase() === activeTab.toUpperCase()
        );

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Bölüm Başlığı & Minimal Sekmeler */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-6 border-b border-stone-200 pb-5 mb-10">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block">
              LOOKBOOK SEÇKİSİ
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight mt-1">
              Yeni Sezon Parçaları
            </h2>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-[11px] tracking-[0.2em] uppercase font-medium pb-1 transition-all relative ${
                  activeTab === tab
                    ? "text-stone-950 font-semibold"
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-950" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Kolonlu Sade Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Alt Koleksiyon Butonu */}
        <div className="mt-16 text-center">
          <Link
            href="/kategori/yeni-gelenler"
            className="inline-block px-10 py-3.5 border border-stone-950 text-stone-950 text-xs tracking-[0.25em] uppercase font-medium hover:bg-stone-950 hover:text-white transition-colors"
          >
            TÜM KOLEKSİYONU İNCELE
          </Link>
        </div>
      </div>
    </section>
  );
}
