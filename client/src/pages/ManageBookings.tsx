import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function ManageBookings() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  
  // Toggle this to see the empty state from Image 2
  const isEmpty = false;

  const bookings = [
    {
      id: 1,
      status: "CONFIRMED",
      ref: "KC-4B29X",
      hostelName: "Dufie Annex",
      roomDetails: "Premium Studio · Rm 402B · ensuite",
      moveIn: "Jan 12, 2026",
      semester: "Spring 2026",
      amountPaid: "GHS 8,400",
      amountDue: null,
      expiresIn: null
    },
    {
      id: 2,
      status: "PAYMENT DUE",
      ref: "KC-7J14M",
      hostelName: "Legon Heights",
      roomDetails: "Shared Twin · Rm 118 · shared bath",
      moveIn: "Jan 15, 2026",
      semester: "Spring 2026",
      amountPaid: null,
      amountDue: "GHS 5,200",
      expiresIn: "Hold expires in 46h"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F0EFEA] font-sans pb-12">
      {/* Header Container */}
      <div className="px-6 lg:px-10 pt-10 pb-6 w-full mx-auto flex flex-col h-full">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#463C38]">My bookings</h1>
          <Link 
            to="/explore"
            className="flex items-center space-x-2 bg-[#A84A1A] hover:bg-[#8F3E15] text-white px-5 py-2.5 rounded-full font-bold text-[14px] shadow-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Find a room</span>
          </Link>
        </div>

        {isEmpty ? (
          /* Empty State (Image 2) */
          <div className="flex-1 flex flex-col items-center justify-center mt-20 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#F1E8DC] flex items-center justify-center text-[#A84A1A] mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-[22px] font-bold text-[#463C38] mb-3">No bookings yet</h2>
            <p className="text-[14px] font-medium text-[#8C8279] mb-8 leading-relaxed">
              When you reserve a room it'll show up here with your move-in details, reference, and directions.
            </p>
            <Link 
              to="/explore"
              className="flex items-center space-x-2 bg-[#A84A1A] hover:bg-[#8F3E15] text-white px-6 py-3 rounded-full font-bold text-[14px] shadow-sm transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Explore hostels</span>
            </Link>
          </div>
        ) : (
          /* Populated State (Image 1) */
          <>
            {/* Tabs */}
            <div className="flex space-x-8 border-b border-[#E5E0D8] mb-6">
              {[
                { name: "Upcoming", count: 2 },
                { name: "Past", count: 3 },
                { name: "Cancelled", count: 1 }
              ].map(tab => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`pb-3 text-[15px] font-bold transition-colors relative flex items-center space-x-1 ${
                    activeTab === tab.name ? 'text-[#A84A1A]' : 'text-[#A29A91] hover:text-[#8C8279]'
                  }`}
                >
                  <span>{tab.name}</span>
                  <span>{tab.count}</span>
                  {activeTab === tab.name && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#A84A1A] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Bookings List */}
            <div className="space-y-5">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl shadow-sm p-4 flex flex-col md:flex-row gap-5 relative">
                  
                  {/* Thumbnail Placeholder */}
                  <div className="w-full md:w-[240px] h-[160px] md:h-auto rounded-xl shrink-0 relative overflow-hidden bg-[repeating-linear-gradient(45deg,#E5D0BA,#E5D0BA_15px,#F1E8DC_15px,#F1E8DC_30px)] flex items-center justify-center border border-[#E5D0BA]/50">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest text-[#8C8279] shadow-sm">
                      HOSTEL
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="flex-1 py-1 flex flex-col justify-between">
                    <div>
                      {/* Status & Ref */}
                      <div className="flex items-center space-x-3 mb-2">
                        {booking.status === "CONFIRMED" ? (
                          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest">
                            {booking.status}
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                            {booking.status}
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-[#A29A91]">Ref <span className="text-[#8C8279]">{booking.ref}</span></span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-[#463C38] mb-0.5">{booking.hostelName}</h2>
                      <p className="text-[13px] font-medium text-[#8C8279] mb-5">{booking.roomDetails}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex items-start space-x-8">
                      <div>
                        <p className="text-[10px] font-extrabold text-[#A29A91] tracking-widest uppercase mb-1">Move-in</p>
                        <p className="text-[13px] font-bold text-[#463C38]">{booking.moveIn}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-[#A29A91] tracking-widest uppercase mb-1">Semester</p>
                        <p className="text-[13px] font-bold text-[#463C38]">{booking.semester}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-[#A29A91] tracking-widest uppercase mb-1">{booking.amountPaid ? 'Paid' : 'Due'}</p>
                        <p className={`text-[13px] font-bold ${booking.amountPaid ? 'text-emerald-600' : 'text-[#A84A1A]'}`}>
                          {booking.amountPaid || booking.amountDue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="w-full md:w-[180px] shrink-0 border-t md:border-t-0 md:border-l border-[#F0EFEA] pt-4 md:pt-0 md:pl-5 flex flex-col justify-center space-y-3">
                    {booking.status === "CONFIRMED" ? (
                      <>
                        <button className="w-full bg-[#A84A1A] hover:bg-[#8F3E15] text-white py-2.5 rounded-full font-bold text-[13px] transition-colors shadow-sm">
                          View booking
                        </button>
                        <button className="w-full bg-white border border-[#C8B09A] text-[#A84A1A] hover:bg-[#F8F6F3] py-2.5 rounded-full font-bold text-[13px] transition-colors flex items-center justify-center space-x-1.5">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                          <span>Directions</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="w-full bg-[#A84A1A] hover:bg-[#8F3E15] text-white py-2.5 rounded-full font-bold text-[13px] transition-colors shadow-sm">
                          Complete payment
                        </button>
                        <button className="w-full bg-white border border-[#C8B09A] text-[#A84A1A] hover:bg-[#F8F6F3] py-2.5 rounded-full font-bold text-[13px] transition-colors">
                          View details
                        </button>
                        {booking.expiresIn && (
                          <p className="text-[10px] font-medium text-[#A29A91] text-center mt-1">
                            {booking.expiresIn}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

