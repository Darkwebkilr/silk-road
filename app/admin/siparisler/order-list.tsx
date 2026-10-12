"use client";

import { useState, useTransition } from "react";
import { Order } from "@/lib/admin-store";
import { updateOrderStatusAction } from "@/app/admin/actions";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Save,
  Printer,
  ChevronDown,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

export default function OrderListClient({
  initialOrders,
}: {
  initialOrders: Order[];
}) {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingTracking, setEditingTracking] = useState<{ [orderId: string]: string }>({});
  const [savedTrackingMsg, setSavedTrackingMsg] = useState<string | null>(null);

  const handleStatusChange = (orderId: string, status: Order["status"], trackingNumber?: string) => {
    startTransition(async () => {
      await updateOrderStatusAction(orderId, status, trackingNumber);
    });
  };

  const handleSaveTracking = (order: Order) => {
    const tracking = editingTracking[order.id] !== undefined ? editingTracking[order.id] : (order.trackingNumber || "");
    startTransition(async () => {
      await updateOrderStatusAction(order.id, order.status, tracking);
      setSavedTrackingMsg(order.id);
      setTimeout(() => setSavedTrackingMsg(null), 2500);
    });
  };

  const handlePrintSlip = (order: Order) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Sipariş Fişi - ${order.orderNumber}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #1c1917; }
            .header { border-bottom: 2px solid #1c1917; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; }
            .brand { font-size: 20px; font-weight: bold; letter-spacing: 2px; }
            .order-no { font-family: monospace; font-size: 16px; font-weight: bold; }
            .section { margin-bottom: 16px; }
            .label { font-size: 11px; text-transform: uppercase; color: #78716c; font-weight: bold; }
            .val { font-size: 14px; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
            th { text-align: left; border-bottom: 1px solid #d6d3d1; padding: 8px 4px; font-size: 11px; text-transform: uppercase; }
            td { padding: 8px 4px; border-bottom: 1px solid #f5f5f4; }
            .total { text-align: right; font-size: 16px; font-weight: bold; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">ATELIER SILK</div>
              <div style="font-size: 12px; color: #78716c;">Müşteri Sipariş & Kargo Teslimat Fişi</div>
            </div>
            <div style="text-align: right;">
              <div class="order-no">${order.orderNumber}</div>
              <div style="font-size: 11px; color: #78716c;">${new Date(order.createdAt).toLocaleDateString("tr-TR")}</div>
            </div>
          </div>
          <div class="section">
            <div class="label">Alıcı Müşteri</div>
            <div class="val"><strong>${order.customerName}</strong> (${order.phone})</div>
            <div class="val">${order.address} - ${order.city}</div>
          </div>
          <div class="section">
            <div class="label">Ödeme Yöntemi</div>
            <div class="val">${order.paymentMethod === "kapida_kart" ? "Kapıda Kredi Kartı" : order.paymentMethod === "kapida_nakit" ? "Kapıda Nakit" : "Havale / EFT"}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Beden</th>
                <th>Adet</th>
                <th style="text-align: right;">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.size}</td>
                  <td>${item.quantity}</td>
                  <td style="text-align: right;">${(item.price * item.quantity).toLocaleString("tr-TR")} TL</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="total">
            Genel Toplam: ${order.totalAmount.toLocaleString("tr-TR")} TL
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const filteredOrders = initialOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
            SİPARİŞ VE MÜŞTERİ TAKİBİ
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            Gelen Siparişler ({initialOrders.length})
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Sipariş no, müşteri veya tel ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3.5 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 outline-none focus:border-stone-950 w-full sm:w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-stone-400" />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="size-3.5 text-stone-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 outline-none focus:border-stone-950 cursor-pointer"
            >
              <option value="all">Tüm Durumlar ({initialOrders.length})</option>
              <option value="yeni">Yeni Sipariş</option>
              <option value="hazirlaniyor">Hazırlanıyor</option>
              <option value="kargoda">Kargoya Verildi</option>
              <option value="teslim_edildi">Teslim Edildi</option>
              <option value="iptal">İptal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-stone-200 text-stone-500 text-xs">
            Aradığınız kriterlere uygun sipariş bulunamadı.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const cleanPhone = order.phone.replace(/[^0-9]/g, "");
            const currentTracking = editingTracking[order.id] !== undefined ? editingTracking[order.id] : (order.trackingNumber || "");

            let waMsg = `Merhaba ${order.customerName}, Atelier Silk üzerinden verdiğiniz ${order.orderNumber} numaralı siparişiniz hakkında bilgilendirmek istedik.`;
            if (order.status === "kargoda" && currentTracking) {
              waMsg = `Merhaba ${order.customerName}, Atelier Silk'ten verdiğiniz ${order.orderNumber} numaralı siparişiniz kargoya verilmiştir. Kargo Takip Numaranız: ${currentTracking}.`;
            }

            const waUrl = `https://wa.me/9${cleanPhone}?text=${encodeURIComponent(waMsg)}`;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4 hover:border-stone-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-base font-bold text-stone-950">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-stone-400">
                      {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handlePrintSlip(order)}
                      className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950 text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Sipariş Fişi Yazdır"
                    >
                      <Printer className="size-3.5" />
                      <span className="text-[11px] font-medium hidden sm:inline">Fiş Yazdır</span>
                    </button>

                    <span className="text-[11px] font-semibold text-stone-500 uppercase mr-1">
                      Durum:
                    </span>
                    <select
                      value={order.status}
                      disabled={isPending}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as Order["status"],
                          currentTracking
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold uppercase tracking-wider bg-[#faf9f6] text-stone-900 cursor-pointer outline-none focus:border-stone-950"
                    >
                      <option value="yeni">Yeni Sipariş</option>
                      <option value="hazirlaniyor">Hazırlanıyor</option>
                      <option value="kargoda">Kargoya Verildi</option>
                      <option value="teslim_edildi">Teslim Edildi</option>
                      <option value="iptal">İptal Edildi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                      MÜŞTERİ BİLGİLERİ
                    </span>
                    <p className="font-medium text-stone-900 text-sm">{order.customerName}</p>
                    <p className="text-stone-600 mt-0.5">{order.phone}</p>
                    <p className="text-stone-500 mt-0.5">{order.email}</p>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[11px] transition-colors"
                    >
                      <WhatsAppIcon className="size-3.5 text-emerald-600" />
                      <span>WhatsApp ile Bildir</span>
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                      TESLİMAT & KARGO
                    </span>
                    <p className="font-medium text-stone-900">{order.city}</p>
                    <p className="text-stone-600 mt-1 leading-relaxed font-light">
                      {order.address}
                    </p>

                    <div className="mt-3 pt-2 border-t border-stone-100">
                      <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
                        Kargo Takip Kodu
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Örn: YK-948192"
                          value={currentTracking}
                          onChange={(e) =>
                            setEditingTracking({
                              ...editingTracking,
                              [order.id]: e.target.value,
                            })
                          }
                          className="px-2.5 py-1.5 rounded border border-stone-300 text-xs font-mono w-full outline-none focus:border-stone-950 bg-stone-50/50"
                        />
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleSaveTracking(order)}
                          className="px-3 py-1.5 rounded bg-stone-950 hover:bg-stone-800 text-white text-[11px] font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                        >
                          <Save className="size-3.5" />
                        </button>
                      </div>
                      {savedTrackingMsg === order.id && (
                        <p className="text-[10px] text-emerald-600 mt-1 font-medium animate-in fade-in">
                          Kargo kodu kaydedildi!
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-2">
                      SİPARİŞ İÇERİĞİ ({order.items.length} Parça)
                    </span>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 rounded-lg bg-[#faf9f6] border border-stone-100"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-9 rounded object-cover bg-stone-200 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-stone-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-stone-500">
                              Beden: <strong>{item.size}</strong> • {item.quantity} Adet
                            </p>
                          </div>
                          <span className="font-semibold text-stone-950 shrink-0">
                            {(item.price * item.quantity).toLocaleString("tr-TR")} TL
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-600">Toplam Tutar:</span>
                      <span className="font-serif text-base font-bold text-stone-950">
                        {order.totalAmount.toLocaleString("tr-TR")} TL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
