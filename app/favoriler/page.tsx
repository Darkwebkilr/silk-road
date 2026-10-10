"use client";

import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/boutique/product-card";
import { Heart, ChevronRight, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  const favoriteProducts = ALL_PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#faf9f6] border-b border-stone-200 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center sm:text-left">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase mb-3">
            <Link href="/" className="hover:text-stone-900">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">Favorilerim</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block">
                ATELIER SILK İSTEK LİSTESİ
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal mt-1">
                Beğendiğiniz Parçalar ({favoriteProducts.length})
              </h1>
            </div>

            <Link
              href="/kategori/yeni-gelenler"
              className="text-xs uppercase tracking-widest text-stone-900 underline underline-offset-4 font-medium"
            >
              Koleksiyonu İncelemeye Devam Et
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {favoriteProducts.map((product) => (
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
      </div>
    </div>
  );
}
