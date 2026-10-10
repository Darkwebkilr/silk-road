"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronDown,
  Flame,
  Sparkles,
  ArrowRight,
  Shirt,
  Scissors,
  Sparkle,
  Layers,
  Tag,
} from "lucide-react";

interface CategoryGroup {
  name: string;
  href: string;
  badge?: string;
  isHot?: boolean;
}

const BOUTIQUE_CATEGORIES: CategoryGroup[] = [
  { name: "Yeni Gelenler", href: "/kategori/yeni-gelenler", badge: "YENİ" },
  { name: "Elbiseler", href: "/kategori/elbiseler" },
  { name: "Üst Giyim", href: "/kategori/ust-giyim" },
  { name: "Alt Giyim", href: "/kategori/alt-giyim" },
  { name: "Dış Giyim & Ceket", href: "/kategori/dis-giyim" },
  { name: "Takımlar & Kombin", href: "/kategori/takimlar" },
  { name: "Aksesuar & Çanta", href: "/kategori/aksesuar" },
  {
    name: "Fırsat & İndirim",
    href: "/kategori/indirim",
    badge: "%50'ye Varan",
    isHot: true,
  },
];

const BOUTIQUE_MEGA_MENU = [
  {
    title: "Elbise Koleksiyonu",
    icon: Sparkle,
    items: [
      { name: "Saten & Gece Elbiseleri", href: "/kategori/saten-elbise" },
      { name: "Midi & Maxi Elbiseler", href: "/kategori/maxi-elbise" },
      { name: "Mini & Günlük Elbiseler", href: "/kategori/mini-elbise" },
      { name: "Keten Yazlık Elbiseler", href: "/kategori/keten-elbise" },
      { name: "Triko & Örme Elbiseler", href: "/kategori/triko-elbise" },
    ],
  },
  {
    title: "Üst & Dış Giyim",
    icon: Shirt,
    items: [
      { name: "Keten & Şifon Gömlekler", href: "/kategori/gomlek" },
      { name: "Oversize Blazer Ceketler", href: "/kategori/blazer-ceket" },
      { name: "Trençkot & Duster Mont", href: "/kategori/trenckot" },
      { name: "Şık Crop & Bodyler", href: "/kategori/crop" },
      { name: "Hırka & Triko Kazaklar", href: "/kategori/hirka" },
    ],
  },
  {
    title: "Alt Giyim & Pantolon",
    icon: Scissors,
    items: [
      { name: "Geniş Paça Kumaş Pantolon", href: "/kategori/kumas-pantolon" },
      { name: "Wide Leg & Mom Jean", href: "/kategori/jean" },
      { name: "Saten & Pileli Etekler", href: "/kategori/etek" },
      { name: "Keten Şort & Bermudalar", href: "/kategori/sort" },
      { name: "Palazzo Rahat Kesimler", href: "/kategori/palazzo" },
    ],
  },
  {
    title: "Kombin & Tamamlayıcı",
    icon: Layers,
    items: [
      { name: "İkili Ceket Takımları", href: "/kategori/ikili-takim" },
      { name: "Deri Omuz & El Çantaları", href: "/kategori/canta" },
      { name: "Gold & Gümüş Takılar", href: "/kategori/taki" },
      { name: "Şık Kemer & Güneş Gözlüğü", href: "/kategori/kemer-gozluk" },
      { name: "Butik Seçki: Haftanın Kombini", href: "/kategori/haftanin-kombini" },
    ],
  },
];

export default function NavCategories() {
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  return (
    <div className="relative border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
        
        <div
          className="relative py-2"
          onMouseEnter={() => setIsMegaOpen(true)}
          onMouseLeave={() => setIsMegaOpen(false)}
        >
          <button
            type="button"
            aria-expanded={isMegaOpen}
            aria-haspopup="true"
            className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100 hover:text-rose-600 dark:hover:text-rose-400 py-1.5 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <Menu className="size-4" />
            <span className="font-semibold tracking-wide uppercase text-xs">Koleksiyonlar</span>
            <ChevronDown
              className={`size-3.5 transition-transform duration-200 ${
                isMegaOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          
          {isMegaOpen && (
            <div className="absolute top-full left-0 w-[840px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
              <div className="grid grid-cols-4 gap-6">
                {BOUTIQUE_MEGA_MENU.map((col) => {
                  const Icon = col.icon;
                  return (
                    <div key={col.title} className="space-y-3">
                      <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800 text-xs uppercase tracking-wider">
                        <Icon className="size-4 text-rose-500" />
                        <span>{col.title}</span>
                      </div>
                      <ul className="space-y-2">
                        {col.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:translate-x-1 inline-block transition-transform"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              
              <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-rose-50/50 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-100 dark:border-rose-900/30">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-rose-500/10 text-rose-500 rounded-lg">
                    <Tag className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Yeni Sezon Lookbook Yayında
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Instagram&apos;da en çok sorulan ve beğeni toplayan kombinleri hemen keşfedin.
                    </p>
                  </div>
                </div>

                <Link
                  href="/kategori/kombinler"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Kombinleri İncele
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        
        <nav aria-label="Giyim Kategorileri" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {BOUTIQUE_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`relative py-3 px-3 text-xs xl:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                cat.isHot
                  ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-semibold"
                  : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70"
              }`}
            >
              {cat.isHot && <Flame className="size-3.5 fill-rose-500 text-rose-500 animate-pulse" />}
              <span>{cat.name}</span>
              {cat.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    cat.isHot
                      ? "bg-rose-500 text-white"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {cat.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        
        <div className="hidden xl:flex items-center">
          <Link
            href="/instagram-shop"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <Sparkles className="size-3.5 text-rose-500" />
            <span>Instagram Seçkisi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
