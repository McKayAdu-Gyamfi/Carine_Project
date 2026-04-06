import { useState } from "react";
import { Search, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function ManagerBookings() {
  const [activeTab, setActiveTab] = useState("Pending");

  const bookings = [
    { id: 1, name: "Emmanuel Mensah", room: "Rm 402B", date: "Today, 10:30 AM", status: "Pending" },
    { id: 2, name: "Sarah Adjei", room: "Rm 104", date: "Yesterday, 2:15 PM", status: "Pending" },
    { id: 3, name: "Kofi Annan", room: "Rm 301A", date: "Oct 12, 09:00 AM", status: "Approved" },
    { id: 4, name: "Ama Serwaa", room: "Rm 205", date: "Oct 10, 11:45 AM", status: "Declined" },
  ];

  const filteredBookings = bookings.filter(b => b.status === activeTab);

  return (
    <div className="flex flex-col min-h-screen pb-6">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 sticky top-0 bg-background/80 backdrop-blur-md z-40">
        <h1 className="text-xl font-bold text-foreground mb-4">Bookings</h1>
        
        <div className="flex gap-3 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search tenant..." 
              className="w-full h-10 bg-card rounded-lg pl-9 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary shadow-sm border border-border/60"
            />
          </div>
          <button className="w-10 h-10 bg-card rounded-lg border border-border/60 flex items-center justify-center shadow-sm">
            <Filter className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
          {["Pending", "Approved", "Declined"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${activeTab === tab ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-transparent text-muted-foreground border-border/60 hover:bg-accent'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 space-y-4">
        {filteredBookings.length === 0 && (
          <div className="text-center text-muted-foreground mt-10">
            <p className="text-sm font-semibold">No {activeTab.toLowerCase()} bookings found.</p>
          </div>
        )}
        
        {filteredBookings.map(b => (
          <div key={b.id} className="bg-card border border-border/60 rounded-xl p-4 shadow-sm relative group overflow-hidden">
            {b.status === "Pending" && (
               <div className="absolute top-0 right-0 p-2 opacity-5">
                 <Clock className="w-16 h-16 text-amber-500" />
               </div>
            )}
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-[15px] truncate max-w-[200px]">{b.name}</h3>
                  <p className="text-[11px] font-semibold text-primary/80 mt-0.5">{b.room}</p>
                </div>
                <div className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground">{b.date}</div>
              </div>

              {b.status === "Pending" && (
                <div className="flex items-center space-x-3 mt-4 border-t border-border/40 pt-3">
                  <button className="flex-1 flex items-center justify-center space-x-1.5 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 py-2.5 rounded-lg font-bold text-xs transition-colors">
                     <CheckCircle2 className="w-4 h-4" />
                     <span>Approve</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1.5 bg-red-500/10 text-red-600 hover:bg-red-500/20 py-2.5 rounded-lg font-bold text-xs transition-colors">
                     <XCircle className="w-4 h-4" />
                     <span>Decline</span>
                  </button>
                </div>
              )}

              {b.status === "Approved" && (
                <div className="flex items-center space-x-1.5 mt-3 border-t border-border/40 pt-3 text-emerald-500">
                   <CheckCircle2 className="w-3.5 h-3.5" />
                   <span className="text-xs font-bold">Approved</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
