import { getAdminProducts } from "@/lib/admin-store";
import AdminProductList from "./product-list";

export const instant = false;

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return <AdminProductList initialProducts={products} />;
}
