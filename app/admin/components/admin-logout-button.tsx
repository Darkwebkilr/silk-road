"use client";

import { useTransition } from "react";
import { logoutAdminAction } from "@/app/admin/actions";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdminAction();
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleLogout}
      title="Çıkış Yap"
      className="p-1.5 rounded-lg border border-stone-200 text-stone-500 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
    >
      <LogOut className="size-4" />
    </button>
  );
}
