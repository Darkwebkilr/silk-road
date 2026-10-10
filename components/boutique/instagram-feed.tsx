import { InstagramIcon } from "@/components/ui/brand-icons";

const POSTS = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop&q=80",
];

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-[#faf9f6] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-8 text-center">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-stone-900 hover:text-stone-600 transition-colors"
        >
          <InstagramIcon className="size-4" />
          <span className="text-xs tracking-[0.25em] uppercase font-semibold">
            @ATELIERSILK
          </span>
        </a>
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mt-1">
          Sizden Gelenler & Kombin İlhamı
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-2 max-w-7xl mx-auto">
        {POSTS.map((img, i) => (
          <a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-stone-200 block"
          >
            
            <img
              src={img}
              alt="Atelier Silk Instagram Kombini"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <InstagramIcon className="size-6 text-white" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
