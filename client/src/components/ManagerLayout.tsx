import { Outlet, useLocation } from "react-router-dom";
import ManagerBottomNav from "./ManagerBottomNav";
import { useEffect } from "react";

export default function ManagerLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-accent/20 dark:bg-black/20 text-foreground">
      <main className="flex-1">
        <Outlet />
      </main>
      <ManagerBottomNav />
    </div>
  );
}
