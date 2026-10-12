"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Search, ChevronRight, Package, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { trackOrderAction } from "@/app/admin/actions";

interface TrackedOrder {
  orderNumber: string;
  customerName: string;
  status: "yeni" | "hazirlaniyor" | "kargoda" | "teslim_edildi" | "iptal";
  trackingNumber?: string;
  createdAt: string;
  totalAmount: number;
  itemsCount: number;
}

export default function OrderTrackingPage() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setErrorMsg(null);
    setOrder(null);

    startTransition(async () => {
      const res = await trackOrderAction(query);
      if (res.success && res.order) {
        setOrder(res.order as TrackedOrder);
      } else {
        setErrorMsg(res.error || "Sipariş bulunamadı.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#faf9f6] border-b border-stone-200 py-12 sm:py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase mb-3">
            <Link href="/" className="hover:text-stone-900">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">Sipariş Takibi</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
            Siparişinizi Sorgulayın
          </h1>
          <p className="text-xs text-stone-600 mt-2 font-light">
            Sipariş onay SMS veya e-postanızda yer alan sipariş numaranızı girerek kargo durumunuzu anlık takip edebilirsiniz.
          </p>

          <form onSubmit={handleTrack} className="mt-8 flex max-w-md mx-auto border border-stone-400 bg-white">
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Örn: #AS-2026-1042 veya 0532..."
              className="w-full p-3 text-xs outline-none uppercase font-mono"
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 bg-stone-950 text-white text-xs tracking-widest uppercase font-semibold shrink-0 hover:bg-stone-800 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "Aranıyor..." : "Sorgula"}
            </button>
          </form>
        </div>
      </div>

      {errorMsg && (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="size-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {order && (
        <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in duration-300">
          <div className="border border-stone-200 p-6 sm:p-8 bg-[#faf9f6] space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-stone-400 block">SİPARİŞ NO</span>
                <span className="font-mono text-sm font-bold text-stone-900">{order.orderNumber}</span>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
                  order.status === "yeni"
                    ? "bg-amber-100 text-amber-800"
                    : order.status === "hazirlaniyor"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "kargoda"
                    ? "bg-purple-100 text-purple-800"
                    : order.status === "teslim_edildi"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-stone-100 text-stone-600"
                }`}
              >
                {order.status === "yeni"
                  ? "Yeni Sipariş"
                  : order.status === "hazirlaniyor"
                  ? "Hazırlanıyor"
                  : order.status === "kargoda"
                  ? "Kargoya Verildi"
                  : order.status === "teslim_edildi"
                  ? "Teslim Edildi"
                  : "İptal Edildi"}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className={`size-5 shrink-0 mt-0.5 ${
                    order.status !== "iptal" ? "text-emerald-700" : "text-stone-300"
                  }`}
                />
                <div>
                  <p className="font-semibold text-stone-900">Sipariş Alındı</p>
                  <p className="text-stone-500 text-[11px]">
                    {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })} • {order.itemsCount} ürün • {order.totalAmount.toLocaleString("tr-TR")} TL
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock
                  className={`size-5 shrink-0 mt-0.5 ${
                    order.status === "hazirlaniyor" || order.status === "kargoda" || order.status === "teslim_edildi"
                      ? "text-emerald-700"
                      : "text-stone-300"
                  }`}
                />
                <div>
                  <p className="font-semibold text-stone-900">Hazırlık & Kalite Kontrol</p>
                  <p className="text-stone-500 text-[11px]">
                    {order.status === "hazirlaniyor"
                      ? "Atölyemizde özenle paketleniyor ve kalite kontrolü yapılıyor."
                      : order.status === "yeni"
                      ? "Sıraya alındı, en kısa sürede hazırlanacak."
                      : "Hazırlandı ve şeffaf kargo ambalajına yerleştirildi."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck
                  className={`size-5 shrink-0 mt-0.5 ${
                    order.status === "kargoda" || order.status === "teslim_edildi"
                      ? "text-emerald-700"
                      : "text-stone-300"
                  }`}
                />
                <div>
                  <p className="font-semibold text-stone-900">Kargo Transferi</p>
                  <p className="text-stone-500 text-[11px]">
                    {order.trackingNumber
                      ? `Kargo Takip Kodu: ${order.trackingNumber}`
                      : order.status === "kargoda"
                      ? "Kargo şubesine teslim edildi, takip kodu SMS ile paylaşılacaktır."
                      : "Henüz kargoya teslim edilmedi."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package
                  className={`size-5 shrink-0 mt-0.5 ${
                    order.status === "teslim_edildi" ? "text-emerald-700" : "text-stone-300"
                  }`}
                />
                <div>
                  <p className="font-semibold text-stone-900">Teslimat</p>
                  <p className="text-stone-500 text-[11px]">
                    {order.status === "teslim_edildi"
                      ? "Alıcıya şeffaf kargo kontrolleriyle teslim edildi."
                      : "Alıcı adresine ulaştırılmak üzere taşınmaktadır."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
