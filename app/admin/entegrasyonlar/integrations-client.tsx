"use client";

import { useState, useTransition } from "react";
import { StoreSettings } from "@/lib/admin-store";
import { updateSettingsAction } from "@/app/admin/actions";
import { CreditCard, Truck, FileText, Save, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function IntegrationsClient({
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
            TÜRKİYE YEREL ENTEGRASYONLARI
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            Ödeme, Kargo ve E-Fatura Entegrasyonları
          </h2>
          <p className="text-xs text-stone-500 font-light mt-1">
            Shopify'ın ekstra komisyon veya aylık ücret kestiği tüm yerel araçları tek merkezden yönetin.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>Ayarlar kaydedildi!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
              <CreditCard className="size-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-950 font-medium">
                PayTR Sanal POS Entegrasyonu
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                256-bit SSL ve 3D Secure kredi kartı çekim anahtarları
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Merchant ID
              </label>
              <input
                type="text"
                name="paytrMerchantId"
                defaultValue={initialSettings.paytrMerchantId}
                placeholder="Örn: 384912"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none focus:border-stone-950"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Merchant Key
              </label>
              <input
                type="password"
                name="paytrMerchantKey"
                defaultValue={initialSettings.paytrMerchantKey}
                placeholder="••••••••••••••••"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none focus:border-stone-950"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Merchant Salt
              </label>
              <input
                type="password"
                name="paytrMerchantSalt"
                defaultValue={initialSettings.paytrMerchantSalt}
                placeholder="••••••••••••••••"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none focus:border-stone-950"
              />
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2.5">
            <input
              type="checkbox"
              id="paytrTestMode"
              name="paytrTestMode"
              defaultChecked={initialSettings.paytrTestMode}
              className="size-4 accent-stone-950 cursor-pointer"
            />
            <label htmlFor="paytrTestMode" className="text-xs text-stone-700 cursor-pointer select-none">
              PayTR Test Modu Açık (Gerçek kart çekimi yapılmaz)
            </label>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-950 font-medium">
                iyzico Sanal POS Entegrasyonu
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                Alternatif iyzico Checkout Form API bilgileri
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                API Key
              </label>
              <input
                type="text"
                name="iyzicoApiKey"
                defaultValue={initialSettings.iyzicoApiKey}
                placeholder="sandbox-..."
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none focus:border-stone-950"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Secret Key
              </label>
              <input
                type="password"
                name="iyzicoSecretKey"
                defaultValue={initialSettings.iyzicoSecretKey}
                placeholder="••••••••••••••••"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none focus:border-stone-950"
              />
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2.5">
            <input
              type="checkbox"
              id="iyzicoTestMode"
              name="iyzicoTestMode"
              defaultChecked={initialSettings.iyzicoTestMode}
              className="size-4 accent-stone-950 cursor-pointer"
            />
            <label htmlFor="iyzicoTestMode" className="text-xs text-stone-700 cursor-pointer select-none">
              iyzico Sandbox (Test Modu) Açık
            </label>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-900">
              <Truck className="size-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-950 font-medium">
                Kargo ve Teslimat Kuralları
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                Anlaşmalı kargo firması ve ücretsiz kargo barajı
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Anlaşmalı Kargo
              </label>
              <select
                name="shippingCompany"
                defaultValue={initialSettings.shippingCompany}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 outline-none cursor-pointer"
              >
                <option value="Yurtiçi Kargo">Yurtiçi Kargo</option>
                <option value="MNG Kargo">MNG Kargo</option>
                <option value="Aras Kargo">Aras Kargo</option>
                <option value="Sendeo">Sendeo</option>
                <option value="Hepsijet">Hepsijet</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Ücretsiz Kargo Eşiği (TL)
              </label>
              <input
                type="number"
                name="freeShippingThreshold"
                defaultValue={initialSettings.freeShippingThreshold}
                min="0"
                step="50"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Standart Kargo Ücreti (TL)
              </label>
              <input
                type="number"
                name="flatShippingFee"
                defaultValue={initialSettings.flatShippingFee}
                min="0"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-900">
              <FileText className="size-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-950 font-medium">
                E-Fatura & E-Arşiv (Paraşüt / BizimHesap)
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                Sipariş tamamlandığında otomatik e-arşiv fatura tetikleme
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Client ID
              </label>
              <input
                type="text"
                name="parasutClientId"
                defaultValue={initialSettings.parasutClientId}
                placeholder="Paraşüt / BizimHesap Client ID"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                Client Secret
              </label>
              <input
                type="password"
                name="parasutClientSecret"
                defaultValue={initialSettings.parasutClientSecret}
                placeholder="••••••••••••••••"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 outline-none"
              />
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2.5">
            <input
              type="checkbox"
              id="parasutAutoInvoice"
              name="parasutAutoInvoice"
              defaultChecked={initialSettings.parasutAutoInvoice}
              className="size-4 accent-stone-950 cursor-pointer"
            />
            <label htmlFor="parasutAutoInvoice" className="text-xs text-stone-700 cursor-pointer select-none">
              Sipariş onaylandığında müşteriye otomatik E-Arşiv fatura oluştur ve SMS ile ilet
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Save className="size-4" />
            <span>{isPending ? "Kaydediliyor..." : "Entegrasyonları Kaydet"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
