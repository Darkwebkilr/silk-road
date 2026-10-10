"use client";

import { useState } from "react";
import StoryModal, { StoryData } from "./story-modal";

const STORIES_DATA: StoryData[] = [
  {
    id: "1",
    title: "YENİLER",
    tag: "Yeni Sezon",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
    productName: "Asimetrik Saten Drapeli Elbise",
    productPrice: "1.450 TL",
    productSlug: "asimetrik-saten-elbise",
  },
  {
    id: "2",
    title: "ELBİSE",
    tag: "Öne Çıkan",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
    productName: "Sırt Dekolteli Saten Midi Elbise",
    productPrice: "1.350 TL",
    productSlug: "sirt-dekolteli-saten-midi-elbise",
  },
  {
    id: "3",
    title: "BLAZER",
    tag: "Koleksiyon",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
    productName: "Kruvaze Keten Blazer Ceket",
    productPrice: "1.650 TL",
    productSlug: "kruvaze-keten-blazer-ceket",
  },
  {
    id: "4",
    title: "KETEN TAKIM",
    tag: "Kombin",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80",
    productName: "Doğal Keten Gömlek & Şort Takım",
    productPrice: "1.850 TL",
    productSlug: "dogal-keten-ikili-gomlek-sort-takim",
  },
  {
    id: "5",
    title: "LOOKBOOK '26",
    tag: "Podyum",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    productName: "İpek Karışımlı Triko & Etek",
    productPrice: "1.290 TL",
    productSlug: "ipek-karisimli-triko",
  },
  {
    id: "6",
    title: "İNDİRİM",
    tag: "Fırsat",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80",
    productName: "Kemerli Dökümlü Trençkot",
    productPrice: "2.150 TL",
    productSlug: "dokumlu-kemerli-trenckot",
  },
];

export default function StoriesBar() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  return (
    <>
      <div className="w-full bg-[#faf9f6] border-b border-stone-200 py-3.5 select-none">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-start sm:justify-center gap-5 sm:gap-8 overflow-x-auto scrollbar-none py-1">
            {STORIES_DATA.map((story, index) => (
              <button
                key={story.id}
                type="button"
                onClick={() => setSelectedStoryIndex(index)}
                className="group flex flex-col items-center gap-2 shrink-0 outline-none cursor-pointer"
              >
                {/* Zarif Butik Hikaye Çemberi */}
                <div className="size-16 sm:size-18 rounded-full p-0.5 ring-1 ring-stone-300 ring-offset-2 ring-offset-[#faf9f6] group-hover:ring-stone-900 group-hover:scale-105 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>

                {/* Başlık */}
                <span className="text-[10px] tracking-[0.16em] uppercase text-stone-700 font-medium group-hover:text-stone-950 transition-colors">
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tam Ekran Instagram Hikaye Önizleme Modalı */}
      {selectedStoryIndex !== null && (
        <StoryModal
          stories={STORIES_DATA}
          initialIndex={selectedStoryIndex}
          isOpen={selectedStoryIndex !== null}
          onClose={() => setSelectedStoryIndex(null)}
        />
      )}
    </>
  );
}
