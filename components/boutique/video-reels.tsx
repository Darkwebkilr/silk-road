"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Pause, ShoppingBag } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";

interface ReelItem {
  id: string;
  title: string;
  lookTag: string;
  videoUrl: string;
  fallbackImage: string;
  productName: string;
  price: string;
  slug: string;
}

const REELS: ReelItem[] = [
  {
    id: "r1",
    title: "Saten Dokunun Akışı",
    lookTag: "LOOK 01",
    videoUrl: "https://assets.mixkit.co/videos/4831/4831-720.mp4",
    fallbackImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    productName: "Asimetrik Saten Drapeli Elbise",
    price: "1.450 TL",
    slug: "asimetrik-saten-elbise",
  },
  {
    id: "r2",
    title: "Keten Takımın Doğal Dökümü",
    lookTag: "LOOK 02",
    videoUrl: "https://assets.mixkit.co/videos/4828/4828-720.mp4",
    fallbackImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
    productName: "Doğal Keten Gömlek & Şort Takım",
    price: "1.850 TL",
    slug: "dogal-keten-ikili-gomlek-sort-takim",
  },
  {
    id: "r3",
    title: "Oversize Blazer Duruşu",
    lookTag: "LOOK 03",
    videoUrl: "https://assets.mixkit.co/videos/4833/4833-720.mp4",
    fallbackImage: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    productName: "Kruvaze Keten Blazer Ceket",
    price: "1.650 TL",
    slug: "kruvaze-keten-blazer-ceket",
  },
  {
    id: "r4",
    title: "Kemerli Trençkot Hareketi",
    lookTag: "LOOK 04",
    videoUrl: "https://assets.mixkit.co/videos/4835/4835-720.mp4",
    fallbackImage: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&auto=format&fit=crop&q=80",
    productName: "Dökümlü Kemerli Trençkot",
    price: "2.150 TL",
    slug: "dokumlu-kemerli-trenckot",
  },
];

export default function VideoReels() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block">
              HAREKET HALİNDE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight mt-1">
              Kumaşın Dökümü & Duruşu
            </h2>
          </div>

          <div className="flex items-center gap-2 text-stone-600 text-xs font-light">
            <InstagramIcon className="size-3.5" />
            <span>Instagram @ateliersilk Reels Seçkisi</span>
          </div>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {REELS.map((reel) => {
            const isPlaying = playingId === reel.id;

            return (
              <div
                key={reel.id}
                className="group relative aspect-[9/16] bg-stone-900 overflow-hidden shadow-md flex flex-col justify-between"
                onMouseEnter={() => setPlayingId(reel.id)}
                onMouseLeave={() => setPlayingId(null)}
              >
                
                {isPlaying ? (
                  <video
                    src={reel.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  />
                ) : (
                  <img
                    src={reel.fallbackImage}
                    alt={reel.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

                
                <div className="relative z-10 p-3.5 flex items-center justify-between text-white text-[10px] tracking-widest font-semibold uppercase">
                  <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-sm">
                    {reel.lookTag}
                  </span>

                  <span className="size-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                    {isPlaying ? (
                      <Pause className="size-3" />
                    ) : (
                      <Play className="size-3 fill-white ml-0.5" />
                    )}
                  </span>
                </div>

                
                <div className="relative z-10 p-3.5 text-white space-y-2">
                  <div>
                    <h4 className="text-xs sm:text-sm font-serif font-normal text-white truncate">
                      {reel.productName}
                    </h4>
                    <p className="text-xs font-semibold text-stone-200 mt-0.5">
                      {reel.price}
                    </p>
                  </div>

                  <Link
                    href={`/urun/${reel.slug}`}
                    className="w-full py-2 bg-white/95 hover:bg-white text-stone-950 text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <ShoppingBag className="size-3" />
                    <span>Ürünü Gör</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
