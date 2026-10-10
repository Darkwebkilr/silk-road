import { Suspense } from "react";
import ProductClient from "./product-client";
import { ALL_PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  return <ProductClient slug={slug} />;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center">
          <div className="font-serif text-xl text-stone-400 animate-pulse">
            Parça Detayı Yükleniyor...
          </div>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
