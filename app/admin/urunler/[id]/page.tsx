import { notFound } from "next/navigation";
import { getAdminProductById } from "@/lib/admin-store";
import EditProductForm from "./edit-form";

export const instant = false;

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} />;
}
