import { Truck, ShieldCheck, RefreshCw, MessageSquare } from "lucide-react";

const PERKS = [
  {
    icon: ShieldCheck,
    title: "Şeffaf Kargo Güvencesi",
    desc: "Paketinizi görerek güvenle teslim alın.",
  },
  {
    icon: Truck,
    title: "Aynı Gün Hızlı Teslimat",
    desc: "16:00'ya kadar verilen siparişlerde aynı gün kargo.",
  },
  {
    icon: RefreshCw,
    title: "14 Gün Değişim Garantisi",
    desc: "Beden uyumsuzluğunda hızlı ve kolay değişim.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Birebir Destek",
    desc: "Beden danışmanlığı ve hızlı sipariş hattı.",
  },
];

export default function TrustBadges() {
  return (
    <div className="border-y border-stone-200 bg-white py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PERKS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center sm:text-left space-y-1">
                <Icon className="size-5 text-stone-900 mx-auto sm:mx-0 stroke-[1.5]" />
                <h4 className="text-xs sm:text-sm font-medium text-stone-900 tracking-wide pt-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
