"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addProductAction } from "@/app/admin/actions";
import { ArrowLeft, Save, Sparkles } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await addProductAction(formData);
      router.push("/admin/urunler");
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-stone-200/80 pb-6">
        <Link
          href="/admin/urunler"
          className="p-2 text-stone-500 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
            YENİ PARÇA GİRİŞİ
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            Yeni Ürün Oluştur
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                Ürün Adı *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Örn: Kuşgözü Detaylı İpek Gömlek"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:ring-1 focus:ring-stone-950"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                URL Slug (Opsiyonel)
              </label>
              <input
                type="text"
                name="slug"
                placeholder="kusgozu-detayli-ipek-gomlek"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:ring-1 focus:ring-stone-950 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                Satış Fiyatı (TL) *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="1"
                placeholder="1650"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:ring-1 focus:ring-stone-950"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                İndirimsiz Fiyat (Opsiyonel)
              </label>
              <input
                type="number"
                name="originalPrice"
                min="0"
                step="1"
                placeholder="1950"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:ring-1 focus:ring-stone-950"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                Etiket / Rozet
              </label>
              <input
                type="text"
                name="badge"
                placeholder="YENİ, ÇOK SATAN, vb."
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:ring-1 focus:ring-stone-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 cursor-pointer bg-white"
              >
                <option value="Elbiseler">Elbiseler</option>
                <option value="Dış Giyim">Dış Giyim (Blazer & Trençkot)</option>
                <option value="Takımlar">Takımlar</option>
                <option value="Alt Giyim">Alt Giyim (Pantolon & Etek)</option>
                <option value="Üst Giyim">Üst Giyim (Gömlek & Bluz)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                Bedenler (Virgülle ayırın)
              </label>
              <input
                type="text"
                name="sizes"
                defaultValue="36, 38, 40"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 font-mono"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-stone-100">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-400 block">
              GÖRSEL URL'LERİ
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] text-stone-600 font-medium mb-1">
                  Ana Görsel (Kapak) *
                </label>
                <input
                  type="url"
                  name="image1"
                  required
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-600 font-medium mb-1">
                  2. Görsel (Hover)
                </label>
                <input
                  type="url"
                  name="image2"
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-600 font-medium mb-1">
                  3. Görsel (Detay)
                </label>
                <input
                  type="url"
                  name="image3"
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-stone-100">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                Ürün Açıklaması
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Tasarım ve kalıp detayları..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 font-light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                  Kumaş & Materyal
                </label>
                <input
                  type="text"
                  name="fabric"
                  placeholder="%100 Saf Keten Dokuma"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs text-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-2">
                  Manken Ölçüleri
                </label>
                <input
                  type="text"
                  name="modelInfo"
                  placeholder="Manken Ölçüleri: Boy 178 cm, Beden 36"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs text-stone-900 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              defaultChecked
              className="size-4 accent-stone-950 cursor-pointer"
            />
            <label htmlFor="inStock" className="text-xs font-medium text-stone-800 cursor-pointer select-none">
              Ürün hemen satışa açılsın (Stokta Var)
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/urunler"
            className="px-5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-700 hover:text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Vazgeç
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Save className="size-4" />
            <span>{isPending ? "Kaydediliyor..." : "Ürünü Kaydet"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
