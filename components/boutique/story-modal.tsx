"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface StoryData {
  id: string;
  title: string;
  tag: string;
  image: string;
  productName: string;
  productPrice: string;
  productSlug: string;
}

interface StoryModalProps {
  stories: StoryData[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryModal({
  stories,
  initialIndex,
  isOpen,
  onClose,
}: StoryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex, isOpen]);

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // 5 saniyelik otomatik hikaye ilerleme sayacı
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, handleNext]);

  // Klavye kontrolü
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen) return null;

  const current = stories[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Kapatma Butonu */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="size-6" />
      </button>

      {/* Sol Ok */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Önceki"
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {/* Sağ Ok */}
      {currentIndex < stories.length - 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Sonraki"
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      {/* Hikaye Kartı (9:16 Telefon Formatı) */}
      <div className="relative w-full max-w-[400px] h-full sm:h-[85vh] sm:max-h-[780px] sm:rounded-3xl overflow-hidden bg-stone-900 shadow-2xl flex flex-col justify-between">
        {/* Üst İlerleme Çubukları */}
        <div className="absolute top-0 inset-x-0 z-20 p-3 pt-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-1.5 mb-3">
            {stories.map((s, idx) => (
              <div
                key={s.id}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width:
                      idx === currentIndex
                        ? `${progress}%`
                        : idx < currentIndex
                        ? "100%"
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Butik Başlığı */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm tracking-widest uppercase font-medium">
                ATELIER SILK
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {current.tag}
              </span>
            </div>
            <span className="text-xs text-white/70">
              {currentIndex + 1} / {stories.length}
            </span>
          </div>
        </div>

        {/* Hikaye Arka Plan Fotoğrafı */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* Dokunmatik Sol / Sağ Geçiş Alanı */}
        <div className="absolute inset-0 z-10 grid grid-cols-2">
          <div onClick={handlePrev} className="cursor-pointer" />
          <div onClick={handleNext} className="cursor-pointer" />
        </div>

        {/* Alt Ürün Kartı & Satın Alma Çağrısı */}
        <div className="relative z-20 p-5 pt-0 mt-auto">
          <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 text-stone-900">
            <div className="min-w-0">
              <span className="text-[10px] tracking-widest uppercase text-stone-400 font-semibold block">
                GÖRSELDEKİ PARÇA
              </span>
              <h4 className="text-xs sm:text-sm font-semibold truncate text-stone-900 mt-0.5">
                {current.productName}
              </h4>
              <p className="text-xs font-bold text-stone-950 mt-0.5">
                {current.productPrice}
              </p>
            </div>

            <Link
              href={`/urun/${current.productSlug}`}
              onClick={onClose}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-stone-950 text-white text-xs tracking-wider uppercase font-medium hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5"
            >
              <ShoppingBag className="size-3.5" />
              <span>İncele</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
