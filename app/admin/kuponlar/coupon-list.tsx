"use client";

import { useState, useTransition } from "react";
import { CouponItem } from "@/lib/admin-store";
import { addCouponAction, toggleCouponAction, deleteCouponAction } from "@/app/admin/actions";
import { Plus, Tag, Trash2, CheckCircle2, XCircle, X } from "lucide-react";

export default function CouponListClient({
  initialCoupons,
}: {
  initialCoupons: CouponItem[];
}) {
  const [isPending, startTransition] = useTransition();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await addCouponAction(formData);
      setShowAddModal(false);
    });
  };

  const handleToggle = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleCouponAction(id, currentStatus);
    });
  };

  const handleDelete = (id: string, code: string) => {
    if (confirm(`"${code}" kuponunu silmek istediğinize emin misiniz?`)) {
      startTransition(async () => {
        await deleteCouponAction(id);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
            KAMPANYA & PROMOSYON MOTORU
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            İndirim Kuponları ({initialCoupons.length})
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-950 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Yeni Kupon Oluştur</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#faf9f6] border-b border-stone-200/80 text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                <th className="py-3.5 px-4">Kupon Kodu</th>
                <th className="py-3.5 px-4">İndirim Oranı</th>
                <th className="py-3.5 px-4">Min. Sepet Tutarı</th>
                <th className="py-3.5 px-4">Kullanım Adedi</th>
                <th className="py-3.5 px-4">Durum</th>
                <th className="py-3.5 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-light text-stone-800">
              {initialCoupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-500">
                    Henüz tanımlanmış kupon bulunmuyor.
                  </td>
                </tr>
              ) : (
                initialCoupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <Tag className="size-3.5 text-stone-400" />
                        <span className="font-mono font-bold text-stone-950 text-sm">
                          {coupon.code}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 font-semibold text-[11px]">
                        %{coupon.discountPercent} İndirim
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      {coupon.minOrderAmount > 0
                        ? `${coupon.minOrderAmount.toLocaleString("tr-TR")} TL`
                        : "Limitsiz"}
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      {coupon.usedCount} Kez
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleToggle(coupon.id, coupon.isActive)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-colors ${
                          coupon.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                        }`}
                      >
                        {coupon.isActive ? (
                          <>
                            <CheckCircle2 className="size-3" />
                            <span>Aktif</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="size-3" />
                            <span>Pasif</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleDelete(coupon.id, coupon.code)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Kuponu Sil"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xl relative animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-xl font-normal text-stone-950">
                Yeni İndirim Kuponu Oluştur
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-950 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                  Kupon Kodu *
                </label>
                <input
                  type="text"
                  name="code"
                  required
                  placeholder="Örn: YAZ15, SILK20"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                  İndirim Oranı (%) *
                </label>
                <input
                  type="number"
                  name="discountPercent"
                  required
                  min="1"
                  max="100"
                  defaultValue="15"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                  Minimum Sepet Tutarı (TL)
                </label>
                <input
                  type="number"
                  name="minOrderAmount"
                  defaultValue="0"
                  min="0"
                  step="50"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2.5 rounded-lg bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isPending ? "Ekleniyor..." : "Kuponu Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
