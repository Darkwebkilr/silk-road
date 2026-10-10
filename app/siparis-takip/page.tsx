"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, Package, Truck, CheckCircle2 } from "lucide-react";

export default function OrderTrackingPage() {
  const [orderNo, setOrderNo] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNo.trim()) setSearched(true);
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
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
              placeholder="Örn: #AS-2026-849 veya Telefon No"
              className="w-full p-3 text-xs outline-none uppercase font-mono"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-stone-950 text-white text-xs tracking-widest uppercase font-semibold shrink-0 hover:bg-stone-800 transition-colors"
            >
              Sorgula
            </button>
          </form>
        </div>
      </div>

      {searched && (
        <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in duration-300">
          <div className="border border-stone-200 p-6 sm:p-8 bg-[#faf9f6] space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-stone-400 block">SİPARİŞ NO</span>
                <span className="font-mono text-sm font-bold text-stone-900">{orderNo || "#AS-2026-849"}</span>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                Kargoya Verildi
              </span>
            </div>

            {/* İlerleme Aşamaları */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Sipariş Hazırlandı</p>
                  <p className="text-stone-500 text-[11px]">Kalite kontrol yapıldı ve şeffaf pakete yerleştirildi.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="size-5 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Yurtiçi Kargo Transfer Merkezinde</p>
                  <p className="text-stone-500 text-[11px]">Kargo Takip No: 948194819284 • Tahmini Teslimat: Yarın 14:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-40">
                <Package className="size-5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Teslim Edildi</p>
                  <p className="text-stone-500 text-[11px]">Alıcıya kontrollü teslim edilecek.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
