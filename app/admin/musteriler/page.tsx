import { getAdminCustomers } from "@/lib/admin-store";
import CustomerListClient from "./customer-list";

export const instant = false;

export default async function AdminCustomersPage() {
  const customers = await getAdminCustomers();

  return <CustomerListClient initialCustomers={customers} />;
}
