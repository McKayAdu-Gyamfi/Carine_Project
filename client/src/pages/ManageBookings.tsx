import { ChevronLeft, MoreHorizontal, Clock, DollarSign, MessageCircle, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBookings } from "@/contexts/BookingContext";

export default function ManageBookings() {
  const navigate = useNavigate();
  const { bookings, cancelBooking } = useBookings();
  const myBookings = bookings.filter((b) => b.studentName === "Nana Osei");

  const pendingBookings = myBookings.filter((b) => b.status === "Pending");
  const approvedBookings = myBookings.filter((b) => b.status === "Approved");

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
        
        {myBookings.length === 0 && (
           <div className="flex flex-col items-center justify-center mt-20 text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground/50">
                <Clock className="w-8 h-8" />
             </div>
             <p className="font-bold text-muted-foreground">You don't have any bookings yet.</p>
           </div>
        )}

        {/* Pending Approval Bookings */}
        {pendingBookings.length > 0 && (
          <div className="mb-8 space-y-4">
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-muted-foreground mb-4 pl-1 flex items-center">
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin text-amber-500" />
              Pending Verification
            </h2>

            {pendingBookings.map((b) => (
               <div key={b.id} className="bg-card border border-amber-500/30 rounded-[28px] overflow-hidden shadow-lg p-5 relative">
                  <div className="flex space-x-4 mb-4">
                    <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden">
                      <img src={b.image} loading="lazy" className="w-full h-full object-cover" alt={b.hostelName} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                         <h3 className="font-bold text-base tracking-tight">{b.hostelName}</h3>
                         <button onClick={() => cancelBooking(b.id)} className="text-[10px] font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded-md transition-colors cursor-pointer">
                           Cancel
                         </button>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground mt-0.5 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" /> {b.roomNumber} ({b.roomLabel})
                      </p>
                      <p className="font-extrabold text-amber-500 text-sm mt-1.5">GHS {b.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                     <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                       <span className="font-bold uppercase tracking-wider block mb-0.5">Manager Approval Required</span>
                       Your payment is currently being verified by the property manager. You will be notified once approved.
                     </p>
                  </div>
               </div>
            ))}
          </div>
        )}

        {/* Active Approved Booking Cards */}
        {approvedBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-emerald-500 mb-4 pl-1 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Active Bookings
            </h2>
            
            {approvedBookings.map((b) => (
              <div key={b.id} className="bg-card border border-primary/20 rounded-[32px] overflow-hidden shadow-xl mb-6">
                 <div className="relative h-[180px] w-full">
                   <img src={b.image} loading="lazy" className="w-full h-full object-cover" alt={b.hostelName} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                   
                   <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center space-x-1">
                     <CheckCircle2 className="w-3 h-3" />
                     <span>Approved</span>
                   </div>
                   
                   <div className="absolute bottom-4 left-4 right-4">
                     <h3 className="text-2xl font-bold text-white mb-1">{b.hostelName}</h3>
                     <div className="flex items-center text-white/80 text-xs font-semibold space-x-1">
                       <MapPin className="w-3 h-3" />
                       <span>{b.roomNumber} • {b.roomLabel}</span>
                     </div>
                   </div>
                 </div>

                 <div className="p-5">
                   <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/50">
                     <div>
                       <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Check-in</p>
                       <p className="font-bold text-sm">Official Start Date</p>
                     </div>
                     <div className="h-8 w-px bg-border/50" />
                     <div className="text-right">
                       <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Paid</p>
                       <p className="font-extrabold text-sm text-green-500">GHS {b.price.toLocaleString()}</p>
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
                     <button 
                       onClick={() => cancelBooking(b.id)}
                       className="w-full h-12 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                     >
                       Cancel Booking
                     </button>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
