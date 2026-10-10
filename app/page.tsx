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
    <div className="flex flex-col min-h-screen bg-white w-full overflow-x-hidden">
      
      <StoriesBar />

      
      <HeroBanner />

      
      <TrustBadges />

      
      <ProductGrid />

      
      <ShopTheLook />

      
      <CategoryStrip />

      
      <VideoReels />

      
      <InstagramFeed />
    </div>
  );
}
