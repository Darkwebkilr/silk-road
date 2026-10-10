import Link from "next/link";

const CATEGORIES = [
  {
    title: "Elbise Koleksiyonu",
    subtitle: "Saten, keten ve şifon kesimler",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&auto=format&fit=crop&q=80",
    href: "/kategori/elbiseler",
  },
  {
    title: "Blazer & Trençkot",
    subtitle: "Kruvaze ve dökümlü kalıplar",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop&q=80",
    href: "/kategori/dis-giyim",
  },
  {
    title: "İkili Takımlar",
    subtitle: "Zahmetsiz şık kombinler",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop&q=80",
    href: "/kategori/takimlar",
  },
];

export default function CategoryStrip() {
  return (
    <section className="py-16 lg:py-20 bg-[#faf9f6] border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block">
            ÖNE ÇIKAN KATEGORİLER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight mt-1">
            Zamansız Silüetler
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group block overflow-hidden"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200">
                
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
              </div>

              <div className="pt-4 text-center">
                <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal group-hover:underline underline-offset-4 decoration-stone-300">
                  {cat.title}
                </h3>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  {cat.subtitle}
                </p>
                <span className="inline-block mt-2 text-[10px] tracking-[0.2em] uppercase text-stone-900 border-b border-stone-900 pb-0.5 font-medium">
                  KEŞFET
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
