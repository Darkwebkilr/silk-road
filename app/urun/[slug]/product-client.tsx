"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { ALL_PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/boutique/product-card";
import { useCart } from "@/lib/cart-context";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  Check,
  Ruler,
  Plus,
  Minus,
} from "lucide-react";

interface ProductClientProps {
  slug: string;
}

export default function ProductClient({ slug }: ProductClientProps) {
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const mainCtaRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    skipSnaps: false,
    containScroll: "trimSnaps",
    duration: 20,
    watchDrag: true,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveImageIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const target = mainCtaRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  if (!product) {
    notFound();
  }

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!product) return;

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

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const similarProducts = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      
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

      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  className={`size-18 sm:size-20 shrink-0 overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? "border-stone-950 ring-1 ring-stone-950"
                      : "border-stone-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="group relative flex-1 aspect-3/4 bg-stone-100 overflow-hidden">
              <div
                ref={emblaRef}
                className="w-full h-full overflow-hidden select-none touch-pan-y"
              >
                <div className="flex h-full select-none">
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative min-w-0 flex-[0_0_100%] h-full select-none"
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        loading={idx === 0 ? "eager" : "lazy"}
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Önceki görsel"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 hover:text-stone-950 shadow-sm backdrop-blur-xs opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus:outline-hidden"
                  >
                    <ChevronLeft className="size-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Sonraki görsel"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 hover:text-stone-950 shadow-sm backdrop-blur-xs opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus:outline-hidden"
                  >
                    <ChevronRight className="size-4.5" />
                  </button>
                </>
              )}

              {product.badge && (
                <span className="absolute top-4 left-4 bg-stone-950 text-white text-[10px] tracking-widest px-3 py-1 uppercase font-semibold pointer-events-none">
                  {product.badge}
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                aria-label="Favorilere ekle"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-950 shadow-sm z-10"
              >
                <Heart
                  className={`size-4.5 ${isLiked ? "fill-stone-950 text-stone-950" : ""}`}
                />
              </button>

              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/40 backdrop-blur-xs sm:hidden">
                  {product.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeImageIndex === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          
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

            
            <div ref={mainCtaRef} className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                
                <div className="flex items-center border border-stone-300 bg-[#faf9f6] h-12 px-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Adet Azalt"
                    className="size-8 flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-stone-950">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Adet Artır"
                    className="size-8 flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                    isAdded
                      ? "bg-emerald-800 text-white"
                      : "bg-stone-950 text-white hover:bg-stone-800"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="size-4" />
                      <span>ÇANTAYA EKLENDİ ({quantity} Adet)</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="size-4" />
                      <span>ÇANTAYA EKLE</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            
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

      
      <div
        className={`fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] transition-all duration-300 transform ${
          showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`h-11 px-5 sm:px-7 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer ${
                isAdded
                  ? "bg-emerald-800 text-white"
                  : "bg-stone-950 text-white hover:bg-stone-800"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="size-3.5" />
                  <span>EKLENDİ</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="size-3.5" />
                  <span>SEPETE EKLE</span>
                </>
              )}
            </button>

            <div className="hidden sm:block">
              <h4 className="text-xs font-medium text-stone-900 truncate max-w-[200px]">
                {product.name}
              </h4>
              <p className="text-xs font-semibold text-stone-950">
                {product.price.toLocaleString("tr-TR")} TL
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                aria-label="Beden Seçin"
                className="bg-[#faf9f6] border border-stone-300 text-stone-900 text-xs py-2 px-2.5 focus:outline-none focus:border-stone-900 uppercase font-medium cursor-pointer"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center border border-stone-300 bg-[#faf9f6] h-11 px-1 shrink-0">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Adet Azalt"
                className="size-8 flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-7 text-center text-xs font-semibold text-stone-950">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Adet Artır"
                className="size-8 flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
