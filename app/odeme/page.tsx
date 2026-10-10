"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, ChevronRight, Lock, CreditCard, Sparkles, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { subtotal, remainingForFreeShipping, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "İstanbul",
    address: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const shippingFee = remainingForFreeShipping === 0 ? 0 : 59;
  const totalAmount = subtotal > 0 ? subtotal + shippingFee : 2450;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-stone-500 tracking-wider uppercase mb-6">
          <Link href="/" className="hover:text-stone-900">
            Ana Sayfa
          </Link>
          <ChevronRight className="size-3 text-stone-400" />
          <Link href="/sepet" className="hover:text-stone-900">
            Çanta
          </Link>
          <ChevronRight className="size-3 text-stone-400" />
          <span className="text-stone-900 font-semibold">Ödeme & Teslimat</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block">
                ATELIER SILK GÜVENLİ ÖDEME
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-stone-950 font-normal mt-1">
                Teslimat & Ödeme Bilgileri
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] tracking-wider uppercase font-medium text-stone-700 mb-1">
                  Ad Soyad
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Adınız ve Soyadınız"
                  className="w-full p-3 border border-stone-300 focus:border-stone-950 outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider uppercase font-medium text-stone-700 mb-1">
                    Telefon (Kargo Takibi İçin)
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full p-3 border border-stone-300 focus:border-stone-950 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase font-medium text-stone-700 mb-1">
                    Şehir
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 border border-stone-300 focus:border-stone-950 outline-none text-xs bg-white"
                  >
                    <option value="İstanbul">İstanbul (Aynı Gün Hızlı Kargo)</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                    <option value="Antalya">Antalya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-wider uppercase font-medium text-stone-700 mb-1">
                  Açık Teslimat Adresi
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Mahalle, Cadde, Sokak, Kapı No, İlçe..."
                  className="w-full p-3 border border-stone-300 focus:border-stone-950 outline-none text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <label className="block text-[11px] tracking-wider uppercase font-medium text-stone-700 mb-2">
                  Ödeme Yöntemi
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <label className={`p-3.5 border cursor-pointer flex items-center gap-2.5 ${formData.paymentMethod === "card" ? "border-stone-950 bg-[#faf9f6]" : "border-stone-200"}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                    />
                    <span className="font-medium text-stone-900">Kredi / Banka Kartı</span>
                  </label>
                  <label className={`p-3.5 border cursor-pointer flex items-center gap-2.5 ${formData.paymentMethod === "cod" ? "border-stone-950 bg-[#faf9f6]" : "border-stone-200"}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                    />
                    <span className="font-medium text-stone-900">Kapıda Ödeme (Şeffaf Kargo)</span>
                  </label>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="p-4 bg-[#faf9f6] border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[10px] tracking-wider uppercase text-stone-500 font-medium">
                        KART BİLGİLERİ (256-BIT SSL GÜVENLİ)
                      </span>
                      <CreditCard className="size-4 text-stone-500" />
                    </div>

                    <div>
                      <input
                        required
                        type="text"
                        placeholder="Kart Üzerindeki İsim Soyisim"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 focus:border-stone-950 outline-none text-xs"
                      />
                    </div>

                    <div>
                      <input
                        required
                        type="text"
                        maxLength={19}
                        placeholder="Kart Numarası (XXXX XXXX XXXX XXXX)"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 focus:border-stone-950 outline-none text-xs font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        required
                        type="text"
                        maxLength={5}
                        placeholder="AA/YY"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 focus:border-stone-950 outline-none text-xs font-mono"
                      />
                      <input
                        required
                        type="password"
                        maxLength={3}
                        placeholder="CVV / CVC"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 focus:border-stone-950 outline-none text-xs font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-4 bg-stone-950 hover:bg-stone-800 text-white text-xs tracking-[0.25em] uppercase font-semibold text-center transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="size-3.5" />
                <span>SİPARİŞİ TAMAMLA ({totalAmount.toLocaleString("tr-TR")} TL)</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 border border-stone-200 space-y-3 text-xs text-stone-600 font-light">
              <div className="flex items-center gap-2 text-stone-900 font-medium pb-2 border-b border-stone-200">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>Şeffaf Kargo & Güven</span>
              </div>
              <p>Siparişinizi kapıda teslim alırken kargo görevlisinin yanında paketi açıp inceleyebilirsiniz.</p>
              <p className="text-[11px] text-stone-500 pt-1">Memnun kalmadığınız takdirde 14 gün koşulsuz değişim garantisi geçerlidir.</p>
            </div>

            <div className="bg-white p-6 border border-stone-200 text-center space-y-2">
              <span className="text-[10px] tracking-wider uppercase text-stone-400 block">
                HIZLI DESTEK
              </span>
              <p className="text-xs text-stone-700">Siparişinizle ilgili soru sormak için:</p>
              <a
                href="https://wa.me/905519283598"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 pt-1 hover:underline"
              >
                <WhatsAppIcon className="size-3.5" />
                <span>0551 928 35 98 WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full p-6 sm:p-8 border border-stone-200 shadow-2xl relative animate-in zoom-in-95 duration-200 text-center space-y-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-950 transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="size-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <Check className="size-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[11px] tracking-widest uppercase text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <Sparkles className="size-3" />
                SİPARİŞ ONAYLANDI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-950 font-normal pt-1">
                Tebrikler, siparişiniz alındı!
              </h2>
            </div>

            <div className="p-4 bg-[#faf9f6] border border-stone-200 space-y-1.5 text-xs">
              <p className="text-stone-500 font-light">Kargo Takip Numaranız:</p>
              <p className="text-base font-mono font-bold text-stone-950 tracking-wider">
                Takip No: #1042
              </p>
              <p className="text-[11px] text-stone-500 font-light pt-1">
                Kargo durumunuz ve faturanız kayıtlı numaranıza SMS & WhatsApp ile iletilecektir.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                onClick={() => setShowModal(false)}
                className="block w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs tracking-[0.2em] uppercase font-semibold transition-colors"
              >
                ALIŞVERİŞE DEVAM ET
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
