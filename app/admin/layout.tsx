import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import AdminSidebar from "./components/admin-sidebar";
import AdminLogoutButton from "./components/admin-logout-button";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  return (
    <AdminLayoutGuard authenticated={authenticated}>
      {children}
    </AdminLayoutGuard>
  );
}

function AdminLayoutGuard({
  authenticated,
  children,
}: {
  authenticated: boolean;
  children: React.ReactNode;
}) {
  if (!authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-stone-900 flex font-sans antialiased">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white border-b border-stone-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">
              Atelier Silk Canlı Veri Tabanı
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-stone-500">
              Yönetici: <strong>Aziz Bey</strong>
            </span>
            <div className="size-8 rounded-full bg-stone-950 text-white font-serif flex items-center justify-center font-bold text-xs">
              A
            </div>
            <AdminLogoutButton />
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
