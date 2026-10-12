"use client";

import { useState, useTransition } from "react";
import { loginAdminAction } from "@/app/admin/actions";
import { Lock, User, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginAdminAction(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#141211] flex items-center justify-center p-4 sm:p-6 text-stone-100 font-sans">
      <div className="max-w-md w-full bg-[#1c1917] border border-stone-800 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] tracking-widest uppercase font-semibold">
            <Sparkles className="size-3" />
            <span>YÖNETİCİ GİRİŞİ</span>
          </div>

          <h1 className="font-serif text-3xl tracking-[0.16em] uppercase text-white font-normal mt-2">
            ATELIER SILK
          </h1>

          <p className="text-xs text-stone-400 font-light">
            Butik mağaza yönetim sistemine erişmek için giriş yapın.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center animate-in fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-2">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                required
                defaultValue="aziz"
                placeholder="aziz"
                className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-stone-700 bg-stone-900/60 text-xs sm:text-sm text-white outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-light"
              />
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500 stroke-[1.5]" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-2">
              Yönetici Şifresi
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                defaultValue="123"
                placeholder="••••••"
                className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-stone-700 bg-stone-900/60 text-xs sm:text-sm text-white outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-light"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500 stroke-[1.5]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-lg bg-white hover:bg-stone-200 text-stone-950 text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-md mt-4"
          >
            <span>{isPending ? "Giriş Yapılıyor..." : "Panele Giriş Yap"}</span>
            <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-800 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-500">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>256-bit Uçtan Uca Şifreli Oturum</span>
          </div>
        </div>
      </div>
    </div>
  );
}
