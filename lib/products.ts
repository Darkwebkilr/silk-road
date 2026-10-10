export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  images: [string, string, ...string[]];
  sizes: string[];
  colors?: string[];
  badge?: string;
  description: string;
  fabric: string;
  modelInfo: string;
  inStock: boolean;
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Kruvaze Keten Blazer Ceket",
    slug: "kruvaze-keten-blazer-ceket",
    price: 1650,
    originalPrice: 1950,
    category: "Dış Giyim",
    categorySlug: "dis-giyim",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop&q=80",
    ],
    sizes: ["36", "38", "40"],
    colors: ["#d6cec2", "#1c1917", "#84827d"],
    badge: "YENİ",
    description: "İtalyan keten dokumasıyla hazırlanan geniş omuzlu kruvaze blazer. Hem gündelik hem de akşam şıklığına uyum sağlayan zamansız bir silüet.",
    fabric: "%100 Doğal Keten Dokuma • Astar: %100 Pamuk",
    modelInfo: "Manken Ölçüleri: Boy 178 cm, Göğüs 84 cm, Bel 60 cm, Kalça 90 cm. Üzerindeki beden 36.",
    inStock: true,
  },
  {
    id: "p2",
    name: "Sırt Dekolteli Saten Midi Elbise",
    slug: "sirt-dekolteli-saten-midi-elbise",
    price: 1350,
    category: "Elbiseler",
    categorySlug: "elbiseler",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&auto=format&fit=crop&q=80",
    ],
    sizes: ["XS", "S", "M"],
    colors: ["#2d2c2a", "#c7b79d"],
    badge: "ÇOK SATAN",
    description: "Vücudu zarifçe saran akışkan saten kumaş, çapraz ince askılı derin sırt dekoltesi ve yırtmaçlı etek boyuyla özel geceler için tasarlandı.",
    fabric: "%97 Saten İpek Görünümlü Rayon, %3 Elastan",
    modelInfo: "Manken Ölçüleri: Boy 176 cm. Üzerindeki beden S.",
    inStock: true,
  },
  {
    id: "p3",
    name: "Doğal Keten İkili Gömlek & Şort Takım",
    slug: "dogal-keten-ikili-gomlek-sort-takim",
    price: 1850,
    category: "Takımlar",
    categorySlug: "takimlar",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    colors: ["#ede8df", "#70685c"],
    badge: "ÖNE ÇIKAN",
    description: "Gevşek kesim düğmeli gömlek ve beli elastik rahat şorttan oluşan takım. Zahmetsiz tatil ve şehir stili için ideal.",
    fabric: "%100 Ham Keten",
    modelInfo: "Manken Ölçüleri: Boy 177 cm. Üzerindeki beden S.",
    inStock: true,
  },
  {
    id: "p4",
    name: "Geniş Paça Kumaş Palazzo Pantolon",
    slug: "genis-paca-kumas-palazzo-pantolon",
    price: 980,
    category: "Alt Giyim",
    categorySlug: "alt-giyim",
    images: [
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&auto=format&fit=crop&q=80",
    ],
    sizes: ["36", "38", "40", "42"],
    colors: ["#1c1917", "#e3dac9"],
    description: "Yüksek bel, pilili ön detay ve akıcı paça kesimi. Bacak boyunu uzun gösteren kusursuz kalıp.",
    fabric: "%70 Viskon, %26 Polyester, %4 Elastan",
    modelInfo: "Manken Ölçüleri: Boy 178 cm. Üzerindeki beden 36.",
    inStock: true,
  },
  {
    id: "p5",
    name: "Dökümlü Kemerli Trençkot",
    slug: "dokumlu-kemerli-trenckot",
    price: 2150,
    originalPrice: 2550,
    category: "Dış Giyim",
    categorySlug: "dis-giyim",
    images: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=80",
    ],
    sizes: ["36", "38", "40"],
    colors: ["#c2b59b", "#1c1917"],
    badge: "FIRSAT",
    description: "Geniş klapa yaka, ayarlanabilir bel kemeri ve su itici pamuk gabardin kumaş. Bahar aylarının vazgeçilmezi.",
    fabric: "%80 Pamuk, %20 Poliamid",
    modelInfo: "Manken Ölçüleri: Boy 180 cm. Üzerindeki beden 38.",
    inStock: true,
  },
  {
    id: "p6",
    name: "V Yaka İpek Karışımlı Triko",
    slug: "v-yaka-ipek-karisimli-triko",
    price: 680,
    category: "Üst Giyim",
    categorySlug: "ust-giyim",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80",
    ],
    sizes: ["Standart"],
    colors: ["#faf7f2", "#3a3834"],
    description: "Hafif, nefes alan ince örgü triko. Derin V dekolte ve rahat omuz düşümü.",
    fabric: "%30 İpek, %70 Modal",
    modelInfo: "Standart beden (36-40 arası uyumlu).",
    inStock: true,
  },
  {
    id: "p7",
    name: "Askılı Fırfır Detay Şifon Elbise",
    slug: "askili-firfir-detay-sifon-elbise",
    price: 1420,
    originalPrice: 1750,
    category: "Elbiseler",
    categorySlug: "elbiseler",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
    ],
    sizes: ["XS", "S", "M"],
    badge: "SINIRLI STOK",
    description: "Kat kat fırfırlı etek detayı, astarlı dökümlü şifon kumaş. Romantik ve zarif bir butik parçası.",
    fabric: "%100 Şifon Viskon • İçi Astarlı",
    modelInfo: "Manken Ölçüleri: Boy 175 cm. Üzerindeki beden S.",
    inStock: true,
  },
  {
    id: "p8",
    name: "Gömlek Yaka Keten Takım",
    slug: "gomlek-yaka-keten-takim",
    price: 1750,
    category: "Takımlar",
    categorySlug: "takimlar",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    colors: ["#ded7ca", "#4a4742"],
    description: "Klasik gömlek yakalı dökümlü üst ve düz paça keten pantolon ikilisi.",
    fabric: "%100 Yıkanmış Keten",
    modelInfo: "Manken Ölçüleri: Boy 177 cm. Üzerindeki beden S.",
    inStock: true,
  },
];

export const CATEGORIES_META: Record<
  string,
  { title: string; subtitle: string; description: string }
> = {
  "yeni-gelenler": {
    title: "YENİ GELENLER",
    subtitle: "2026 İlkbahar / Yaz Lookbook",
    description: "Atelier Silk atölyesinden çıkan en son tasarımlar. Saf keten, akışkan saten ve terzi işi silüetler.",
  },
  elbiseler: {
    title: "ELBİSE KOLEKSİYONU",
    subtitle: "Zarif, Zamansız ve Akıcı",
    description: "Gündüzden geceye eşlik eden saten midi elbiseler, dökümlü ketenler ve özel davet silüetleri.",
  },
  "dis-giyim": {
    title: "CEKET & TRENÇKOT",
    subtitle: "Kusursuz Kalıp, Güçlü Duruş",
    description: "Kruvaze keten blazerlar, dökümlü duster trençkotlar ve mevsimlik şık ceketler.",
  },
  takimlar: {
    title: "İKİLİ TAKIMLAR",
    subtitle: "Zahmetsiz Şıklık",
    description: "Tek parça kolaylığıyla gün boyu konfor ve asalet sunan keten ve krep ikili takımlar.",
  },
  "alt-giyim": {
    title: "PANTOLON & ETEK",
    subtitle: "Akıcı Kesimler",
    description: "Yüksek bel geniş paça palazzo pantolonlar, saten etekler ve rahat kesim şortlar.",
  },
  "ust-giyim": {
    title: "GÖMLEK & BLUZ",
    subtitle: "Doğal Dokular",
    description: "Oversize keten gömlekler, ipek karışımlı trikolar ve dökümlü bluzlar.",
  },
  indirim: {
    title: "FIRSAT & İNDİRİM",
    subtitle: "Sınırlı Stok Avantajı",
    description: "Seçili butik parçalarda sezon indirimi ve son kalan bedenler.",
  },
};
