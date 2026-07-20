import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";
import { useEffect } from "react";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      <DesktopSidebar />
      <main className="flex-1 pb-20 lg:pb-0 lg:ml-[88px] w-full max-w-[100vw] lg:max-w-[calc(100vw-88px)]">
        <Outlet />
      </main>
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
