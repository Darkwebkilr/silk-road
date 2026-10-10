"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Check, ShoppingBag, ArrowRight } from "lucide-react";

interface HotspotItem {
  id: string;
  name: string;
  category: string;
  price: number;
  slug: string;
  image: string;
  top: string;
  left: string;
}

const LOOK_PIECES: HotspotItem[] = [
  {
    id: "p-jacket",
    name: "Kruvaze Keten Blazer Ceket",
    category: "Dış Giyim",
    price: 1650,
    slug: "kruvaze-keten-blazer-ceket",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&auto=format&fit=crop&q=80",
    top: "35%",
    left: "48%",
  },
  {
    id: "p-pants",
    name: "Geniş Paça Keten Palazzo Pantolon",
    category: "Alt Giyim",
    price: 980,
    slug: "genis-paca-kumas-palazzo-pantolon",
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=200&auto=format&fit=crop&q=80",
    top: "68%",
    left: "56%",
  },
  {
    id: "p-bag",
    name: "Minimalist Deri Baget Çanta",
    category: "Aksesuar",
    price: 850,
    slug: "minimalist-deri-baget-canta",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&auto=format&fit=crop&q=80",
    top: "52%",
    left: "32%",
  },
];

export default function ShopTheLook() {
  const [activePin, setActivePin] = useState<string>("p-jacket");
  const [allAdded, setAllAdded] = useState(false);

  const activeItem = LOOK_PIECES.find((p) => p.id === activePin) || LOOK_PIECES[0];
  const totalLookPrice = LOOK_PIECES.reduce((sum, item) => sum + item.price, 0);

  const handleAddAll = () => {
    setAllAdded(true);
    setTimeout(() => setAllAdded(false), 2000);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#faf9f6] border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="max-w-xl mx-auto text-center mb-12 space-y-1">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block">
            STİL DANIŞMANLIĞI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
            Kombini Tamamla • Look 04
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm font-light mt-1">
            Görseldeki parçaların üzerine dokunarak detayları inceleyin veya kombini tek tıkla sepete ekleyin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 relative aspect-[3/4] sm:aspect-[4/5] bg-stone-200 overflow-hidden shadow-sm">
            
            
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80"
              alt="Atelier Silk Look 04 Kombini"
              className="w-full h-full object-cover"
              loading="lazy"
            />

            
            {LOOK_PIECES.map((piece) => {
              const isActive = activePin === piece.id;
              return (
                <div
                  key={piece.id}
                  style={{ top: piece.top, left: piece.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    type="button"
                    onClick={() => setActivePin(piece.id)}
                    aria-label={piece.name}
                    className="relative group p-2 focus:outline-none"
                  >
                    
                    <span
                      className={`absolute inset-0 rounded-full transition-transform duration-300 ${
                        isActive
                          ? "bg-white/40 scale-125 animate-ping"
                          : "bg-white/20 group-hover:scale-110"
                      }`}
                    />

                    
                    <span
                      className={`relative flex items-center justify-center size-7 rounded-full shadow-lg transition-all ${
                        isActive
                          ? "bg-stone-950 text-white scale-110"
                          : "bg-white text-stone-900 hover:scale-105"
                      }`}
                    >
                      <Plus
                        className={`size-3.5 transition-transform duration-200 ${
                          isActive ? "rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>
                </div>
              );
            })}

            
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-30">
              <div className="bg-white/95 backdrop-blur-md p-3.5 border border-stone-200 shadow-xl flex items-center gap-3">
                
                <img
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="size-14 object-cover bg-stone-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] tracking-wider uppercase text-stone-400 font-medium block">
                    {activeItem.category}
                  </span>
                  <h4 className="text-xs font-semibold text-stone-900 truncate mt-0.5">
                    {activeItem.name}
                  </h4>
                  <p className="text-xs font-bold text-stone-950 mt-0.5">
                    {activeItem.price.toLocaleString("tr-TR")} TL
                  </p>
                </div>
                <Link
                  href={`/urun/${activeItem.slug}`}
                  className="p-2 bg-stone-950 text-white hover:bg-stone-800 transition-colors"
                  aria-label="Ürüne git"
                >
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-serif italic text-stone-500">
                Atelier Lookbook • Edit 04
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                Keten Şıklığı & Doğal Zarafet
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed pt-1">
                Gündüzden geceye zahmetsiz geçiş sağlayan 3 temel parçayı bir araya getirdik.
              </p>
            </div>

            
            <div className="space-y-3 pt-2">
              {LOOK_PIECES.map((piece) => {
                const isSelected = activePin === piece.id;
                return (
                  <div
                    key={piece.id}
                    onClick={() => setActivePin(piece.id)}
                    className={`p-3.5 border transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? "border-stone-950 bg-white shadow-xs"
                        : "border-stone-200 bg-white/60 hover:bg-white hover:border-stone-300"
                    }`}
                  >
                    
                    <img
                      src={piece.image}
                      alt={piece.name}
                      className="size-16 object-cover bg-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] tracking-widest uppercase text-stone-400 font-medium">
                        {piece.category}
                      </span>
                      <h4 className="text-xs sm:text-[13px] font-medium text-stone-900 truncate">
                        {piece.name}
                      </h4>
                      <p className="text-xs font-semibold text-stone-950 mt-0.5">
                        {piece.price.toLocaleString("tr-TR")} TL
                      </p>
                    </div>

                    <Link
                      href={`/urun/${piece.slug}`}
                      className="text-[11px] font-medium text-stone-700 hover:text-stone-950 underline underline-offset-4 decoration-stone-300 shrink-0 pr-2"
                    >
                      İncele
                    </Link>
                  </div>
                );
              })}
            </div>

            
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Toplam Kombin Tutarı (3 Parça)
                </span>
                <span className="font-serif text-xl sm:text-2xl font-normal text-stone-950">
                  {totalLookPrice.toLocaleString("tr-TR")} TL
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddAll}
                className={`w-full py-3.5 px-6 text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 transition-all ${
                  allAdded
                    ? "bg-emerald-800 text-white"
                    : "bg-stone-950 text-white hover:bg-stone-800"
                }`}
              >
                {allAdded ? (
                  <>
                    <Check className="size-4" />
                    <span>Tüm Kombin Çantaya Eklendi!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    <span>Tüm Kombini Sepete Ekle</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-stone-400 text-center font-light">
                * Beden seçimlerinizi ödeme aşamasında ayrı ayrı özelleştirebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
