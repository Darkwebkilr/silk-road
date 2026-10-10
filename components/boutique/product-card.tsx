"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

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
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "36");
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    addToCart(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        size: selectedSize,
        quantity: quantity,
        slug: product.slug,
      },
      true
    );

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleQtyChange = (delta: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div
      className="group flex flex-col select-none bg-white border border-stone-200/60 p-2 sm:p-2.5 hover:border-stone-400 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <div className="relative aspect-[3/4] w-full bg-[#f5f4f0] overflow-hidden">
        <Link href={`/urun/${product.slug}`} className="block w-full h-full">
          
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            loading="lazy"
          />
        </Link>

        
        {discountPercent ? (
          <span className="absolute top-2 left-2 bg-stone-900 text-white text-[10px] tracking-widest px-2 py-0.5 uppercase font-medium">
            -%{discountPercent}
          </span>
        ) : product.badge ? (
          <span className="absolute top-2 left-2 bg-white text-stone-900 text-[10px] tracking-widest px-2 py-0.5 uppercase font-medium border border-stone-200">
            {product.badge}
          </span>
        ) : null}

        
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          aria-label="Favorilere ekle"
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <Heart
            className={`size-3.5 stroke-[1.5] transition-colors ${
              isLiked ? "fill-stone-900 text-stone-900" : ""
            }`}
          />
        </button>

        
        <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs py-2 px-2.5 border-t border-stone-200 transition-all duration-300 translate-y-full group-hover:translate-y-0 hidden sm:block">
          <div className="flex items-center justify-between">
            <span className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold">
              Beden:
            </span>
            <div className="flex items-center gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                    selectedSize === size
                      ? "bg-stone-950 text-white"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      <div className="pt-2.5 space-y-1 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xs sm:text-[13px] text-stone-900 tracking-wide font-normal truncate hover:underline underline-offset-4 decoration-stone-300">
            <Link href={`/urun/${product.slug}`}>{product.name}</Link>
          </h3>

          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-xs sm:text-sm font-semibold text-stone-950">
              {product.price.toLocaleString("tr-TR")} TL
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-stone-400 line-through">
                {product.originalPrice.toLocaleString("tr-TR")} TL
              </span>
            )}
          </div>
        </div>

        
        <div className="pt-2 sm:hidden flex items-center gap-1 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold mr-0.5">
            Beden:
          </span>
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-0.5 text-[10px] font-semibold border transition-colors ${
                selectedSize === size
                  ? "border-stone-950 bg-stone-950 text-white"
                  : "border-stone-200 text-stone-700 bg-stone-50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        
        <div className="pt-2 mt-auto flex flex-col gap-1.5 w-full">
          <div className="flex items-center justify-between border border-stone-300 bg-[#faf9f6] w-full px-1">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-medium pl-1">Adet:</span>
            <div className="flex items-center">
              <button
                type="button"
                onClick={(e) => handleQtyChange(-1, e)}
                className="px-2 py-1 text-stone-600 hover:bg-stone-200 active:bg-stone-300 transition-colors"
                aria-label="Adeti azalt"
              >
                <Minus className="size-2.5" />
              </button>
              <span className="px-2 text-[11px] font-bold text-stone-900 min-w-[18px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={(e) => handleQtyChange(1, e)}
                className="px-2 py-1 text-stone-600 hover:bg-stone-200 active:bg-stone-300 transition-colors"
                aria-label="Adeti artır"
              >
                <Plus className="size-2.5" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2 px-2 text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95 ${
              justAdded
                ? "bg-emerald-800 text-white"
                : "bg-stone-950 hover:bg-stone-800 text-white"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="size-3" />
                <span>Eklendi</span>
              </>
            ) : (
              <>
                <ShoppingBag className="size-3" />
                <span>Sepete Ekle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
