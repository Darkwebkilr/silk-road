"use client";

import { useState } from "react";
import { CustomerSummary, Order } from "@/lib/admin-store";
import { Search, Users, ExternalLink, Calendar, MapPin, ChevronDown, ChevronUp, Package, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

export default function CustomerListClient({
  initialCustomers,
}: {
  initialCustomers: CustomerSummary[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null);

  const filtered = initialCustomers.filter((c) =>
    c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
            MÜŞTERİ VERİTABANI & CRM
          </span>
          <h2 className="font-serif text-3xl text-stone-950 font-normal mt-1">
            Müşteriler ({initialCustomers.length})
          </h2>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Müşteri adı, telefon veya şehir ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3.5 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 outline-none focus:border-stone-950 w-full sm:w-64"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-stone-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-xl border border-stone-200 text-stone-500 text-xs">
            Arama kriterine uygun müşteri bulunamadı.
          </div>
        ) : (
          filtered.map((customer) => {
            const cleanPhone = customer.phone.replace(/[^0-9]/g, "");
            const waUrl = `https://wa.me/9${cleanPhone}?text=${encodeURIComponent(
              `Merhaba ${customer.customerName}, Atelier Silk mağazamızdan size özel bir ayrıcalık sunmak istedik.`
            )}`;

            return (
              <div
                key={customer.phone}
                className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs space-y-4 hover:border-stone-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="size-8 rounded-full bg-stone-950 text-white font-serif flex items-center justify-center font-bold text-xs">
                      {customer.customerName.charAt(0)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold text-[10px]">
                      {customer.totalOrders >= 3 ? "Sadık Müşteri" : "Müşteri"}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-stone-950">
                    {customer.customerName}
                  </h3>

                  <div className="mt-2 space-y-1 text-xs text-stone-500 font-light">
                    <p className="font-mono text-stone-700">{customer.phone}</p>
                    {customer.email && <p className="truncate">{customer.email}</p>}
                    <div className="flex items-center gap-1 text-[11px] text-stone-400 pt-0.5">
                      <MapPin className="size-3" />
                      <span>{customer.city}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                        Toplam Sipariş & Ciro
                      </span>
                      <span className="font-serif text-sm font-bold text-stone-950">
                        {customer.totalOrders} Sipariş • {customer.totalSpent.toLocaleString("tr-TR")} TL
                      </span>
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      title="WhatsApp ile İletişime Geç"
                    >
                      <WhatsAppIcon className="size-4 text-emerald-600" />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCustomer(customer)}
                    className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center block"
                  >
                    Tüm Geçmiş Siparişleri Gör ({customer.orders.length})
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xl relative animate-in zoom-in-95 duration-200 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-400 block">
                  MÜŞTERİ GEÇMİŞİ
                </span>
                <h3 className="font-serif text-2xl font-normal text-stone-950 mt-1">
                  {selectedCustomer.customerName}
                </h3>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  {selectedCustomer.phone} • {selectedCustomer.city} • Toplam {selectedCustomer.totalSpent.toLocaleString("tr-TR")} TL Ciro
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 text-stone-400 hover:text-stone-950 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedCustomer.orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-xl border border-stone-200 bg-[#faf9f6] space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-950">
                        {ord.orderNumber}
                      </span>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-500 text-[11px]">
                        {new Date(ord.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <span className="font-bold text-stone-950 text-sm">
                      {ord.totalAmount.toLocaleString("tr-TR")} TL
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-stone-700">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-8 rounded object-cover border border-stone-200 shrink-0"
                          />
                          <div>
                            <span className="font-medium text-stone-900 block truncate max-w-[240px]">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              Beden: {item.size} • {item.quantity} Adet
                            </span>
                          </div>
                        </div>

                        <span className="font-semibold text-stone-950 shrink-0">
                          {(item.price * item.quantity).toLocaleString("tr-TR")} TL
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
