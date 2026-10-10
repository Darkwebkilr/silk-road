"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/boutique/product-card";
import { Search, ChevronRight } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return ALL_PRODUCTS;
    const lower = searchTerm.toLowerCase();
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.fabric.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Başlık & Arama Çubuğu */}
      <div className="bg-[#faf9f6] border-b border-stone-200 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase mb-3">
            <Link href="/" className="hover:text-stone-900">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">Arama Sonuçları</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            Koleksiyonda Arayın
          </h1>

          {/* Form */}
          <div className="mt-6 max-w-xl mx-auto">
            <div className="relative flex items-center border-b-2 border-stone-900 pb-2">
              <Search className="size-5 text-stone-400 mr-3" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Keten, saten, blazer ceket..."
                className="w-full text-base sm:text-lg font-serif text-stone-900 placeholder:text-stone-300 outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-stone-500">
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Öneriler:</span>
              {["Keten", "Saten", "Blazer", "Takım", "Elbise"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchTerm(tag)}
                  className="text-stone-700 hover:text-stone-950 underline underline-offset-4 decoration-stone-300 text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sonuçlar Bilgisi */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <p>
          {searchTerm ? (
            <>
              <strong className="text-stone-900">&quot;{searchTerm}&quot;</strong> için{" "}
              {results.length} parça bulundu
            </>
          ) : (
            `Tüm Koleksiyon (${results.length} Parça)`
          )}
        </p>
      </div>

      {/* 3. Ürün Listesi */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 sm:py-16">
        {results.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-2xl text-stone-800">
              Aradığınız kritere uygun parça bulunamadı.
            </p>
            <p className="text-xs text-stone-500">
              Farklı bir kelime deneyebilir veya yeni sezon koleksiyonunu inceleyebilirsiniz.
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-4 inline-block px-6 py-2.5 bg-stone-950 text-white text-xs tracking-widest uppercase font-medium"
            >
              Tüm Parçaları Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {results.map((product) => (
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 text-center">Yükleniyor...</div>}>
      <SearchContent />
    </Suspense>
  );
}
