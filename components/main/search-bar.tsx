"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const POPULAR_SEARCHES = [
  "Oversize Sweatshirt",
  "Deri Ceket",
  "Kablosuz Kulaklık",
  "Sneaker Ayakkabı",
  "Akıllı Saat",
  "Güneş Gözlüğü",
];

const SEARCH_CATEGORIES = [
  { label: "Tüm Kategoriler", value: "all" },
  { label: "Kadın", value: "kadin" },
  { label: "Erkek", value: "erkek" },
  { label: "Elektronik", value: "elektronik" },
  { label: "Aksesuar", value: "aksesuar" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut Ctrl+K / Cmd+K to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsOpen(false);
    const categoryParam = category !== "all" ? `&kategori=${category}` : "";
    router.push(`/arama?q=${encodeURIComponent(query.trim())}${categoryParam}`);
  };

  const handleSelectSuggestion = (text: string) => {
    setQuery(text);
    setIsOpen(false);
    const categoryParam = category !== "all" ? `&kategori=${category}` : "";
    router.push(`/arama?q=${encodeURIComponent(text)}${categoryParam}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* Semantic Search Form */}
      <form
        role="search"
        onSubmit={handleSearchSubmit}
        className="flex items-center w-full border border-zinc-200 dark:border-zinc-800 rounded-full bg-zinc-50/80 dark:bg-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-700 focus-within:border-zinc-950 dark:focus-within:border-zinc-400 focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/10 dark:focus-within:ring-zinc-100/10 transition-all shadow-xs"
      >
        {/* Kategori Seçici */}
        <div className="hidden sm:flex items-center pl-3 pr-2 py-1.5 border-r border-zinc-200 dark:border-zinc-800">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Kategoriye göre filtrele"
            className="text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-transparent outline-none cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors pr-1"
          >
            {SEARCH_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Arama İkonu */}
        <div className="pl-3 sm:pl-2 text-zinc-400 flex items-center">
          <Search className="size-4" aria-hidden="true" />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Milyonlarca ürün, marka veya kategori ara..."
          autoComplete="off"
          spellCheck="false"
          aria-label="Ürün, marka veya kategori arayın"
          className="w-full py-2.5 px-2.5 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none"
        />

        {/* Temizle Butonu */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Aramayı temizle"
            className="p-1 mr-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="size-3.5" />
          </button>
        )}

        {/* Klavye Kısayolu Rozeti */}
        <div className="hidden lg:flex items-center pr-2">
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-zinc-200/70 dark:bg-zinc-800/80 rounded border border-zinc-300 dark:border-zinc-700 select-none">
            ⌘K
          </kbd>
        </div>

        {/* Ara Butonu */}
        <button
          type="submit"
          aria-label="Ara"
          className="m-1 px-4 py-1.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold rounded-full transition-all shrink-0 active:scale-95 shadow-xs"
        >
          Ara
        </button>
      </form>

      {/* Popüler ve Trend Aramalar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-amber-500" />
              Popüler Aramalar
            </span>
            <span className="flex items-center gap-1 text-[11px] font-normal text-zinc-400">
              <Sparkles className="size-3 text-amber-500" /> Trendler
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="text-xs bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
              >
                <span>{item}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Öneri: Aramak istediğiniz kelimeyi yazıp Enter tuşuna basın</span>
            <span className="hidden sm:inline">Esc ile kapat</span>
          </div>
        </div>
      )}
    </div>
  );
}
