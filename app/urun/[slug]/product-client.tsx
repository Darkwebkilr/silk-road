"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/boutique/product-card";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import {
  ChevronRight,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  Check,
  Ruler,
} from "lucide-react";

interface ProductClientProps {
  slug: string;
}

export default function ProductClient({ slug }: ProductClientProps) {
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || "");
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Merhaba Atelier Silk, "${product.name}" (${selectedSize} beden) hakkında bilgi almak ve sipariş vermek istiyorum.`
  );

  const similarProducts = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-stone-200 py-3 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase">
            <Link href="/" className="hover:text-stone-900">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <Link href={`/kategori/${product.categorySlug}`} className="hover:text-stone-900">
              {product.category}
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Ana Ürün Görünümü (İkili Kolon) */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Sol Kolon: Fotoğraf Galerisi */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            {/* Küçük Görseller */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`size-18 sm:size-20 shrink-0 overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? "border-stone-950 ring-1 ring-stone-950"
                      : "border-stone-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Büyük Ana Görsel */}
            <div className="relative flex-1 aspect-[3/4] bg-stone-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-stone-950 text-white text-[10px] tracking-widest px-3 py-1 uppercase font-semibold">
                  {product.badge}
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                aria-label="Favorilere ekle"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-950 shadow-sm"
              >
                <Heart
                  className={`size-4.5 ${isLiked ? "fill-stone-950 text-stone-950" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Sağ Kolon: Ürün Detayları, Fiyat & Aksiyonlar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1.5 border-b border-stone-200 pb-5">
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block">
                {product.category} • ATELIER SILK
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-xl sm:text-2xl font-medium text-stone-950">
                  {product.price.toLocaleString("tr-TR")} TL
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {product.originalPrice.toLocaleString("tr-TR")} TL
                  </span>
                )}
              </div>
            </div>

            {/* Renk Seçimi */}
            {product.colors && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-stone-500 font-medium block">
                  Renk Seçenekleri
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`size-6 rounded-full border transition-all ${
                        selectedColor === color
                          ? "ring-2 ring-stone-950 ring-offset-2 scale-110"
                          : "border-stone-300 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Beden Seçimi */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-stone-500 font-medium">
                  Beden: <strong className="text-stone-900">{selectedSize}</strong>
                </span>

                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[11px] text-stone-600 hover:text-stone-950 underline underline-offset-4"
                >
                  <Ruler className="size-3" />
                  <span>Beden Tablosu</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-semibold tracking-wider transition-all border ${
                      selectedSize === size
                        ? "border-stone-950 bg-stone-950 text-white"
                        : "border-stone-200 text-stone-800 hover:border-stone-400 bg-[#faf9f6]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="space-y-3 pt-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-4 text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                  isAdded
                    ? "bg-emerald-800 text-white"
                    : "bg-stone-950 text-white hover:bg-stone-800"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="size-4" />
                    <span>ÇANTAYA EKLENDİ ({selectedSize})</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    <span>ÇANTAYA EKLE</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/905550000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 border border-emerald-600/40 hover:border-emerald-600 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-50 text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="size-4 text-emerald-600" />
                <span>WHATSAPP İLE SİPARİŞ VER / DANIŞ</span>
              </a>
            </div>

            {/* Butik Güvenceleri */}
            <div className="p-4 bg-[#faf9f6] border border-stone-200/80 space-y-2.5 text-xs text-stone-600 font-light">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-stone-900 shrink-0" />
                <span><strong>Şeffaf Kargo:</strong> Paketinizi açıp kontrol ederek teslim alabilirsiniz.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="size-4 text-stone-900 shrink-0" />
                <span><strong>Hızlı Gönderi:</strong> 16:00&apos;ya kadar verilen siparişler aynı gün kargoda.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="size-4 text-stone-900 shrink-0" />
                <span><strong>Kolay Değişim:</strong> 14 gün içerisinde hızlı değişim hakkı.</span>
              </div>
            </div>

            {/* Ürün & Kumaş Bilgileri */}
            <div className="border-t border-stone-200 pt-5 space-y-3 text-xs">
              <h3 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                Ürün Detayı & Kumaş İçeriği
              </h3>
              <p className="text-stone-600 leading-relaxed font-light">{product.description}</p>
              <div className="pt-2 text-stone-600 space-y-1 font-light">
                <p><strong>Kumaş:</strong> {product.fabric}</p>
                <p><strong>Kalıp:</strong> {product.modelInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Benzer Parçalar / Bu Ürünle Kombinle */}
      <div className="border-t border-stone-200 py-16 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block">
              STİLİNİZİ TAMAMLAYIN
            </span>
            <h2 className="font-serif text-3xl text-stone-900 font-normal mt-1">
              Benzer Butik Parçalar
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  originalPrice: p.originalPrice,
                  slug: p.slug,
                  category: p.category,
                  images: [p.images[0], p.images[1] || p.images[0]],
                  sizes: p.sizes,
                  colors: p.colors,
                  badge: p.badge,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
