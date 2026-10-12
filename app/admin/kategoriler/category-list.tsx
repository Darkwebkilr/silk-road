"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AdminCategory } from "@/lib/admin-store";
import { addCategoryAction, deleteCategoryAction } from "@/app/admin/actions";
import { Layers, ArrowRight, Plus, Trash2, X } from "lucide-react";

export default function CategoryListClient({
  initialCategories,
}: {
  initialCategories: AdminCategory[];
}) {
  const [isPending, startTransition] = useTransition();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await addCategoryAction(formData);
      setShowAddModal(false);
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`"${name}" kategorisini silmek istediğinize emin misiniz?`)) {
      startTransition(async () => {
        await deleteCategoryAction(id);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
            KOLEKSİYON DÜZENİ
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            Kategoriler ({initialCategories.length})
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-950 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Yeni Kategori Ekle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {initialCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-stone-400 mb-2">
                <span className="font-mono text-[11px] text-stone-400">
                  /{cat.slug}
                </span>
                <span className="size-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
                  <Layers className="size-4" />
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-950">
                {cat.name}
              </h3>
              <p className="text-xs text-stone-500 font-light mt-1">
                {cat.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-600 font-medium">
                {cat.itemCount} Ürün
              </span>

              <div className="flex items-center gap-3">
                <Link
                  href={`/kategori/${cat.slug}`}
                  target="_blank"
                  className="text-stone-900 font-semibold hover:text-stone-600 inline-flex items-center gap-1"
                >
                  <span>Mağazada Gör</span>
                  <ArrowRight className="size-3.5" />
                </Link>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Kategoriyi Sil"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xl relative animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-xl font-normal text-stone-950">
                Yeni Kategori Oluştur
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-950 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                  Kategori Adı *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Örn: Aksesuarlar"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                  URL Slug (Opsiyonel)
                </label>
                <input
                  type="text"
                  name="slug"
                  placeholder="aksesuarlar"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1.5">
                  Kısa Açıklama
                </label>
                <textarea
                  name="description"
                  rows={2}
                  placeholder="Koleksiyon açıklaması..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs text-stone-900 outline-none focus:border-stone-950"
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
                  {isPending ? "Ekleniyor..." : "Kategori Ekle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
