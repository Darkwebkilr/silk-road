"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Tag,
  Users,
  Sliders,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Genel Bakış",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Ürün Yönetimi",
    href: "/admin/urunler",
    icon: ShoppingBag,
    badge: null,
  },
  {
    name: "Siparişler",
    href: "/admin/siparisler",
    icon: Package,
    badge: "YENİ",
  },
  {
    name: "Kategoriler",
    href: "/admin/kategoriler",
    icon: Layers,
    badge: null,
  },
  {
    name: "İndirim & Kuponlar",
    href: "/admin/kuponlar",
    icon: Tag,
    badge: "%",
  },
  {
    name: "Müşteriler",
    href: "/admin/musteriler",
    icon: Users,
    badge: null,
  },
  {
    name: "Yerel Entegrasyonlar",
    href: "/admin/entegrasyonlar",
    icon: Sliders,
    badge: "TR",
  },
  {
    name: "Mağaza Ayarları",
    href: "/admin/ayarlar",
    icon: Settings,
    badge: null,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#141211] text-stone-200 border-r border-stone-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      <div>
        <div className="p-6 border-b border-stone-800/80">
          <Link href="/admin" className="block group">
            <div className="flex items-center gap-2 text-stone-400 group-hover:text-amber-400 transition-colors">
              <Sparkles className="size-3.5 text-amber-400" />
              <span className="text-[10px] tracking-[0.28em] uppercase font-semibold text-amber-400">
                YÖNETİM PANELİ
              </span>
            </div>
            <h1 className="font-serif text-xl tracking-[0.16em] uppercase text-white mt-1">
              ATELIER SILK
            </h1>
          </Link>
        </div>

        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] tracking-widest uppercase font-semibold text-stone-300">
            MENÜ
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? "bg-white text-stone-950 font-semibold shadow-xs"
                    : "text-stone-300 hover:text-white hover:bg-stone-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-4 shrink-0 stroke-[1.75]" />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isActive
                        ? "bg-stone-900 text-white"
                        : "bg-amber-400/20 text-amber-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-stone-800/80 bg-[#100e0d]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs transition-colors group"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Mağazayı Gör</span>
          </div>
          <TrendingUp className="size-3 text-stone-300" />
        </Link>
      </div>
    </aside>
  );
}
