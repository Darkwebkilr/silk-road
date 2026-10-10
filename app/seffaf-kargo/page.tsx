import Link from "next/link";
import { ShieldCheck, Check, ChevronRight } from "lucide-react";

export default function TransparentShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#faf9f6] border-b border-stone-200 py-12 sm:py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase mb-3">
            <Link href="/" className="hover:text-stone-900">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">Şeffaf Kargo Güvencesi</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl text-stone-950 font-normal">
            Şeffaf Kargo Güvencesi
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light">
            Siparişinizi teslim alırken içiniz rahat olsun. Kontrollü ve güvenli butik alışverişi.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 lg:py-16 space-y-8 text-xs text-stone-700 leading-relaxed font-light">
        <div className="p-6 bg-[#faf9f6] border border-stone-200 flex items-start gap-4">
          <ShieldCheck className="size-8 text-stone-950 shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-stone-950 font-normal">
              Görerek ve Kontrol Ederek Teslim Alın
            </h3>
            <p>
              Atelier Silk olarak tüm siparişlerimizi özel şeffaf muhafaza ambalajında kargoluyoruz. Kargo görevlisi kapınıza geldiğinde paketi inceleyebilir, ürünün kumaşını ve kalitesini görerek teslim alabilirsiniz.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-xl text-stone-950 font-normal">Şeffaf Kargo Nasıl Çalışır?</h4>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <Check className="size-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Özel Şeffaf Paketleme:</strong> Ürününüz katlanıp toz ve sudan korunan şeffaf butik ambalajına yerleştirilir.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="size-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Kontrollü Teslimat:</strong> Kargo kuryesi eşliğinde paketi kontrol edebilirsiniz.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="size-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Kapıda Ödeme Seçeneği:</strong> Dilerseniz kapıda nakit veya kart ile ödeme yapabilirsiniz.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
