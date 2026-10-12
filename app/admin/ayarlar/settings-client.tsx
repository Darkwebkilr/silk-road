"use client";

import { useState, useTransition } from "react";
import { StoreSettings } from "@/lib/admin-store";
import { updateSettingsAction } from "@/app/admin/actions";
import { Store, Bell, CreditCard, Save, CheckCircle2 } from "lucide-react";

export default function SettingsClient({
  initialSettings,
}: {
  initialSettings: StoreSettings;
}) {
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await updateSettingsAction(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
            GENEL MAĞAZA AYARLARI
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            Mağaza Yapılandırması & Vitrin
          </h2>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>Ayarlar güncellendi!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-900">
              <Store className="size-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-950 font-medium">
                Genel Bilgiler
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                Mağaza ismi ve müşteri destek hattı
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Mağaza Adı (Brand Name)
              </label>
              <input
                type="text"
                name="storeName"
                defaultValue={initialSettings.storeName}
                required
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 outline-none focus:border-stone-950"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Resmi WhatsApp Destek Hattı
              </label>
              <input
                type="text"
                name="supportPhone"
                defaultValue={initialSettings.supportPhone}
                required
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none focus:border-stone-950"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
              <Bell className="size-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-950 font-medium">
                Duyuru Çubuğu (Announcement Bar)
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                Sitenin en üstünde yer alan dinamik kampanya ve bilgilendirme şeridi
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="announcementActive"
                name="announcementActive"
                defaultChecked={initialSettings.announcementActive}
                className="size-4 accent-stone-950 cursor-pointer"
              />
              <label htmlFor="announcementActive" className="text-xs text-stone-800 font-medium cursor-pointer select-none">
                Duyuru Çubuğu Sitede Aktif Olsun
              </label>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Duyuru Metni
              </label>
              <input
                type="text"
                name="announcementText"
                defaultValue={initialSettings.announcementText}
                placeholder="Örn: 1.500 TL Üzeri Ücretsiz VIP Kargo & Kapıda Şeffaf Kontrol"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 outline-none focus:border-stone-950"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900">
              <CreditCard className="size-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-950 font-medium">
                Aktif Ödeme Seçenekleri
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                Ödeme sayfasında müşteriye sunulan yöntemleri açıp kapatın
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-[#faf9f6]">
              <div>
                <span className="font-semibold text-stone-900 block">Kredi / Banka Kartı</span>
                <span className="text-[11px] text-stone-500 font-light">PayTR veya iyzico üzerinden güvenli kart çekimi</span>
              </div>
              <input
                type="checkbox"
                name="paymentCardActive"
                defaultChecked={initialSettings.paymentCardActive}
                className="size-4 accent-stone-950 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-[#faf9f6]">
              <div>
                <span className="font-semibold text-stone-900 block">Kapıda Ödeme (Şeffaf Kargo)</span>
                <span className="text-[11px] text-stone-500 font-light">Müşteri teslim alırken kargo görevlisine nakit veya kartla öder</span>
              </div>
              <input
                type="checkbox"
                name="paymentCodActive"
                defaultChecked={initialSettings.paymentCodActive}
                className="size-4 accent-stone-950 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-[#faf9f6]">
              <div>
                <span className="font-semibold text-stone-900 block">Havale / EFT</span>
                <span className="text-[11px] text-stone-500 font-light">Banka hesap numarasına doğrudan transfer</span>
              </div>
              <input
                type="checkbox"
                name="paymentTransferActive"
                defaultChecked={initialSettings.paymentTransferActive}
                className="size-4 accent-stone-950 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Save className="size-4" />
            <span>{isPending ? "Kaydediliyor..." : "Ayarları Kaydet"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
