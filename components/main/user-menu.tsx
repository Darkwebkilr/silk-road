"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  Ticket,
  HelpCircle,
  LogIn,
  UserPlus,
  ChevronDown,
} from "lucide-react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Kullanıcı Menüsü"
        className="group flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center justify-center size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
          <User className="size-4" />
        </div>
        <div className="hidden xl:flex flex-col text-left leading-none">
          <span className="text-[10px] text-zinc-400 font-medium">Hesabım</span>
          <div className="flex items-center gap-0.5 mt-0.5">
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Giriş Yap
            </span>
            <ChevronDown
              className={`size-3 text-zinc-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 w-64 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
          {/* Giriş & Kayıt Butonları */}
          <div className="space-y-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <Link
              href="/giris-yap"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              <LogIn className="size-3.5" />
              <span>Giriş Yap</span>
            </Link>
            <Link
              href="/kayit-ol"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition-colors"
            >
              <UserPlus className="size-3.5" />
              <span>Üye Ol</span>
            </Link>
          </div>

          {/* Menü Linkleri */}
          <nav aria-label="Hesap linkleri" className="pt-2 space-y-1">
            <Link
              href="/hesabim/siparisler"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Package className="size-4 text-zinc-400" />
              <span>Siparişlerim</span>
            </Link>

            <Link
              href="/favoriler"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Heart className="size-4 text-zinc-400" />
              <span>Favorilerim</span>
            </Link>

            <Link
              href="/kuponlar"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Ticket className="size-4 text-zinc-400" />
              <span>İndirim Kuponlarım</span>
            </Link>

            <Link
              href="/yardim"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <HelpCircle className="size-4 text-zinc-400" />
              <span>Müşteri Hizmetleri</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
