"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Package,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [submitted, setSubmitted] = useState(false);
  const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    kvkk: true,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="border-b border-stone-200/80 bg-white/70 backdrop-blur-sm py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 tracking-widest uppercase mb-3"
          >
            <Link href="/" className="hover:text-stone-950 transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">Hesabım</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal tracking-tight">
            Atelier Silk Dünyasına Hoş Geldiniz
          </h1>
          <p className="text-xs sm:text-[13px] text-stone-600 font-light mt-2 max-w-lg mx-auto">
            Siparişlerinizi takip edin, favori tasarımlarınızı kaydedin ve özel koleksiyon lansmanlarına ilk siz erişin.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 items-start">
          <div className="bg-white border border-stone-200/90 shadow-sm p-6 sm:p-10">
            <div className="grid grid-cols-2 border-b border-stone-200 mb-8">
              <button
                type="button"
                onClick={() => {
                  setTab("login");
                  setSubmitted(false);
                }}
                className={`pb-3.5 text-xs sm:text-[13px] tracking-[0.16em] uppercase font-semibold transition-all relative cursor-pointer ${
                  tab === "login"
                    ? "text-stone-950"
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                <span>GİRİŞ YAP</span>
                {tab === "login" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-950 animate-in fade-in" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTab("register");
                  setSubmitted(false);
                }}
                className={`pb-3.5 text-xs sm:text-[13px] tracking-[0.16em] uppercase font-semibold transition-all relative cursor-pointer ${
                  tab === "register"
                    ? "text-stone-950"
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                <span>ÜYE OL</span>
                {tab === "register" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-950 animate-in fade-in" />
                )}
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3 animate-in fade-in duration-300">
                <div className="size-12 rounded-full bg-stone-900 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="size-6 text-emerald-400" />
                </div>
                <h3 className="font-serif text-xl text-stone-950">
                  {tab === "login" ? "Giriş Başarılı" : "Kaydınız Oluşturuldu"}
                </h3>
                <p className="text-xs text-stone-600 font-light">
                  Hesabınıza yönlendiriliyorsunuz, lütfen bekleyin...
                </p>
              </div>
            ) : tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    E-POSTA VEYA TELEFON
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={loginForm.identifier}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, identifier: e.target.value })
                      }
                      placeholder="ad@ornek.com veya 05XX..."
                      className="w-full pl-10 pr-3.5 py-3 border border-stone-300 bg-[#faf9f6]/40 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:bg-white transition-all font-light"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400 stroke-[1.5]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium">
                      ŞİFRE
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Şifre sıfırlama bağlantısı e-posta adresinize veya telefonunuza SMS olarak iletilmiştir."
                        )
                      }
                      className="text-[11px] text-stone-500 hover:text-stone-950 transition-colors underline underline-offset-2"
                    >
                      Şifremi Unuttum
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3.5 py-3 border border-stone-300 bg-[#faf9f6]/40 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:bg-white transition-all font-light"
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400 stroke-[1.5]" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
                >
                  <span>GİRİŞ YAP</span>
                  <ArrowRight className="size-4" />
                </button>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-stone-500 font-light">
                    Hesabınız yok mu?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("register")}
                      className="text-stone-950 font-medium underline underline-offset-2 cursor-pointer"
                    >
                      Hemen Üye Olun
                    </button>
                  </span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    AD SOYAD
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={registerForm.name}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, name: e.target.value })
                      }
                      placeholder="Adınız Soyadınız"
                      className="w-full pl-10 pr-3.5 py-3 border border-stone-300 bg-[#faf9f6]/40 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:bg-white transition-all font-light"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400 stroke-[1.5]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    E-POSTA ADRESİ
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, email: e.target.value })
                      }
                      placeholder="ad@ornek.com"
                      className="w-full pl-10 pr-3.5 py-3 border border-stone-300 bg-[#faf9f6]/40 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:bg-white transition-all font-light"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400 stroke-[1.5]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    CEP TELEFONU
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={registerForm.phone}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, phone: e.target.value })
                      }
                      placeholder="05XX XXX XX XX"
                      className="w-full pl-10 pr-3.5 py-3 border border-stone-300 bg-[#faf9f6]/40 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:bg-white transition-all font-light"
                    />
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400 stroke-[1.5]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    ŞİFRE BELİRLEYİN
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, password: e.target.value })
                      }
                      placeholder="En az 6 karakter"
                      className="w-full pl-10 pr-3.5 py-3 border border-stone-300 bg-[#faf9f6]/40 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-950 focus:bg-white transition-all font-light"
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400 stroke-[1.5]" />
                  </div>
                </div>

                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={registerForm.kvkk}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, kvkk: e.target.checked })
                    }
                    className="mt-0.5 size-3.5 accent-stone-950 cursor-pointer"
                  />
                  <span className="text-[11px] text-stone-600 leading-tight font-light">
                    Kişisel verilerimin işlenmesine ve üyelik sözleşmesine ilişkin aydınlatma metnini okudum, onaylıyorum.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
                >
                  <span>ÜYELİĞİ TAMAMLA</span>
                  <ArrowRight className="size-4" />
                </button>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-stone-500 font-light">
                    Zaten hesabınız var mı?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      className="text-stone-950 font-medium underline underline-offset-2 cursor-pointer"
                    >
                      Giriş Yapın
                    </button>
                  </span>
                </div>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-stone-200/90 p-6 sm:p-7 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block">
                HIZLI HİZMETLER
              </span>

              <div className="space-y-2">
                <Link
                  href="/siparis-takip"
                  className="flex items-center justify-between p-3.5 bg-[#faf9f6] border border-stone-200/70 hover:border-stone-400 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Package className="size-4 text-stone-700" />
                    <div>
                      <span className="text-xs font-medium text-stone-900 block">
                        Sipariş Takibi
                      </span>
                      <span className="text-[10px] text-stone-500 font-light">
                        Kargo sürecini anlık sorgulayın
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </Link>

                <Link
                  href="/degisim-ve-iade"
                  className="flex items-center justify-between p-3.5 bg-[#faf9f6] border border-stone-200/70 hover:border-stone-400 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <RotateCcw className="size-4 text-stone-700" />
                    <div>
                      <span className="text-xs font-medium text-stone-900 block">
                        Kolay Değişim & İade
                      </span>
                      <span className="text-[10px] text-stone-500 font-light">
                        14 gün içinde koşulsuz işlem
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </Link>

                <Link
                  href="/seffaf-kargo"
                  className="flex items-center justify-between p-3.5 bg-[#faf9f6] border border-stone-200/70 hover:border-stone-400 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-4 text-stone-700" />
                    <div>
                      <span className="text-xs font-medium text-stone-900 block">
                        Şeffaf Kargo Güvencesi
                      </span>
                      <span className="text-[10px] text-stone-500 font-light">
                        Kapıda görerek teslim alma
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </Link>
              </div>
            </div>

            <div className="bg-stone-900 text-white p-6 sm:p-7 space-y-3.5">
              <div className="flex items-center gap-2 text-stone-300">
                <Sparkles className="size-4 text-amber-300" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-300">
                  ATELIER CLUB AYRICALIKLARI
                </span>
              </div>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">•</span>
                  <span>Yeni kapsül koleksiyonlara erken erişim</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">•</span>
                  <span>1.500 TL üzeri siparişlerde koşulsuz ücretsiz kargo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">•</span>
                  <span>Kişiselleştirilmiş stil danışmanı desteği</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-stone-800">
                <a
                  href="https://wa.me/905519283598"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white text-xs tracking-wider uppercase font-medium transition-colors"
                >
                  <WhatsAppIcon className="size-3.5 text-emerald-400" />
                  <span>WhatsApp Destek Hattı</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
