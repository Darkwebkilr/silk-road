"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_PRODUCTS, CATEGORIES_META } from "@/lib/products";
import ProductCard from "@/components/boutique/product-card";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

interface CategoryClientProps {
  slug: string;
}

export default function CategoryClient({ slug }: CategoryClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>("TÜMÜ");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const meta = CATEGORIES_META[slug] || {
    title: slug.toUpperCase().replace("-", " "),
    subtitle: "Atelier Silk Koleksiyonu",
    description: "Özel tasarım ve kaliteli kumaşlarla hazırlanan parçalar.",
  };

  const categoryProducts = useMemo(() => {
    if (slug === "yeni-gelenler") {
      return ALL_PRODUCTS;
    }
    if (slug === "indirim") {
      return ALL_PRODUCTS.filter((p) => Boolean(p.originalPrice));
    }
    return ALL_PRODUCTS.filter((p) => p.categorySlug === slug);
  }, [slug]);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (selectedSize !== "TÜMÜ") {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [categoryProducts, selectedSize, sortBy]);

  const allAvailableSizes = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return ["TÜMÜ", ...Array.from(set)];
  }, [categoryProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Üst Başlık & Breadcrumbs */}
      <div className="bg-[#faf9f6] border-b border-stone-200 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase mb-4">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <Link href="/kategori/yeni-gelenler" className="hover:text-stone-900 transition-colors">
              Koleksiyon
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">{meta.title}</span>
          </nav>

          <div className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block">
              {meta.subtitle}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-stone-950 font-normal tracking-tight mt-1">
              {meta.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-light mt-3 leading-relaxed">
              {meta.description}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Filtreleme & Sıralama Barı */}
      <div className="border-b border-stone-200 sticky top-16 lg:top-18 z-20 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-[11px] tracking-widest uppercase text-stone-400 font-medium mr-1 flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="size-3" />
              <span>Beden:</span>
            </span>

            {allAvailableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-[11px] font-medium tracking-wider transition-colors shrink-0 ${
                  selectedSize === size
                    ? "bg-stone-950 text-white"
                    : "bg-[#faf9f6] text-stone-700 hover:text-stone-950 border border-stone-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-[11px] tracking-wider text-stone-500">
            <span>{filteredProducts.length} Parça Listelendi</span>

            <div className="flex items-center gap-1.5">
              <span>Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-stone-900 font-medium outline-none cursor-pointer border-b border-stone-300 pb-0.5"
              >
                <option value="featured">Önerilen Sıralama</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Ürün Listesi */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 sm:py-16">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-2xl text-stone-800">Bu filtreye uygun parça bulunamadı.</p>
            <p className="text-xs text-stone-500">Lütfen farklı bir beden seçin veya filtreleri temizleyin.</p>
            <button
              type="button"
              onClick={() => setSelectedSize("TÜMÜ")}
              className="mt-4 inline-block px-6 py-2.5 bg-stone-950 text-white text-xs tracking-widest uppercase font-medium"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  slug: product.slug,
                  category: product.category,
                  images: [product.images[0], product.images[1] || product.images[0]],
                  sizes: product.sizes,
                  colors: product.colors,
                  badge: product.badge,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
