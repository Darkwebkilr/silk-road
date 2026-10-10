"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, X, ArrowRight, ChevronDown } from "lucide-react";
import CartButton from "./cart-button";
import MobileNav from "./mobile-nav";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

const TICKER_MESSAGES = [
  "TÜM TÜRKİYE'YE 1.500 TL ÜZERİ SİPARİŞLERDE ÜCRETSİZ KARGO",
  "İSTANBUL İÇİ SEÇİLİ BÖLGELERE AYNI GÜN HIZLI TESLİMAT",
  "ŞEFFAF KARGO GÜVENCESİ İLE KONTROLLÜ TESLİMAT & 14 GÜN DEĞİŞİM",
];

const SEARCH_SUGGESTIONS = [
  {
    name: "Kruvaze Keten Blazer Ceket",
    price: "1.650 TL",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&auto=format&fit=crop&q=80",
    slug: "kruvaze-keten-blazer-ceket",
  },
  {
    id: "s2",
    name: "Sırt Dekolteli Saten Midi Elbise",
    price: "1.350 TL",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&auto=format&fit=crop&q=80",
    slug: "sirt-dekolteli-saten-midi-elbise",
  },
  {
    id: "s3",
    name: "Doğal Keten İkili Gömlek & Şort Takım",
    price: "1.850 TL",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&auto=format&fit=crop&q=80",
    slug: "dogal-keten-ikili-gomlek-sort-takim",
  },
];

export default function Header() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  // Üst duyuru döngüsü
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll takibi (Header küçülme ve cam efekti)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape ile aramayı kapatma
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsCollectionsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/90"
            : "bg-[#faf9f6] border-b border-stone-200/60"
        }`}
      >
        {/* 1. Ultra Minimal Üst Ticker Çubuğu */}
        <div className="w-full bg-[#181615] text-stone-300 text-[10px] sm:text-[11px] py-1.5 px-4 tracking-[0.25em] uppercase font-light border-b border-stone-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-2 text-stone-400">
              <span className="size-1 rounded-full bg-emerald-400" />
              <span>İSTANBUL MERKEZ ATÖLYE</span>
            </div>

            {/* Dönen Mesaj */}
            <p className="mx-auto sm:mx-0 text-center transition-opacity duration-500 text-stone-200">
              {TICKER_MESSAGES[tickerIndex]}
            </p>

            <a
              href="https://wa.me/905550000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
            >
              <WhatsAppIcon className="size-3 text-emerald-400" />
              <span>WhatsApp Danışman</span>
            </a>
          </div>
        </div>

        {/* 2. Ana Header Gövdesi */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-16 lg:h-18" : "h-20 lg:h-24"
            }`}
          >
            {/* Sol: Mobilde Menü Butonu, Masaüstünde Navigasyon Linkleri */}
            <div className="flex items-center gap-4 xl:gap-6 flex-1 pr-4 lg:pr-8 xl:pr-12">
              <MobileNav />

              <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5.5">
                <Link
                  href="/kategori/yeni-gelenler"
                  className="text-[10px] xl:text-[11px] tracking-[0.16em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>YENİLER</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Koleksiyon Mega Menü Tetikleyicisi */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCollectionsOpen(true)}
                  onMouseLeave={() => setIsCollectionsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                    className="text-[10px] xl:text-[11px] tracking-[0.16em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 flex items-center gap-0.5 group cursor-pointer shrink-0"
                  >
                    <span>KOLEKSİYON</span>
                    <ChevronDown
                      className={`size-3 transition-transform duration-200 ${
                        isCollectionsOpen ? "rotate-180" : ""
                      }`}
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                  </button>

                  {/* Koleksiyon Mega Dropdown */}
                  {isCollectionsOpen && (
                    <div className="absolute top-full left-0 w-[540px] bg-white border border-stone-200 shadow-2xl p-6 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block mb-3">
                            KATEGORİLER
                          </span>
                          <ul className="space-y-2.5 text-xs text-stone-700 font-light">
                            <li>
                              <Link
                                href="/kategori/elbiseler"
                                className="hover:text-stone-950 hover:underline underline-offset-4 decoration-stone-300 block"
                              >
                                Saten & Midi Elbiseler
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/kategori/dis-giyim"
                                className="hover:text-stone-950 hover:underline underline-offset-4 decoration-stone-300 block"
                              >
                                Kruvaze Blazer & Trençkot
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/kategori/takimlar"
                                className="hover:text-stone-950 hover:underline underline-offset-4 decoration-stone-300 block"
                              >
                                Doğal Keten İkili Takımlar
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/kategori/alt-giyim"
                                className="hover:text-stone-950 hover:underline underline-offset-4 decoration-stone-300 block"
                              >
                                Geniş Paça Palazzo Pantolon
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block mb-3">
                            LOOKBOOK SERİSİ
                          </span>
                          <div className="space-y-2">
                            <Link
                              href="/kategori/yeni-gelenler"
                              className="group block p-2.5 bg-[#faf9f6] border border-stone-200 hover:border-stone-400 transition-colors"
                            >
                              <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-900 block">
                                LOOK 01 • THE LINEN EDIT
                              </span>
                              <span className="text-[11px] text-stone-500 font-light mt-0.5 block">
                                Saf keten kumaşlar ve doğal tonlar.
                              </span>
                            </Link>

                            <Link
                              href="/kategori/elbiseler"
                              className="group block p-2.5 bg-[#faf9f6] border border-stone-200 hover:border-stone-400 transition-colors"
                            >
                              <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-900 block">
                                LOOK 02 • SOIRÉE SILK
                              </span>
                              <span className="text-[11px] text-stone-500 font-light mt-0.5 block">
                                Akışkan saten ve gece silüetleri.
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/kategori/elbiseler"
                  className="text-[10px] xl:text-[11px] tracking-[0.16em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>ELBİSE</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link
                  href="/kategori/dis-giyim"
                  className="text-[10px] xl:text-[11px] tracking-[0.16em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>CEKET</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link
                  href="/kategori/takimlar"
                  className="text-[10px] xl:text-[11px] tracking-[0.16em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>TAKIM</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link
                  href="/kategori/indirim"
                  className="text-[10px] xl:text-[11px] tracking-[0.16em] font-semibold text-rose-800 hover:text-rose-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>İNDİRİM</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-rose-800 transition-all duration-300 group-hover:w-full" />
                </Link>
              </nav>
            </div>

            {/* Orta: Mimari İkonik Butik Marka Logosu */}
            <div className="flex-shrink-0 text-center px-4 sm:px-8 lg:px-10 xl:px-14">
              <Link
                href="/"
                className="group inline-flex flex-col items-center outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl lg:text-[32px] tracking-[0.24em] text-stone-950 font-normal uppercase leading-tight transition-all">
                  ATELIER SILK
                </span>
                <span className="text-[8px] tracking-[0.45em] uppercase text-stone-400 font-medium -mt-0.5">
                  HAUTE BOUTIQUE • İSTANBUL
                </span>
              </Link>
            </div>

            {/* Sağ: İnce Etkileşim Grubu (Arama, WhatsApp, Favoriler, Çanta) */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 flex-1 pl-4 lg:pl-8">
              {/* Arama Butonu */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Arama"
                className="group flex items-center gap-1.5 p-1 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
              >
                <Search className="size-4 stroke-[1.5]" />
                <span className="hidden xl:inline text-[10px] tracking-[0.2em] uppercase font-medium text-stone-500 group-hover:text-stone-950">
                  ARA
                </span>
              </button>

              {/* WhatsApp Butonu */}
              <a
                href="https://wa.me/905550000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp İletişim"
                className="hidden lg:flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors p-1"
              >
                <WhatsAppIcon className="size-4 text-emerald-600" />
                <span className="hidden xl:inline text-[10px] tracking-[0.2em] uppercase font-medium text-stone-500 hover:text-stone-950">
                  WHATSAPP
                </span>
              </a>

              {/* Favoriler */}
              <Link
                href="/favoriler"
                aria-label="Favorilerim"
                className="relative p-1 text-stone-700 hover:text-stone-950 transition-colors"
              >
                <Heart className="size-4 stroke-[1.5]" />
                <span className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-stone-950" />
              </Link>

              {/* Alışveriş Çantası Çekmecesi */}
              <CartButton />
            </div>
          </div>
        </div>

        {/* 3. Tam Ekran Editoryal Arama Katmanı (Search Overlay) */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200 flex flex-col justify-start pt-16 sm:pt-24 px-4">
            <div className="max-w-3xl w-full mx-auto bg-white p-6 sm:p-10 shadow-2xl relative animate-in slide-in-from-top-4 duration-300">
              {/* Kapat Butonu */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-950 transition-colors"
                aria-label="Kapat"
              >
                <X className="size-5" />
              </button>

              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-2">
                ATELIER SILK ARAMA
              </span>

              {/* Arama Inputu */}
              <form
                role="search"
                action="/arama"
                className="flex items-center border-b-2 border-stone-950 pb-3"
              >
                <Search className="size-5 text-stone-400 mr-3" />
                <input
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Koleksiyonda arayın: keten blazer, saten elbise, trençkot..."
                  autoFocus
                  className="w-full text-base sm:text-xl font-serif text-stone-950 placeholder:text-stone-300 outline-none bg-transparent"
                />
              </form>

              {/* Popüler Kelimeler */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
                <span className="text-stone-400 text-[11px] uppercase tracking-wider mr-1">
                  Trendler:
                </span>
                {["Keten Blazer", "Saten Midi", "Palazzo Pantolon", "Dökümlü Trençkot"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSearchQuery(item)}
                      className="px-3 py-1 bg-[#faf9f6] border border-stone-200 hover:border-stone-400 text-stone-800 text-[11px] transition-colors"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {/* Öne Çıkan Parçalar Vitrini */}
              <div className="mt-8 pt-6 border-t border-stone-100">
                <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block mb-4">
                  ÖNE ÇIKAN PARÇALAR
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SEARCH_SUGGESTIONS.map((item) => (
                    <Link
                      key={item.name}
                      href={`/urun/${item.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="group flex items-center gap-3 p-2 bg-[#faf9f6] border border-stone-200/80 hover:border-stone-400 transition-colors"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-14 object-cover bg-stone-200"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-medium text-stone-900 truncate group-hover:underline">
                          {item.name}
                        </h5>
                        <p className="text-xs font-semibold text-stone-950 mt-0.5">
                          {item.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
