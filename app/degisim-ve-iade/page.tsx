import Link from "next/link";
import { RefreshCw, Check, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#faf9f6] border-b border-stone-200 py-12 sm:py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase mb-3">
            <Link href="/" className="hover:text-stone-900">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">Değişim ve İade</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl text-stone-950 font-normal">
            14 Gün Kolay Değişim
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light">
            Beden veya model uyumsuzluğunda zahmetsiz değişim garantisi.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 lg:py-16 space-y-8 text-xs text-stone-700 leading-relaxed font-light">
        <div className="p-6 bg-[#faf9f6] border border-stone-200 flex items-start gap-4">
          <RefreshCw className="size-7 text-stone-950 shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-stone-950 font-normal">
              Koşulsuz Beden Değişimi
            </h3>
            <p>
              Sipariş ettiğiniz parçanın bedeni uymadıysa, teslim aldığınız tarihten itibaren 14 gün içerisinde WhatsApp destek hattımızdan değişim talebinde bulunabilirsiniz. Yeni bedeniniz aynı gün ücretsiz kargolanır.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-serif text-xl text-stone-950 font-normal">Değişim Adımları</h4>
          <ol className="space-y-3 list-decimal list-inside pl-1">
            <li>WhatsApp hattımıza (0551 928 35 98) sipariş numaranızı ve istediğiniz yeni bedeni bildirin.</li>
            <li>Size ileteceğimiz anlaşmalı kargo kodu ile ürünü faturasıyla birlikte ücretsiz kargoya verin.</li>
            <li>Kargonuz bize ulaştığında yeni bedeniniz hazırlanarak tarafınıza gönderilir.</li>
          </ol>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <a
            href="https://wa.me/905519283598?text=Merhaba,%20ürünümde%20beden%20değişimi%20yapmak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-950 text-white text-xs tracking-wider uppercase font-medium hover:bg-stone-800 transition-colors"
          >
            <WhatsAppIcon className="size-4 text-emerald-400" />
            <span>WhatsApp ile Değişim Başlat</span>
          </a>
        </div>
      </div>
    </div>
  );
}
