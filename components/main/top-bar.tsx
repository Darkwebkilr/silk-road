import Link from "next/link";
import { Truck, ShieldCheck, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";

export default function TopBar() {
  return (
    <div className="w-full bg-zinc-950 text-zinc-100 text-xs py-2 px-4 border-b border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-rose-500/20 text-rose-300 font-semibold px-2 py-0.5 rounded-full text-[10px] tracking-wide border border-rose-500/30">
            YENİ SEZON
          </span>
          <p className="font-normal text-zinc-300 text-[11px] sm:text-xs">
            İlk siparişe özel <strong className="text-white font-semibold">%10 İndirim</strong> kodu:{" "}
            <span className="bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-zinc-100 font-semibold border border-zinc-700">
              BUTIK10
            </span>{" "}
            • 1.000 TL üzeri <span className="text-white font-semibold">Kargo Bedava!</span>
          </p>
        </div>

        
        <div className="flex items-center gap-4 text-zinc-300 text-[11px] sm:text-xs">
          <a
            href="https://wa.me/905519283598?text=Merhaba,%20butiğinizden%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
          >
            <MessageCircle className="size-3.5 fill-emerald-400/20" />
            <span>WhatsApp Sipariş Hattı</span>
          </a>

          <span className="h-3 w-px bg-zinc-800 hidden md:block" aria-hidden="true" />

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 hover:text-pink-400 transition-colors"
          >
            <InstagramIcon className="size-3.5 text-pink-400" />
            <span>@silkroadboutique</span>
          </a>

          <span className="h-3 w-px bg-zinc-800 hidden sm:block" aria-hidden="true" />

          <div className="hidden sm:flex items-center gap-1.5 text-zinc-400">
            <Truck className="size-3.5 text-amber-400" />
            <span>Aynı Gün Kargo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
