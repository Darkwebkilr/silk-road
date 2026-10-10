import { Suspense } from "react";
import CategoryClient from "./category-client";
import { CATEGORIES_META } from "@/lib/products";

export function generateStaticParams() {
  return Object.keys(CATEGORIES_META).map((slug) => ({ slug }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  return <CategoryClient slug={slug} />;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center">
          <div className="font-serif text-xl text-stone-400 animate-pulse">
            Atelier Silk Koleksiyonu Yükleniyor...
          </div>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
