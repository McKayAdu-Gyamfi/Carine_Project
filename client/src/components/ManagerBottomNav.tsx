import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, CalendarDays, User } from "lucide-react";

export default function ManagerBottomNav() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/manager", icon: LayoutDashboard },
    { name: "Properties", path: "/manager/properties", icon: Building2 },
    { name: "Bookings", path: "/manager/bookings", icon: CalendarDays },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-[88px] bg-background/80 dark:bg-background/90 backdrop-blur-3xl border-t border-border/40 z-[100] px-6 flex items-center justify-between pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path || (item.path !== '/manager' && pathname.startsWith(item.path));
        
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className="flex flex-col items-center justify-center space-y-1 relative group w-16"
          >
            <div className="relative">
              <Icon 
                className={`w-[26px] h-[26px] transition-all duration-300 ${isActive ? 'text-primary scale-110 drop-shadow-sm' : 'text-muted-foreground/60 group-hover:text-foreground'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-50 z-[-1]" />
              )}
            </div>
            <span className={`text-[10px] font-bold tracking-wide transition-all ${isActive ? 'text-primary' : 'text-transparent group-hover:text-muted-foreground'}`}>
              {item.name}
            </span>
            
            {isActive && (
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full shadow-[0_2px_8px_rgba(59,130,246,0.5)]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
