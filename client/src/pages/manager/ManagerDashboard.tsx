import { Bell, Plus, Bed, Receipt, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ManagerDashboard() {
  return (
    <div className="flex flex-col min-h-screen pb-6 lg:pb-12 bg-[#F0EFEA]">
      {/* Header Mobile */}
      <div className="lg:hidden px-6 pt-12 pb-6 sticky top-0 bg-[#F0EFEA]/90 backdrop-blur-md z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="w-12 h-12 rounded-full bg-[#463C38] flex items-center justify-center text-white font-bold text-lg">
                KO
             </div>
             <div>
               <p className="text-[#8C8279] text-sm font-medium">Good morning</p>
               <h1 className="text-xl font-bold text-[#463C38]">Kwame Owusu</h1>
             </div>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative shadow-sm text-[#463C38]">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Header Desktop */}
      <div className="hidden lg:flex px-8 pt-10 pb-6 items-center justify-between border-b border-solid border-[#E5D0BA]/50 mb-6 mx-8">
        <div>
          <h1 className="text-2xl font-bold text-[#463C38]">Good morning, Kwame</h1>
          <p className="text-[#8C8279] text-sm font-medium mt-1">Monday, 22 July · Dufie Annex</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#463C38]">
            <Bell className="w-5 h-5" />
          </button>
          <button className="bg-[#A84A1A] hover:bg-[#8F3E15] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add room</span>
          </button>
        </div>
      </div>

      <div className="px-5 lg:px-8 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:col-span-3 gap-3 lg:gap-4">
          {/* Occupancy */}
          <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <div className="w-8 h-8 rounded-lg bg-[#F8F6F3] text-[#A84A1A] flex items-center justify-center">
                  <Bed className="w-4 h-4" />
               </div>
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                 <span className="mr-0.5">↑</span>+4%
               </span>
            </div>
            <h2 className="text-2xl font-bold text-[#463C38]">87%</h2>
            <p className="text-[11px] font-medium text-[#8C8279] mt-0.5">Occupancy · 52/60 beds</p>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <div className="w-8 h-8 rounded-lg bg-[#F8F6F3] text-[#A84A1A] flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
               </div>
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                 <span className="mr-0.5">↑</span>+12%
               </span>
            </div>
            <h2 className="text-2xl font-bold text-[#463C38]">GHS 41,600</h2>
            <p className="text-[11px] font-medium text-[#8C8279] mt-0.5">Revenue · July</p>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <div className="w-8 h-8 rounded-lg bg-[#F8F6F3] text-[#A84A1A] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
               </div>
            </div>
            <h2 className="text-2xl font-bold text-[#463C38]">5</h2>
            <p className="text-[11px] font-medium text-[#8C8279] mt-0.5">Pending bookings</p>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <div className="w-8 h-8 rounded-lg bg-[#F8F6F3] text-[#A84A1A] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
               </div>
            </div>
            <h2 className="text-2xl font-bold text-[#463C38]">2</h2>
            <p className="text-[11px] font-medium text-[#8C8279] mt-0.5">Open maintenance</p>
          </div>
        </div>

        {/* Left Column (Recent Bookings) */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-base font-bold text-[#463C38]">Recent bookings</h3>
               <Link to="/manager/bookings" className="text-sm font-bold text-[#A84A1A] hover:underline">View all</Link>
            </div>
            
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-4 text-[10px] font-extrabold uppercase tracking-widest text-[#8C8279] pb-3 border-b border-[#F0EFEA]">
               <div>GUEST</div>
               <div>ROOM</div>
               <div>STATUS</div>
               <div className="text-right">AMOUNT</div>
            </div>

            <div className="space-y-0.5">
               {[
                 { name: "Ama Boateng", initials: "AB", room: "402B", status: "Confirmed", amount: "8,400", color: "bg-[#D2BDA7] text-[#5C4538]" },
                 { name: "Kojo Mensah", initials: "KM", room: "118", status: "Pending", amount: "5,200", color: "bg-[#A84A1A] text-white" },
                 { name: "Efua Owusu", initials: "EO", room: "207", status: "Confirmed", amount: "8,400", color: "bg-emerald-600 text-white" },
                 { name: "Yaw Antwi", initials: "YA", room: "311", status: "Cancelled", amount: "8,400", color: "bg-[#8A79B8] text-white" }
               ].map((b, i) => (
                  <div key={i} className="flex flex-col lg:grid lg:grid-cols-4 lg:items-center py-3 border-b border-[#F0EFEA] last:border-0 gap-2 lg:gap-0">
                     <div className="flex items-center space-x-3">
                       <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${b.color}`}>
                         {b.initials}
                       </div>
                       <div className="lg:hidden flex flex-col">
                         <span className="font-bold text-[#463C38] text-sm">{b.name}</span>
                         <span className="text-xs font-medium text-[#8C8279]">Room {b.room}</span>
                       </div>
                       <span className="hidden lg:block font-bold text-[#463C38] text-[13px]">{b.name}</span>
                     </div>
                     <div className="hidden lg:block text-[#8C8279] font-medium text-[13px]">{b.room}</div>
                     <div className="flex justify-between items-center lg:block">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                          b.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {b.status}
                        </span>
                        <span className="lg:hidden font-bold text-[#463C38] text-sm">{b.amount}</span>
                     </div>
                     <div className="hidden lg:block text-right font-bold text-[#463C38] text-[13px]">
                        {b.amount}
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column (Occupancy & Action Needed) */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* Occupancy by Block (Desktop only in mockup? actually can show on mobile too or hide, let's show) */}
           <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-base font-bold text-[#463C38] mb-5">Occupancy by block</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Block A', filled: 18, total: 20 },
                   { name: 'Block B', filled: 20, total: 24 },
                   { name: 'Block C', filled: 14, total: 16 }
                 ].map(block => (
                    <div key={block.name}>
                       <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-[#8C8279]">{block.name}</span>
                          <span className="text-[#463C38]">{block.filled}/{block.total}</span>
                       </div>
                       <div className="h-1.5 bg-[#F0EFEA] rounded-full overflow-hidden">
                          <div className="h-full bg-[#A84A1A] rounded-full" style={{ width: `${(block.filled / block.total) * 100}%` }} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Action Needed */}
           <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-base font-bold text-[#463C38] mb-4">Action needed</h3>
              <div className="space-y-3">
                 <Link to="/manager/bookings" className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#F0EFEA]/50 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-[#F8F6F3] text-[#A84A1A] flex items-center justify-center shrink-0">
                       <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                       <p className="text-[13px] font-medium text-[#463C38] leading-tight pr-4">
                          <strong className="font-bold">5 bookings</strong> awaiting your approval
                       </p>
                       <ChevronRight className="w-4 h-4 text-[#A29A91] group-hover:text-[#463C38] transition-colors shrink-0" />
                    </div>
                 </Link>

                 <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#F0EFEA]/50 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-[#F8F6F3] text-red-500 flex items-center justify-center shrink-0">
                       <Receipt className="w-4 h-4" />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                       <p className="text-[13px] font-medium text-[#463C38] leading-tight pr-4">
                          <strong className="font-bold">1 refund</strong> to review for Yaw Antwi
                       </p>
                       <ChevronRight className="w-4 h-4 text-[#A29A91] group-hover:text-[#463C38] transition-colors shrink-0" />
                    </div>
                 </div>

                 <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#F0EFEA]/50 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-[#F8F6F3] text-[#A84A1A] flex items-center justify-center shrink-0">
                       <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                       <p className="text-[13px] font-medium text-[#463C38] leading-tight pr-4">
                          <strong className="font-bold">2 maintenance</strong> tickets open in Block B
                       </p>
                       <ChevronRight className="w-4 h-4 text-[#A29A91] group-hover:text-[#463C38] transition-colors shrink-0" />
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
