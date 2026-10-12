import { getAdminOrders } from "@/lib/admin-store";
import OrderListClient from "./order-list";

export const instant = false;

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return <OrderListClient initialOrders={orders} />;
}
