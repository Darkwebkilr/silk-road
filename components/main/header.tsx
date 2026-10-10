"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, X, ChevronDown, User } from "lucide-react";
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
    name: "Sırt Dekolteli Saten Midi Elbise",
    price: "1.350 TL",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&auto=format&fit=crop&q=80",
    slug: "sirt-dekolteli-saten-midi-elbise",
  },
  {
    name: "Doğal Keten İkili Gömlek & Şort Takım",
    price: "1.850 TL",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&auto=format&fit=crop&q=80",
    slug: "dogal-keten-ikili-gomlek-sort-takim",
  },
];

export default function Header() {
  const router = useRouter();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleQuickSearch = (keyword: string) => {
    setIsSearchOpen(false);
    setSearchQuery(keyword);
    router.push(`/arama?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 bg-[#faf9f6] border-b border-stone-200 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full bg-[#181615] text-stone-300 text-[10px] sm:text-[11px] py-1.5 px-4 tracking-[0.25em] uppercase font-light border-b border-stone-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-2 text-stone-400">
              <span className="size-1 rounded-full bg-emerald-400" />
              <span>İSTANBUL MERKEZ ATÖLYE</span>
            </div>

            <p className="mx-auto sm:mx-0 text-center transition-opacity duration-500 text-stone-200">
              {TICKER_MESSAGES[tickerIndex]}
            </p>

            <a
              href="https://wa.me/905519283598"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
            >
              <WhatsAppIcon className="size-3.5 text-emerald-400" />
              <span>WhatsApp Destek Hattı</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 border-b border-stone-200/70 gap-4">
            <div className="flex items-center gap-3 sm:gap-6 min-w-0">
              <MobileNav />

              <Link
                href="/"
                className="group flex flex-col items-start outline-none shrink-0"
              >
                <span className="font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.18em] text-stone-950 font-normal uppercase leading-tight transition-all">
                  ATELIER SILK
                </span>
                <span className="text-[6.5px] sm:text-[7px] tracking-[0.35em] uppercase text-stone-400 font-medium -mt-0.5">
                  HAUTE BOUTIQUE
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-3 xl:gap-4.5 2xl:gap-5 min-w-0 pl-2">
                <Link
                  href="/kategori/yeni-gelenler"
                  className="text-[10px] xl:text-[11px] tracking-[0.14em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>YENİLER</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                </Link>

                <div
                  className="relative shrink-0"
                  onMouseEnter={() => setIsCollectionsOpen(true)}
                  onMouseLeave={() => setIsCollectionsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                    className="text-[10px] xl:text-[11px] tracking-[0.14em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 flex items-center gap-0.5 group cursor-pointer shrink-0"
                  >
                    <span>KOLEKSİYON</span>
                    <ChevronDown
                      className={`size-3 transition-transform duration-200 ${
                        isCollectionsOpen ? "rotate-180" : ""
                      }`}
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                  </button>

                  {isCollectionsOpen && (
                    <div className="absolute top-full left-0 w-[500px] bg-white border border-stone-200 shadow-2xl p-6 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-200">
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
                  className="text-[10px] xl:text-[11px] tracking-[0.14em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>ELBİSE</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link
                  href="/kategori/dis-giyim"
                  className="text-[10px] xl:text-[11px] tracking-[0.14em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>CEKET</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link
                  href="/kategori/takimlar"
                  className="text-[10px] xl:text-[11px] tracking-[0.14em] font-medium text-stone-800 hover:text-stone-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>TAKIM</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link
                  href="/kategori/indirim"
                  className="text-[10px] xl:text-[11px] tracking-[0.14em] font-semibold text-rose-800 hover:text-rose-950 transition-colors uppercase relative py-1 group shrink-0"
                >
                  <span>İNDİRİM</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-rose-800 transition-all duration-300 group-hover:w-full" />
                </Link>
              </nav>
            </div>

            <div className="flex items-center justify-end gap-2.5 sm:gap-3 xl:gap-4 min-w-0 pl-2">
              <Link
                href="/giris-yap"
                aria-label="Hesabım"
                className="group flex items-center gap-1.5 p-1 text-stone-700 hover:text-stone-950 transition-colors shrink-0"
              >
                <User className="size-4 stroke-[1.5]" />
                <span className="hidden xl:inline text-[10px] tracking-[0.18em] uppercase font-medium text-stone-600 group-hover:text-stone-950">
                  HESABIM
                </span>
              </Link>

              <a
                href="https://wa.me/905519283598"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp İletişim"
                className="hidden lg:flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors p-1 shrink-0"
              >
                <WhatsAppIcon className="size-4 text-emerald-600" />
                <span className="hidden xl:inline text-[10px] tracking-[0.18em] uppercase font-medium text-stone-600 hover:text-stone-950">
                  WHATSAPP
                </span>
              </a>

              <Link
                href="/favoriler"
                aria-label="Favorilerim"
                className="relative p-1 text-stone-700 hover:text-stone-950 transition-colors shrink-0"
              >
                <Heart className="size-4 stroke-[1.5]" />
                <span className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-stone-950" />
              </Link>

              <div className="shrink-0">
                <CartButton />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#faf9f6] py-2 px-4 sm:px-6 lg:px-8 border-t border-stone-200/50 shadow-2xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-2">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center bg-white border border-stone-300 hover:border-stone-500 transition-all px-3 py-1.5 shadow-2xs cursor-pointer select-none"
            >
              <Search className="size-3.5 text-stone-400 shrink-0 mr-2.5" />
              <span className="w-full text-xs sm:text-[13px] text-stone-400 truncate">
                Koleksiyonda arayın: kruvaze blazer ceket, keten elbise, trençkot, palazzo pantolon...
              </span>
              <span className="ml-2 px-2.5 sm:px-3 py-1 bg-stone-950 text-white text-[9.5px] sm:text-[10px] uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors shrink-0">
                ARA
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 shrink-0 text-[11px] text-stone-500 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 mr-1">Trend:</span>
              {["Keten Blazer", "Saten Midi", "Palazzo", "Trençkot"].map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => handleQuickSearch(keyword)}
                  className="px-2 py-0.5 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 text-[10px] transition-colors cursor-pointer"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="h-40 sm:h-44 lg:h-48" />

      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200 flex flex-col justify-start pt-16 sm:pt-24 px-4 overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full mx-auto bg-white p-6 sm:p-10 shadow-2xl relative animate-in slide-in-from-top-4 duration-300 cursor-default mb-10"
          >
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-950 transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="size-5" />
            </button>

            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-2">
              ATELIER SILK ARAMA
            </span>

            <form
              role="search"
              onSubmit={handleSearchSubmit}
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

            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
              <span className="text-stone-400 text-[11px] uppercase tracking-wider mr-1">
                Trendler:
              </span>
              {["Keten Blazer", "Saten Midi", "Palazzo Pantolon", "Dökümlü Trençkot"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleQuickSearch(item)}
                    className="px-3 py-1 bg-[#faf9f6] border border-stone-200 hover:border-stone-400 text-stone-800 text-[11px] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block mb-4">
                ÖNE ÇIKAN PARÇALAR & ÖNERİLER
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SEARCH_SUGGESTIONS.map((item) => (
                  <Link
                    key={item.name}
                    href={`/urun/${item.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="group flex items-center gap-3 p-2 bg-[#faf9f6] border border-stone-200/80 hover:border-stone-400 transition-colors"
                  >
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
    </>
  );
}
