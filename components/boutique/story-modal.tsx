"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  if (!isOpen || !mounted) return null;

  const current = stories[currentIndex];
  if (!current) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 select-none">
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Önceki"
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {currentIndex < stories.length - 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Sonraki"
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      <div className="relative w-full h-[100dvh] sm:h-[90dvh] sm:max-h-[820px] sm:max-w-[420px] sm:rounded-3xl overflow-hidden bg-stone-900 shadow-2xl flex flex-col justify-between">
        <img
          key={current.id}
          src={current.image}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 z-10 pointer-events-none" />

        <div className="relative z-30 pt-safe px-3 sm:px-4 pt-3 sm:pt-4">
          <div className="flex items-center gap-1.5 mb-2.5">
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

          <div className="flex items-center justify-between text-white py-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm tracking-widest uppercase font-medium drop-shadow-sm">
                ATELIER SILK
              </span>
              <span className="text-[10px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-light">
                {current.tag}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-white/80 font-mono">
                {currentIndex + 1} / {stories.length}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-20 grid grid-cols-2">
          <div
            onClick={handlePrev}
            aria-label="Önceki hikaye"
            className="h-full cursor-pointer"
          />
          <div
            onClick={handleNext}
            aria-label="Sonraki hikaye"
            className="h-full cursor-pointer"
          />
        </div>

        <div className="relative z-30 p-4 sm:p-5 pb-safe pb-6 sm:pb-5 mt-auto">
          <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-stone-900 border border-white/20">
            <div className="min-w-0 flex-1">
              <span className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold block">
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
              className="shrink-0 px-4 py-2.5 rounded-xl bg-stone-950 text-white text-xs tracking-wider uppercase font-medium hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="size-3.5" />
              <span>İncele</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
