"use client";

import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

export default function Footer() {
  return (
    <footer className="bg-[#1c1917] text-stone-300 pt-16 pb-12 text-xs font-light">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Üst Kısım: E-Bülten Kayıt & Butik Bildirimi */}
        <div className="pb-12 border-b border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-serif text-2xl text-white font-normal">
              Atelier Silk Lookbook
            </h3>
            <p className="text-stone-400 text-xs">
              Sınırlı üretim yeni sezon parçaları ve butik indirimlerinden ilk siz haberdar olun.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center w-full md:w-auto max-w-md border-b border-stone-600 pb-1"
          >
            <input
              type="email"
              placeholder="E-posta adresiniz..."
              className="bg-transparent text-white placeholder:text-stone-500 text-xs outline-none w-64 pr-2"
            />
            <button
              type="submit"
              className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white hover:text-stone-400 transition-colors whitespace-nowrap"
            >
              KAYDOL
            </button>
          </form>
        </div>

        {/* Orta Kısım: Linkler */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <p className="font-serif text-lg tracking-wider text-white">ATELIER SILK</p>
            <p className="text-stone-400 text-[11px] leading-relaxed max-w-xs">
              Instagram&apos;dan ilham alan zamansız kadın giyim tasarımları.
              Kusursuz kalıp, kaliteli kumaş ve hızlı teslimat.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded-full border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="size-3.5" />
              </a>
              <a
                href="https://wa.me/905550000000"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded-full border border-stone-700 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-white font-semibold">
              KOLEKSİYONLAR
            </h4>
            <ul className="space-y-2 text-stone-400 text-[11px]">
              <li>
                <Link href="/kategori/yeni-gelenler" className="hover:text-white transition-colors">
                  Yeni Gelenler
                </Link>
              </li>
              <li>
                <Link href="/kategori/elbiseler" className="hover:text-white transition-colors">
                  Elbise Koleksiyonu
                </Link>
              </li>
              <li>
                <Link href="/kategori/dis-giyim" className="hover:text-white transition-colors">
                  Blazer & Trençkot
                </Link>
              </li>
              <li>
                <Link href="/kategori/takimlar" className="hover:text-white transition-colors">
                  İkili Keten Takımlar
                </Link>
              </li>
              <li>
                <Link href="/kategori/indirim" className="text-rose-400 hover:text-rose-300 transition-colors">
                  Fırsat & İndirim
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-white font-semibold">
              MÜŞTERİ HİZMETLERİ
            </h4>
            <ul className="space-y-2 text-stone-400 text-[11px]">
              <li>
                <Link href="/kargo-ve-teslimat" className="hover:text-white transition-colors">
                  Kargo ve Teslimat
                </Link>
              </li>
              <li>
                <Link href="/degisim-ve-iade" className="hover:text-white transition-colors">
                  Kolay Değişim & İade
                </Link>
              </li>
              <li>
                <Link href="/seffaf-kargo" className="hover:text-white transition-colors">
                  Şeffaf Kargo Güvencesi
                </Link>
              </li>
              <li>
                <Link href="/beden-tablosu" className="hover:text-white transition-colors">
                  Beden Tablosu
                </Link>
              </li>
              <li>
                <Link href="/siparis-takip" className="hover:text-white transition-colors">
                  Sipariş Takibi
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-white font-semibold">
              İLETİŞİM & BUTİK
            </h4>
            <ul className="space-y-2 text-stone-400 text-[11px]">
              <li className="flex items-center gap-1.5">
                <WhatsAppIcon className="size-3 text-emerald-400" />
                <span>WhatsApp: 0555 000 00 00</span>
              </li>
              <li>Destek: butik@ateliersilk.com</li>
              <li>Nişantaşı / İstanbul</li>
              <li className="text-stone-500 pt-1">Hafta içi 09:00 - 19:00</li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım: Telif */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[10px] tracking-wider uppercase">
          <p>© 2026 ATELIER SILK. Tüm Hakları Saklıdır.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>256-Bit SSL Güvenli Ödeme</span>
            <span>•</span>
            <span>Mastercard / Visa / Troy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
