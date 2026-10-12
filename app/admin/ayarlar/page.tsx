import { getStoreSettings } from "@/lib/admin-store";
import SettingsClient from "./settings-client";

export const instant = false;

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();

  return <SettingsClient initialSettings={settings} />;
}
