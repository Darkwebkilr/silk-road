"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/brand-icons";

const MOBILE_CATEGORIES = [
  { name: "YENİ GELENLER", href: "/kategori/yeni-gelenler", badge: "YENİ" },
  { name: "ELBİSE KOLEKSİYONU", href: "/kategori/elbiseler" },
  { name: "BLAZER & CEKET", href: "/kategori/dis-giyim" },
  { name: "İKİLİ KETEN TAKIMLAR", href: "/kategori/takimlar" },
  { name: "GÖMLEK & BLUZ", href: "/kategori/ust-giyim" },
  { name: "PANTOLON & ETEK", href: "/kategori/alt-giyim" },
  { name: "LOOKBOOK '26", href: "/lookbook" },
  { name: "İNDİRİM", href: "/kategori/indirim", isHot: true },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Menüyü Aç"
            className="lg:hidden p-2 text-stone-800 hover:text-stone-950 transition-colors"
          />
        }
      >
        <Menu className="size-5 stroke-[1.5]" />
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] p-0 flex flex-col bg-white">
        {/* Başlık / Logo */}
        <SheetHeader className="p-6 border-b border-stone-200 text-left">
          <SheetTitle className="font-serif text-2xl tracking-[0.2em] uppercase text-stone-900 font-normal">
            ATELIER SILK
          </SheetTitle>
          <span className="text-[9px] tracking-[0.3em] uppercase text-stone-400">
            İstanbul • Butik Koleksiyon
          </span>
        </SheetHeader>

        {/* Kategoriler */}
        <div className="flex-1 overflow-y-auto p-5 space-y-1">
          {MOBILE_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between py-3 border-b border-stone-100 text-xs tracking-[0.16em] uppercase font-medium transition-colors ${
                cat.isHot ? "text-rose-700 font-semibold" : "text-stone-800 hover:text-stone-950"
              }`}
            >
              <span>{cat.name}</span>
              <ChevronRight className="size-3.5 text-stone-400" />
            </Link>
          ))}

          {/* Hızlı Bilgi Linkleri */}
          <div className="pt-6 space-y-2.5 text-[11px] text-stone-500 tracking-wider">
            <Link
              href="/siparis-takip"
              onClick={() => setOpen(false)}
              className="block hover:text-stone-900 py-1"
            >
              Sipariş Takibi
            </Link>
            <Link
              href="/seffaf-kargo"
              onClick={() => setOpen(false)}
              className="block hover:text-stone-900 py-1"
            >
              Şeffaf Kargo Güvencesi
            </Link>
            <Link
              href="/degisim-ve-iade"
              onClick={() => setOpen(false)}
              className="block hover:text-stone-900 py-1"
            >
              Kolay Değişim & İade
            </Link>
          </div>
        </div>

        {/* Alt Footer Bölümü */}
        <div className="p-5 border-t border-stone-200 bg-[#faf9f6] space-y-3">
          <a
            href="https://wa.me/905550000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 bg-stone-900 text-white text-xs tracking-wider uppercase font-medium w-full"
          >
            <WhatsAppIcon className="size-3.5 text-emerald-400" />
            <span>WhatsApp Sipariş Hattı</span>
          </a>

          <div className="flex items-center justify-center gap-3 text-stone-500 text-[11px]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-stone-900"
            >
              <InstagramIcon className="size-3.5" />
              <span>@ateliersilk</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
