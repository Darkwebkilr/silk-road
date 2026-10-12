"use client";

import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="w-full h-full">{children}</div>;
  }

  return (
    <div key={pathname} className="cinematic-page-transition w-full">
      {children}
    </div>
  );
}
