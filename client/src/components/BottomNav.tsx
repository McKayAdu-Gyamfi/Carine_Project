import { Home, Compass, Bookmark, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Saved", path: "/saved", icon: Bookmark },
    { name: "Chats", path: "/chats", icon: MessageSquare },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-[76px] px-4 bg-white/10 dark:bg-black/20 backdrop-blur-xl border-t border-x border-white/20 dark:border-white/10 rounded-t-[32px] shadow-[0_-15px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-15px_40px_rgba(0,0,0,0.4)] transition-colors">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;
        
        return (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            <Icon className={cn("w-5 h-5", isActive && "fill-current drop-shadow-md")} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
