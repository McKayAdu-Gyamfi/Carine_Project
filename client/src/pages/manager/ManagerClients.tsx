import { Search, MoreHorizontal } from "lucide-react";

export default function ManagerClients() {
  const clients = [
    {
      name: "Ama Boateng",
      details: "Level 200 · Business",
      room: "402B",
      phone: "024 555 0142",
      moveIn: "Jan 12",
      balance: "Paid",
      initials: "AB",
      color: "bg-[#D2BDA7] text-[#5C4538]"
    },
    {
      name: "Efua Owusu",
      details: "Level 100 · Nursing",
      room: "207",
      phone: "020 555 0198",
      moveIn: "Jan 15",
      balance: "GHS 2,600",
      initials: "EO",
      color: "bg-emerald-700 text-white"
    },
    {
      name: "Nana Adjei",
      details: "Level 300 · Engineering",
      room: "305",
      phone: "027 555 0173",
      moveIn: "Jan 18",
      balance: "Paid",
      initials: "NA",
      color: "bg-[#8A79B8] text-white"
    },
    {
      name: "Kojo Mensah",
      details: "Level 200 · Law",
      room: "118",
      phone: "054 555 0121",
      moveIn: "Jan 15",
      balance: "GHS 5,200",
      initials: "KM",
      color: "bg-[#A84A1A] text-white"
    },
    {
      name: "Kobe Sarpong",
      details: "Level 400 · Pharmacy",
      room: "210",
      phone: "050 555 0166",
      moveIn: "Jan 9",
      balance: "Paid",
      initials: "KS",
      color: "bg-slate-500 text-white"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-6 lg:pb-12 bg-[#F0EFEA] h-full">
      {/* Header */}
      <div className="px-5 lg:px-8 pt-10 pb-6 sticky top-0 bg-[#F0EFEA]/90 backdrop-blur-md z-40 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-solid border-[#E5D0BA]/50 mb-6">
        <div>
           <h1 className="text-xl lg:text-2xl font-bold text-[#463C38]">Clients</h1>
           <p className="text-[13px] font-medium text-[#8C8279] mt-0.5">52 residents · 3 with balance due</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A29A91]" />
          <input 
            type="text" 
            placeholder="Search resident..." 
            className="w-full h-10 bg-white rounded-full pl-10 pr-4 text-[13px] font-semibold text-[#463C38] focus:outline-none focus:ring-2 focus:ring-[#A84A1A]/20 shadow-sm border border-transparent placeholder:text-[#A29A91]"
          />
        </div>
      </div>

      <div className="px-5 lg:px-8 w-full">
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
           <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#A29A91] tracking-widest uppercase border-b border-[#F0EFEA]">Resident</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#A29A91] tracking-widest uppercase border-b border-[#F0EFEA]">Room</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#A29A91] tracking-widest uppercase border-b border-[#F0EFEA]">Phone</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#A29A91] tracking-widest uppercase border-b border-[#F0EFEA]">Move-in</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#A29A91] tracking-widest uppercase border-b border-[#F0EFEA]">Balance</th>
                    <th className="px-6 py-4 border-b border-[#F0EFEA]"></th>
                 </tr>
              </thead>
              <tbody>
                 {clients.map((client, i) => (
                    <tr key={i} className="group hover:bg-[#F8F6F3]/50 transition-colors border-b border-[#F0EFEA] last:border-0">
                       <td className="px-6 py-4">
                          <div className="flex items-center space-x-3.5">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 ${client.color}`}>
                                {client.initials}
                             </div>
                             <div className="flex flex-col">
                                <span className="font-bold text-[#463C38] text-[14px] group-hover:text-[#A84A1A] transition-colors cursor-pointer">{client.name}</span>
                                <span className="text-[12px] font-medium text-[#8C8279] mt-0.5">{client.details}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className="text-[13px] font-medium text-[#463C38]">{client.room}</span>
                       </td>
                       <td className="px-6 py-4">
                          <span className="text-[13px] font-medium text-[#8C8279]">{client.phone}</span>
                       </td>
                       <td className="px-6 py-4">
                          <span className="text-[13px] font-medium text-[#8C8279]">{client.moveIn}</span>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`text-[13px] font-bold ${client.balance === 'Paid' ? 'text-emerald-600' : 'text-[#A84A1A]'}`}>
                             {client.balance}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button className="text-[#A29A91] hover:text-[#463C38] transition-colors p-1">
                             <MoreHorizontal className="w-5 h-5" />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Mobile List View */}
        <div className="lg:hidden space-y-4">
           {clients.map((client, i) => (
             <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex flex-col space-y-4">
               <div className="flex items-start justify-between">
                 <div className="flex items-center space-x-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${client.color}`}>
                     {client.initials}
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold text-[#463C38] text-[15px]">{client.name}</span>
                     <span className="text-[11px] font-bold text-[#A29A91] uppercase tracking-wider">{client.details}</span>
                   </div>
                 </div>
                 <div className="text-right">
                    <div className={`font-bold text-base ${client.balance === 'Paid' ? 'text-emerald-600' : 'text-[#A84A1A]'}`}>
                      {client.balance}
                    </div>
                    <div className="text-[12px] font-medium text-[#8C8279]">Room {client.room}</div>
                 </div>
               </div>
               
               <div className="border-t border-[#F0EFEA] pt-3 mt-1 flex justify-between items-center">
                  <div className="text-[12px] font-medium text-[#8C8279]">Move-in: {client.moveIn}</div>
                  <div className="text-[12px] font-medium text-[#8C8279]">{client.phone}</div>
               </div>

               {/* Mobile Actions */}
               <div className="flex space-x-2 pt-1">
                 <button className="flex-1 bg-[#F8F6F3] hover:bg-[#E5E0D8] text-[#5C4538] py-2.5 rounded-xl font-bold text-[13px] active:scale-95 transition-all">
                   Email
                 </button>
                 <button className="flex-1 bg-[#A84A1A] hover:bg-[#8F3E15] text-white py-2.5 rounded-xl font-bold text-[13px] active:scale-95 transition-all">
                   Call
                 </button>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
