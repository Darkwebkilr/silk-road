import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getAdminStats,
  getAdminOrders,
  getAdminProducts,
} from "@/lib/admin-store";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertCircle,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const instant = false;

export default async function AdminDashboardPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const stats = await getAdminStats();
  const orders = await getAdminOrders();
  const products = await getAdminProducts();

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter((p) => !p.inStock);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
            GENEL BAKIŞ & İSTATİSTİKLER
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            Yönetim Özeti
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/urunler/yeni"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-950 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors shadow-xs"
          >
            <Plus className="size-4" />
            <span>Yeni Ürün Ekle</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Toplam Ciro</span>
            <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-950">
              {stats.totalRevenue.toLocaleString("tr-TR")} TL
            </div>
            <p className="text-[11px] text-stone-500 font-light mt-1">
              Tamamlanan ve kargodaki siparişler
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Bekleyen Sipariş</span>
            <div className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-950">
              {stats.pendingOrders} Adet
            </div>
            <p className="text-[11px] text-amber-700 font-light mt-1">
              Hazırlanması gereken siparişler
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Aktif Ürünler</span>
            <div className="size-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
              <ShoppingBag className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-950">
              {stats.inStockCount} / {stats.totalProducts}
            </div>
            <p className="text-[11px] text-stone-500 font-light mt-1">
              Satışa açık olan parçalar
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Tükendi Uyarısı</span>
            <div className="size-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-950">
              {stats.outOfStockCount} Ürün
            </div>
            <p className="text-[11px] text-rose-700 font-light mt-1">
              Stok tükenen ürünler
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200/80 shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-serif text-lg text-stone-950 font-normal">
                Son Gelen Siparişler
              </h3>
              <p className="text-xs text-stone-500 font-light">
                Anlık müşteri sipariş akışı
              </p>
            </div>
            <Link
              href="/admin/siparisler"
              className="text-xs font-semibold text-stone-900 hover:text-stone-600 flex items-center gap-1"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-stone-400">•</span>
                    <span className="font-medium text-stone-800">
                      {order.customerName}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {order.city} • {order.items.length} ürün
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-semibold text-stone-950">
                    {order.totalAmount.toLocaleString("tr-TR")} TL
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
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
                      ? "YENİ"
                      : order.status === "hazirlaniyor"
                      ? "HAZIRLANIYOR"
                      : order.status === "kargoda"
                      ? "KARGODA"
                      : order.status === "teslim_edildi"
                      ? "TESLİM EDİLDİ"
                      : "İPTAL"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs p-6 space-y-5">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="font-serif text-lg text-stone-950 font-normal">
              Katalog Özeti
            </h3>
            <p className="text-xs text-stone-500 font-light">
              Vitrin ve stok durumu
            </p>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-[#faf9f6] border border-stone-100"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="size-10 rounded-md object-cover bg-stone-200"
                />
                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-medium text-stone-900 truncate">
                    {prod.name}
                  </h5>
                  <p className="text-[11px] font-semibold text-stone-700">
                    {prod.price.toLocaleString("tr-TR")} TL
                  </p>
                </div>
                <span
                  className={`size-2 rounded-full ${
                    prod.inStock ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                  title={prod.inStock ? "Stokta" : "Tükendi"}
                />
              </div>
            ))}
          </div>

          <Link
            href="/admin/urunler"
            className="block text-center py-2.5 px-4 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-semibold uppercase tracking-wider text-stone-800 transition-colors"
          >
            Tüm Ürünleri Yönet
          </Link>
        </div>
      </div>
    </div>
  );
}
