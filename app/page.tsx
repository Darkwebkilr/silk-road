import StoriesBar from "@/components/boutique/stories-bar";
import HeroBanner from "@/components/boutique/hero-banner";
import TrustBadges from "@/components/boutique/trust-badges";
import ProductGrid from "@/components/boutique/product-grid";
import ShopTheLook from "@/components/boutique/shop-the-look";
import CategoryStrip from "@/components/boutique/category-strip";
import VideoReels from "@/components/boutique/video-reels";
import InstagramFeed from "@/components/boutique/instagram-feed";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Tıklandığında Tam Ekran Instagram Hikaye Modalı Açan Stories Barı */}
      <StoriesBar />

      {/* 2. Editoryal Lookbook Hero Banner */}
      <HeroBanner />

      {/* 3. Butik Güven Damgaları (Şeffaf Kargo, Kolay Değişim, WhatsApp) */}
      <TrustBadges />

      {/* 4. Yeni Sezon Parçaları & Alttan Kayan Hızlı Beden Seçimi */}
      <ProductGrid />

      {/* 5. İNTERAKTİF SHOP THE LOOK: Pinlerle Kombini Tamamla & Tek Tıkla Satın Al */}
      <ShopTheLook />

      {/* 6. Zamansız Silüetler Kategori Vitrini */}
      <CategoryStrip />

      {/* 7. DİKEY REELS & VİDEO: Kumaşın Duruşu ve Hareketi */}
      <VideoReels />

      {/* 8. Instagram Topluluk Galerisi (@ateliersilk) */}
      <InstagramFeed />
    </div>
  );
}
