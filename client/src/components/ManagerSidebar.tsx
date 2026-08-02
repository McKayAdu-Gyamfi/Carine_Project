import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, CalendarDays, Users2, Receipt, LogOut } from "lucide-react";
import kaya from "../assets/Kaya.png";

export default function ManagerSidebar() {
  const { pathname } = useLocation();
  
  // Define navigation items
  const navItems = [
    { path: "/manager", label: "Dashboard", icon: LayoutDashboard },
    { path: "/manager/properties", label: "My properties", icon: Building2 },
    { path: "/manager/bookings", label: "Bookings", icon: CalendarDays, badge: 5 },
    { path: "/manager/clients", label: "Clients", icon: Users2 },
    { path: "/manager/payouts", label: "Payouts", icon: Receipt },
  ];

  return (
    <aside className="hidden lg:flex w-[260px] flex-col h-screen fixed top-0 left-0 bg-[#F8F6F3] border-r border-border/40 z-50 py-8 overflow-y-auto hide-scrollbar">
      {/* Top Logo */}
      <div className="px-6 pb-6 mb-6 border-b border-solid border-[#C8B09A]/40 flex items-center space-x-3 mx-2">
        <img src={kaya} alt="KayaCampus Logo" className="w-10 h-10 object-contain shrink-0" />
        <div className="flex flex-col">
          <span className="text-[18px] font-extrabold tracking-tight text-[#5C4538] leading-tight">
            Kaya<span className="text-canyon">Campus</span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9C8271] leading-none mt-0.5">Manager</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col space-y-1.5 px-4">
        {navItems.map((item) => {
          // Dashboard route should exact match so other routes don't highlight it
          const isActive = item.path === "/manager" ? pathname === "/manager" : pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-[14px] transition-all relative ${
                isActive 
                  ? "text-[#A84A1A] bg-[#F1E8DC]" 
                  : "text-[#7B736A] hover:bg-[#F1E8DC]/50 hover:text-[#5C4538]"
              }`}
            >
              {/* Active vertical marker */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#A84A1A] rounded-r-md" />
              )}
              
              <div className="flex items-center space-x-3.5">
                <Icon className={`w-[22px] h-[22px] shrink-0 ${isActive ? 'text-[#A84A1A]' : 'text-[#9A9188]'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={`text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-extrabold ${isActive ? 'bg-[#A84A1A] text-white' : 'bg-[#A84A1A] text-white'}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-5 mt-auto pt-5 border-t border-[#C8B09A]/20">
        <div className="flex items-center p-2 rounded-xl hover:bg-[#F1E8DC]/50 w-full relative group">
          <Link to="/manager/profile" className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity flex-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#463C38] text-white font-bold text-[13px] shrink-0">
              KO
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] text-[#463C38] leading-tight">Kwame Owusu</span>
              <span className="text-[11px] font-semibold text-[#8C8279] mt-0.5 max-w-[120px] truncate">Manager · Dufie Annex</span>
            </div>
          </Link>
          <Link 
            to="/login"
            title="Log out"
            onClick={() => localStorage.removeItem("userAvatar")}
            className="absolute right-2 z-10 p-2 rounded-full hover:bg-red-500/10 cursor-pointer text-[#A29A91] hover:text-red-500 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
