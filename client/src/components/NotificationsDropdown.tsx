import { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle2, ShieldCheck, Activity } from "lucide-react";

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("View All");

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

  const tabs = ["View All", "New Update", "Security"];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-10 h-10 bg-transparent sm:bg-white/10 dark:sm:bg-black/20 sm:backdrop-blur-md rounded-full flex items-center justify-center relative sm:shadow-sm sm:border sm:border-white/20 transition-colors hover:bg-accent group"
      >
        <Bell className="w-6 h-6 sm:w-5 sm:h-5 text-muted-foreground transition-colors group-hover:text-foreground" />
        <span className="absolute top-2 right-2 sm:right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-[-40px] sm:right-0 mt-3 w-[320px] sm:w-[360px] bg-card border border-border/50 rounded-[20px] shadow-2xl z-50 overflow-hidden flex flex-col origin-top-right animate-in fade-in zoom-in-95 duration-200">
          
          <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card text-card-foreground">
            <h3 className="font-bold text-lg">Notifications</h3>
            <button className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
              <span className="mb-2 leading-none text-xl font-bold text-muted-foreground">...</span>
            </button>
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
            <div className="p-3 rounded-2xl hover:bg-accent/50 transition-colors cursor-pointer flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="font-bold text-[13px] text-foreground">Payment successfully verified</h4>
                </div>
                <p className="text-[12px] text-muted-foreground leading-snug mb-1.5">Your rent payment has been confirmed. Proceed with your receipt.</p>
                <span className="text-[10px] font-medium text-muted-foreground/80">Tuesday 7:30 am</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl hover:bg-accent/50 transition-colors cursor-pointer flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="font-bold text-[13px] text-foreground">Security password updated</h4>
                </div>
                <p className="text-[12px] text-muted-foreground leading-snug mb-1.5">Your security password has been successfully changed.</p>
                <span className="text-[10px] font-medium text-muted-foreground/80">Monday 9:30 am</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl hover:bg-accent/50 transition-colors cursor-pointer flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="font-bold text-[13px] text-foreground">System Maintenance</h4>
                </div>
                <p className="text-[12px] text-muted-foreground leading-snug mb-1.5">We will be updating the system on Friday night. Expect brief downtime.</p>
                <span className="text-[10px] font-medium text-muted-foreground/80">Sunday 4:30 pm</span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 text-primary font-bold text-sm bg-muted/10 border-t border-border/50 hover:bg-primary/5 transition-colors">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
