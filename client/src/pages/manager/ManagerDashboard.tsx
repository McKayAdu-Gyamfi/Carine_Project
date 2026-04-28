import { Bell, TrendingUp, Users, CheckCircle, Home } from "lucide-react";
import { useBookings } from "@/contexts/BookingContext";
import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const { bookings } = useBookings();
  const navigate = useNavigate();
  
  const pendingCount = bookings.filter(b => b.status === "Pending").length;

  return (
    <div className="flex flex-col min-h-screen pb-6">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 sticky top-0 bg-background/80 backdrop-blur-md z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Manager Hub</h1>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mt-1">Properties Overview</p>
          </div>
          <button className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center relative shadow-sm">
            <Bell className="w-5 h-5 text-foreground" />
            {pendingCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
          </button>
        </div>
      </div>

      <div className="px-5 space-y-6">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-5 shadow-lg relative overflow-hidden text-primary-foreground isolate">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-16 h-16" />
            </div>
            <div className="flex flex-col justify-between h-full relative z-10 w-full">
              <p className="text-[11px] font-extrabold uppercase tracking-widest opacity-80 mb-2">Total Capacity</p>
              <h2 className="text-2xl font-bold">210 Beds</h2>
              <div className="mt-2 text-xs font-semibold bg-white/20 w-max px-2 py-1 rounded inline-flex items-center">
                +15% from expansion
              </div>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
               <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider mb-0.5">Occupancy</p>
            <h2 className="text-2xl font-bold text-foreground">92%</h2>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
               <Users className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider mb-0.5">Active Tenants</p>
            <h2 className="text-2xl font-bold text-foreground">156</h2>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
               <Home className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider mb-0.5">Available</p>
            <h2 className="text-2xl font-bold text-foreground">14 Rm</h2>
          </div>
        </div>

        {/* Action Required Banner */}
        {pendingCount > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
              <p className="font-bold text-red-600 dark:text-red-400 text-sm">{pendingCount} Pending Approvals</p>
            </div>
            <button onClick={() => navigate('/manager/bookings')} className="text-xs font-bold bg-red-500 text-white px-3 py-1.5 rounded-lg shadow-sm active:scale-95 transition-transform cursor-pointer">View Files</button>
          </div>
        )}

        {/* Recent Activity List */}
        <div>
          <h3 className="text-[15px] font-extrabold mb-4 uppercase tracking-wider text-muted-foreground ml-1">Recent Activity</h3>
          <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between pb-4 border-b border-border/40">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">JS</div>
                <div>
                  <p className="font-bold text-sm text-foreground">John Sam</p>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Signed Tenancy - Rm 402</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-500">Verified</span>
            </div>

            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-sm">RA</div>
                <div>
                  <p className="font-bold text-sm text-foreground">Rita Ampofo</p>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Maintenance Req</p>
                </div>
              </div>
              <span className="text-xs font-bold text-muted-foreground">Pending</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
