import { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle2, ShieldCheck, TrendingDown } from "lucide-react";

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("View All");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "notification",
      title: "Payment successfully verified",
      message: "Your rent payment has been confirmed. Proceed with your receipt.",
      time: "Tuesday 7:30 am",
      read: false,
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      id: 2,
      type: "weekly_update",
      title: "Dufie Annex Price Drop!",
      message: "Dufie Annex has reduced prices for the upcoming semester. Book now to save 10%.",
      time: "Monday 9:30 am",
      read: false,
      icon: <TrendingDown className="w-5 h-5" />,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      id: 3,
      type: "notification",
      title: "Security password updated",
      message: "Your security password has been successfully changed.",
      time: "Sunday 4:30 pm",
      read: true,
      icon: <ShieldCheck className="w-5 h-5" />,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/10 border-purple-500/20"
    }
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const tabs = ["View All", "Unread", "Weekly Updates"];
  
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "Unread") return !n.read;
    if (activeTab === "Weekly Updates") return n.type === "weekly_update";
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-10 h-10 bg-transparent sm:bg-white/10 dark:sm:bg-black/20 sm:backdrop-blur-md rounded-full flex items-center justify-center relative sm:shadow-sm sm:border sm:border-white/20 transition-colors hover:bg-accent group"
      >
        <Bell className="w-6 h-6 sm:w-5 sm:h-5 text-muted-foreground transition-colors group-hover:text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-[-40px] sm:right-0 mt-3 w-[320px] sm:w-[360px] bg-card border border-border/50 rounded-[20px] shadow-2xl z-50 overflow-hidden flex flex-col origin-top-right animate-in fade-in zoom-in-95 duration-200">
          
          <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card text-card-foreground">
            <h3 className="font-bold text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs font-bold text-primary hover:underline transition-colors mt-1">
                Mark all as read
              </button>
            )}
          </div>

          <div className="px-4 py-3 bg-muted/20 border-b border-border/40">
            <div className="flex bg-accent/50 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-[11px] sm:text-xs font-semibold py-1.5 rounded-lg transition-all ${activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* List of Notifications */}
          <div className="max-h-[300px] overflow-y-auto overflow-x-hidden flex flex-col p-2 space-y-1">
            {filteredNotifications.map((n) => (
              <div 
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-3 rounded-2xl transition-colors cursor-pointer flex gap-4 ${n.read ? 'opacity-70 hover:bg-accent/30' : 'bg-primary/5 hover:bg-primary/10'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${n.iconBg} ${n.iconColor}`}>
                  {n.icon}
                </div>
                <div className="flex-1 relative">
                  {!n.read && <div className="absolute top-1 right-0 w-2 h-2 rounded-full bg-primary" />}
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className={`font-bold text-[13px] ${n.read ? 'text-foreground/80' : 'text-foreground pr-4'}`}>{n.title}</h4>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-snug mb-1.5">{n.message}</p>
                  <span className="text-[10px] font-medium text-muted-foreground/80">{n.time}</span>
                </div>
              </div>
            ))}
            
            {filteredNotifications.length === 0 && (
              <div className="py-8 text-center text-sm font-medium text-muted-foreground">
                No notifications here.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
