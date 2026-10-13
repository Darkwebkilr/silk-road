"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: string;
  seasonTag: string;
  title: string;
  italicWord: string;
  description: string;
  image: string;
  featuredProduct: {
    name: string;
    price: string;
    slug: string;
  };
  ctaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    seasonTag: "LOOK 01 • SS '26 CAMPAIGN",
    title: "Doğal Dokular,",
    italicWord: "Saf Keten.",
    description: "Doğal taş ve kum tonlarında nefes alan keten kumaşlar, zamansız kruvaze silüetler.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=90",
    featuredProduct: {
      name: "Kruvaze Keten Blazer Ceket",
      price: "1.650 TL",
      slug: "kruvaze-keten-blazer-ceket",
    },
    ctaLink: "/kategori/yeni-gelenler",
  },
  {
    id: "slide-2",
    seasonTag: "LOOK 02 • SOIRÉE COLLECTION",
    title: "Akışkan Duruş,",
    italicWord: "Gece Satini.",
    description: "Vücudu saran ipeksi dokular, derin sırt dekolteleri ve minimalist akşam elbiseleri.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&auto=format&fit=crop&q=90",
    featuredProduct: {
      name: "Sırt Dekolteli Saten Midi Elbise",
      price: "1.350 TL",
      slug: "sirt-dekolteli-saten-midi-elbise",
    },
    ctaLink: "/kategori/elbiseler",
  },
  {
    id: "slide-3",
    seasonTag: "LOOK 03 • TAILORED MINIMALISM",
    title: "Kusursuz Kalıp,",
    italicWord: "Güçlü Duruş.",
    description: "İtalyan kesim geniş paça kumaşlar, maskülen omuz hatları ve dökümlü trençkotlar.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&auto=format&fit=crop&q=90",
    featuredProduct: {
      name: "Dökümlü Kemerli Trençkot",
      price: "2.150 TL",
      slug: "dokumlu-kemerli-trenckot",
    },
    ctaLink: "/kategori/dis-giyim",
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const current = HERO_SLIDES[activeSlide];

  return (
    <section className="relative w-full h-[82vh] min-h-[580px] max-h-[880px] overflow-hidden bg-stone-950 text-white select-none">
      {/* Çubuğun tam 6 saniyede kesintisiz dolmasını sağlayan CSS kuralı */}
      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover object-[center_20%] transition-transform duration-10000 ease-out ${idx === activeSlide ? "scale-105" : "scale-100"
              }`}
            loading={idx === 0 ? "eager" : "lazy"}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
      ))}

      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 lg:px-8 flex flex-col justify-between py-10 lg:py-14">
        {/* Üst Kısım: Tag ve Ok Butonları */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] tracking-[0.25em] uppercase font-light text-stone-200">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            <span>{current.seasonTag}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Önceki Görünüm"
              className="size-10 rounded-full border border-white/20 hover:border-white hover:bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Sonraki Görünüm"
              className="size-10 rounded-full border border-white/20 hover:border-white hover:bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Orta Kısım: Başlık, Açıklama ve CTA */}
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white leading-[1.05]">
              {current.title} <br />
              <span className="italic font-normal text-stone-200">{current.italicWord}</span>
            </h1>
          </div>

          <p className="text-stone-300 text-sm sm:text-base font-light max-w-lg leading-relaxed">
            {current.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Link
              href={current.ctaLink}
              className="px-8 py-4 bg-white text-stone-950 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-stone-200 transition-colors text-center shadow-2xl"
            >
              KOLEKSİYONU KEŞFET
            </Link>

            <Link
              href="/kategori/kombinler"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors text-center flex items-center justify-center gap-2"
            >
              <span>Lookbook&apos;u İncele</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Alt Kısım: Senkron İlerleme Çubukları ve Öne Çıkan Ürün */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlide;
              const isPast = idx < activeSlide;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className="group flex flex-col gap-1.5 flex-1 sm:w-28 text-left cursor-pointer outline-none"
                >
                  <div className="h-0.5 w-full bg-white/25 rounded-full overflow-hidden relative">
                    {isActive ? (
                      <div
                        key={`slide-bar-${activeSlide}`}
                        onAnimationEnd={nextSlide}
                        className="h-full bg-white"
                        style={{
                          animation: "progressFill 6s linear forwards",
                        }}
                      />
                    ) : (
                      <div className={`h-full bg-white ${isPast ? "w-full" : "w-0"}`} />
                    )}
                  </div>

                  <span
                    className={`text-[10px] tracking-[0.2em] uppercase font-medium transition-colors ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                      }`}
                  >
                    0{idx + 1} • {idx === 0 ? "KETEN" : idx === 1 ? "SATEN" : "TAILORED"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full sm:w-auto">
            <Link
              href={`/urun/${current.featuredProduct.slug}`}
              className="group inline-flex items-center gap-3.5 p-3 pr-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all shadow-xl"
            >
              <div className="size-9 rounded-xl bg-white text-stone-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShoppingBag className="size-4 stroke-[1.8]" />
              </div>

              <div className="text-left">
                <span className="text-[9px] tracking-widest uppercase text-stone-300 font-medium block">
                  GÖRSELDEKİ PARÇA
                </span>
                <p className="text-xs font-semibold text-white tracking-wide truncate max-w-[180px]">
                  {current.featuredProduct.name}
                </p>
                <p className="text-xs font-bold text-stone-200 mt-0.5">
                  {current.featuredProduct.price}
                </p>
              </div>

              <ArrowRight className="size-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
