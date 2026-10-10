"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  slug: string;
  category: string;
  images: [string, string];
  sizes: string[];
  colors?: string[];
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const whatsappInquiryUrl = `https://wa.me/905550000000?text=${encodeURIComponent(
    `Merhaba, butiğinizdeki "${product.name}" hakkında bilgi almak istiyorum.`
  )}`;

  return (
    <div
      className="group flex flex-col select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Ürün Fotoğrafı & Hover Alanı */}
      <div className="relative aspect-[3/4] w-full bg-[#f5f4f0] overflow-hidden">
        <Link href={`/urun/${product.slug}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
            loading="lazy"
          />
        </Link>

        {/* Minimal Rozet */}
        {discountPercent ? (
          <span className="absolute top-2.5 left-2.5 bg-stone-900 text-white text-[10px] tracking-widest px-2 py-0.5 uppercase font-medium">
            -%{discountPercent}
          </span>
        ) : product.badge ? (
          <span className="absolute top-2.5 left-2.5 bg-white text-stone-900 text-[10px] tracking-widest px-2 py-0.5 uppercase font-medium border border-stone-200">
            {product.badge}
          </span>
        ) : null}

        {/* Favori Kalp İkonu */}
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          aria-label="Favorilere ekle"
          className="absolute top-2.5 right-2.5 p-1.5 text-stone-700 hover:text-stone-950 transition-colors"
        >
          <Heart
            className={`size-4 stroke-[1.5] transition-colors ${
              isLiked ? "fill-stone-900 text-stone-900" : ""
            }`}
          />
        </button>

        {/* Hover'da Aşağıdan Kayarak Açılan Beden Seçim Çubuğu (Zara Stili) */}
        <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs py-2.5 px-3 border-t border-stone-200 transition-all duration-300 translate-y-full group-hover:translate-y-0 hidden sm:block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-widest uppercase text-stone-400 font-medium">
              {justAdded ? "Eklendi!" : "Hızlı Beden Seç:"}
            </span>

            {justAdded ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                <Check className="size-3" />
                <span>Sepete Eklendi ({selectedSize})</span>
              </span>
            ) : (
              <div className="flex items-center gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => handleQuickAdd(size, e)}
                    className="px-2 py-0.5 text-[11px] font-medium text-stone-800 hover:text-white hover:bg-stone-900 transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Ürün Bilgisi */}
      <div className="pt-3 pb-1 space-y-1">
        {/* Renk Çemberleri (Varsa) */}
        {product.colors && (
          <div className="flex items-center gap-1.5 pb-1">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="size-2 rounded-full border border-stone-300"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}

        <h3 className="text-xs sm:text-[13px] text-stone-900 tracking-wide font-normal truncate hover:underline underline-offset-4 decoration-stone-300">
          <Link href={`/urun/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-xs sm:text-sm font-medium text-stone-950">
            {product.price.toLocaleString("tr-TR")} TL
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-stone-400 line-through">
              {product.originalPrice.toLocaleString("tr-TR")} TL
            </span>
          )}
        </div>

        {/* Mobilde WhatsApp İle Sor Linki */}
        <div className="pt-1 sm:hidden">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium"
          >
            <WhatsAppIcon className="size-3" />
            <span>WhatsApp ile Sor</span>
          </a>
        </div>
      </div>
    </div>
  );
}
