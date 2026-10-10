"use client";

import { WhatsAppIcon } from "@/components/ui/brand-icons";

const WHATSAPP_NUMBER = "905519283598";
const DISPLAY_NUMBER = "0551 928 35 98";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Merhaba Atelier Silk, ürünleriniz ve siparişim hakkında bilgi almak istiyorum."
  )}`;

  return (
    <aside
      aria-label="WhatsApp Canlı Destek"
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 flex items-center group select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp Sipariş ve Destek Hattı: ${DISPLAY_NUMBER}`}
        className="flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba59] hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="size-5 sm:size-5.5 fill-white" />
          
          <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full size-2.5 bg-white" />
          </span>
        </div>

        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-white/90">
            WHATSAPP DESTEK
          </span>
          <span className="text-xs font-bold text-white tracking-wide">
            {DISPLAY_NUMBER}
          </span>
        </div>
      </a>
    </aside>
  );
}
