"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { updateProductStockAction, deleteProductAction } from "@/app/admin/actions";
import { Trash2, Plus, ExternalLink, CheckCircle2, XCircle, Edit3 } from "lucide-react";

export default function AdminProductList({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggleStock = (id: string, currentStock: boolean) => {
    startTransition(async () => {
      await updateProductStockAction(id, !currentStock);
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`"${name}" ürününü silmek istediğinize emin misiniz?`)) {
      startTransition(async () => {
        await deleteProductAction(id);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
            KATALOG YÖNETİMİ
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            Ürünler ({initialProducts.length})
          </h2>
        </div>

        <Link
          href="/admin/urunler/yeni"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-950 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors shadow-xs"
        >
          <Plus className="size-4" />
          <span>Yeni Ürün Ekle</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#faf9f6] border-b border-stone-200/80 text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                <th className="py-3.5 px-4">Ürün</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Fiyat</th>
                <th className="py-3.5 px-4">Bedenler</th>
                <th className="py-3.5 px-4">Stok Durumu</th>
                <th className="py-3.5 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-light text-stone-800">
              {initialProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-stone-50/70 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="size-12 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                      />
                      <div className="min-w-0">
                        <span className="font-medium text-stone-950 block truncate max-w-[200px] sm:max-w-[260px]">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono block">
                          /{product.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-medium text-[11px]">
                      {product.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-950">
                      {product.price.toLocaleString("tr-TR")} TL
                    </div>
                    {product.originalPrice && (
                      <span className="text-[10px] text-stone-400 line-through">
                        {product.originalPrice.toLocaleString("tr-TR")} TL
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 flex-wrap max-w-[140px]">
                      {product.sizes.map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 rounded bg-[#faf9f6] border border-stone-200 text-[10px] font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleToggleStock(product.id, product.inStock)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-colors ${
                        product.inStock
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                      }`}
                    >
                      {product.inStock ? (
                        <>
                          <CheckCircle2 className="size-3" />
                          <span>Stokta</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="size-3" />
                          <span>Tükendi</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/urunler/${product.id}`}
                        className="p-1.5 text-stone-400 hover:text-amber-600 transition-colors"
                        title="Ürünü Düzenle"
                      >
                        <Edit3 className="size-4" />
                      </Link>

                      <Link
                        href={`/urun/${product.slug}`}
                        target="_blank"
                        className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
                        title="Mağazada Gör"
                      >
                        <ExternalLink className="size-4" />
                      </Link>

                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Ürünü Sil"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
