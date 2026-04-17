import { ChevronLeft, MoreHorizontal, Clock, DollarSign, MessageCircle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import tanko_hostel_1 from "../assets/Tanko_4.png";

export default function ManageBookings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-20 border-b border-border/50 sticky top-0 bg-background z-50">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-accent rounded-full transition-colors cursor-pointer">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Your Bookings</h1>
        <button className="p-2 hover:bg-accent rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="px-5 py-6">
        
        {/* Active Booking Card */}
        <div className="mb-8">
          <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-muted-foreground mb-4 pl-1">Active Booking</h2>
          
          <div className="bg-card border border-primary/20 rounded-[32px] overflow-hidden shadow-xl">
             <div className="relative h-[180px] w-full">
               <img src={tanko_hostel_1} loading="lazy" className="w-full h-full object-cover" alt="Tanko Hostel" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
               
               <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center space-x-1">
                 <Clock className="w-3 h-3" />
                 <span>In-Progress</span>
               </div>
               
               <div className="absolute bottom-4 left-4 right-4">
                 <h3 className="text-2xl font-bold text-white mb-1">Tanko Hostel</h3>
                 <div className="flex items-center text-white/80 text-xs font-semibold space-x-1">
                   <MapPin className="w-3 h-3" />
                   <span>Room 402B • Premium Ensuite</span>
                 </div>
               </div>
             </div>

             <div className="p-5">
               <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/50">
                 <div>
                   <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Check-in</p>
                   <p className="font-bold text-sm">Jan 12, 2025</p>
                 </div>
                 <div className="h-8 w-px bg-border/50" />
                 <div className="text-right">
                   <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Paid</p>
                   <p className="font-extrabold text-sm text-green-500">GHS 2,400</p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                 <button className="h-12 bg-accent hover:bg-accent/80 border border-border/50 rounded-2xl flex items-center justify-center space-x-2 font-bold text-xs transition-colors cursor-pointer">
                   <MessageCircle className="w-4 h-4 text-muted-foreground" />
                   <span>Contact Host</span>
                 </button>
                 <button className="h-12 bg-accent hover:bg-accent/80 border border-border/50 rounded-2xl flex items-center justify-center space-x-2 font-bold text-xs transition-colors cursor-pointer">
                   <DollarSign className="w-4 h-4 text-muted-foreground" />
                   <span>View Receipt</span>
                 </button>
               </div>
               
               <div className="mt-3">
                 <button className="w-full h-12 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center font-bold text-xs transition-colors cursor-pointer">
                   Cancel Booking
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Past Bookings */}
        <div>
          <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-muted-foreground mb-4 pl-1">Past Bookings</h2>
          <div className="bg-card border border-border/40 rounded-[24px] p-4 flex items-center space-x-4 opacity-70">
            <div className="w-16 h-16 rounded-2xl bg-muted overflow-hidden shrink-0">
               <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fit=crop&w=200&h=200" loading="lazy" className="w-full h-full object-cover mix-blend-luminosity" alt="Past" />
            </div>
            <div className="flex-1">
               <h4 className="font-bold text-sm mb-1">Blue Haven</h4>
               <p className="text-[11px] font-semibold text-muted-foreground">Sem 2 2023 • Completed</p>
            </div>
            <button className="px-4 py-2 bg-accent rounded-xl text-[10px] font-bold hover:bg-accent/80 transition-colors">
              Receipt
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
