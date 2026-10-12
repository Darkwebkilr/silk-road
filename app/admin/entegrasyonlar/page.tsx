import { getStoreSettings } from "@/lib/admin-store";
import IntegrationsClient from "./integrations-client";

export const instant = false;

export default async function AdminIntegrationsPage() {
  const settings = await getStoreSettings();

  return <IntegrationsClient initialSettings={settings} />;
}
