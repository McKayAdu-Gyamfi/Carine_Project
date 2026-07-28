import { Wifi, Wind, ShieldCheck, WashingMachine, Utensils, BookOpen, Plus, Pencil } from "lucide-react";

export default function ManagerProperties() {
  const pricing = [
    { type: "Premium Studio", details: "ensuite · 12 rooms", price: "8,400" },
    { type: "Single Room", details: "shared bath · 20 rooms", price: "7,000" },
    { type: "Shared Twin", details: "shared bath · 14 rooms", price: "5,200" }
  ];

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#F0EFEA] pb-20">
      {/* Header */}
      <div className="px-5 lg:px-8 pt-10 pb-6 sticky top-0 bg-[#F0EFEA]/90 backdrop-blur-md z-40 flex items-center justify-between gap-4 border-b border-solid border-[#E5D0BA]/50 mb-6">
        <h1 className="text-xl lg:text-[22px] font-bold text-[#463C38]">Manage hostel</h1>
        <button className="bg-[#A84A1A] hover:bg-[#8F3E15] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-colors cursor-pointer shrink-0">
          Save changes
        </button>
      </div>

      <div className="px-5 lg:px-8 space-y-4 max-w-4xl">
        
        {/* Cover Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm flex flex-col sm:flex-row gap-5">
          <div className="w-full sm:w-[200px] h-32 rounded-xl bg-[#E5D0BA] flex items-center justify-center relative shrink-0 overflow-hidden">
             <div className="absolute inset-0 pattern-diagonal-lines pattern-[#C8B09A] pattern-bg-transparent pattern-size-4 pattern-opacity-40" />
             <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest text-[#5C4538] relative z-10">COVER</span>
          </div>
          <div className="flex flex-col justify-center">
             <h2 className="text-[20px] font-bold text-[#463C38] mb-1">Dufie Annex</h2>
             <p className="text-[13px] font-medium text-[#8C8279] mb-4">Berekuso, Eastern Region · 60 beds</p>
             <button className="flex items-center space-x-2 border border-[#E5E0D8] px-4 py-2 rounded-full text-[13px] font-bold text-[#5C4538] hover:bg-[#F8F6F3] w-fit transition-colors">
               <Pencil className="w-3.5 h-3.5" />
               <span>Edit photos & details</span>
             </button>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base font-bold text-[#463C38] mb-1">Pricing per semester</h3>
            <p className="text-[13px] font-medium text-[#8C8279]">Set the price for each room type. Applies to new bookings.</p>
          </div>
          
          <div className="space-y-0">
            {pricing.map((room, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-[#F0EFEA] last:border-0">
                <div className="flex flex-col">
                  <span className="font-bold text-[#463C38] text-[14px]">{room.type}</span>
                  <span className="text-[12px] font-medium text-[#8C8279] mt-0.5">{room.details}</span>
                </div>
                <div className="flex items-center space-x-3">
                   <span className="bg-[#F8F6F3] px-3 py-1.5 rounded-lg text-[13px] font-bold text-[#8C8279]">GHS</span>
                   <span className="font-bold text-[#463C38] text-[16px] w-[60px] text-right">{room.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base font-bold text-[#463C38] mb-1">Amenities</h3>
            <p className="text-[13px] font-medium text-[#8C8279]">Tap to include. These show on your listing.</p>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Wi-Fi", icon: Wifi, active: true },
              { label: "Air-con", icon: Wind, active: true },
              { label: "24/7 security", icon: ShieldCheck, active: true },
              { label: "Laundry", icon: WashingMachine, active: true },
              { label: "Kitchen", icon: Utensils, active: false },
              { label: "Study desk", icon: BookOpen, active: false }
            ].map((amenity, i) => (
              <button 
                key={i}
                className={`flex items-center space-x-2 border px-4 py-2 rounded-full font-bold text-[13px] transition-colors cursor-pointer ${
                  amenity.active 
                    ? 'border-[#C8B09A] text-[#A84A1A] bg-transparent hover:bg-[#F1E8DC]/30' 
                    : 'border-transparent text-[#8C8279] bg-[#F8F6F3] hover:bg-[#E5E0D8]'
                }`}
              >
                <amenity.icon className="w-4 h-4" />
                <span>{amenity.label}</span>
                {amenity.active && <span className="ml-1.5 w-1 h-2 rounded-[2px] bg-[#A84A1A] rotate-45 transform -translate-y-0.5" />}
              </button>
            ))}
            <button className="flex items-center space-x-1.5 border border-dashed border-[#C8B09A] text-[#A84A1A] px-4 py-2 rounded-full font-bold text-[13px] hover:bg-[#F1E8DC]/50 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add custom</span>
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">
          <h3 className="text-base font-bold text-[#463C38]">Rooms</h3>
          <button className="flex items-center space-x-1.5 border border-[#E5E0D8] px-4 py-2 rounded-full text-[13px] font-bold text-[#A84A1A] hover:bg-[#F8F6F3] transition-colors cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Add room</span>
          </button>
        </div>

      </div>
    </div>
  );
}
