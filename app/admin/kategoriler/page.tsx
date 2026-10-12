import { getAdminCategories } from "@/lib/admin-store";
import CategoryListClient from "./category-list";

export const instant = false;

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return <CategoryListClient initialCategories={categories} />;
}
