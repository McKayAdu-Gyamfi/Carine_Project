import { Check, Bell, Navigation } from "lucide-react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function BookingConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state;
  
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const {
    hostelName,
    roomLabel,
    totalDue,
    paymentMethod,
    reference,
    moveIn,
    image
  } = state;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8F6F3] text-[#463C38] font-sans">
      
      {/* Top Gradient Area */}
      <div className="w-full bg-gradient-to-br from-[#3D261B] to-[#B85822] px-6 pt-16 pb-12 rounded-b-[40px] shadow-sm relative overflow-hidden flex flex-col items-center">
        {/* Decorative circle */}
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C56A30]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg relative z-10">
          <Check className="w-8 h-8 text-[#137333]" strokeWidth={3} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight relative z-10">Booking confirmed!</h1>
        <p className="text-white/90 font-medium relative z-10">You're all set for Spring 2026.</p>
      </div>

      <div className="flex-1 px-5 -mt-6 relative z-20 pb-32">
        {/* Booking Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E0D8] mb-6">
          <div className="flex items-center space-x-4 mb-5 pb-5 border-b border-[#E5E0D8]/60">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
              <img src={image} className="w-full h-full object-cover" alt="Selected Room" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#3D261B] text-lg leading-tight mb-1">{hostelName}</h3>
              <p className="text-[12px] font-medium text-[#8C8279] mb-2">{roomLabel}</p>
              <span className="bg-[#E6F4EA] text-[#137333] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center inline-flex space-x-1 w-fit">
                <span className="w-1 h-1 rounded-full bg-[#137333]" />
                <span>APPROVED</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <p className="text-[11px] font-medium text-[#8C8279] mb-0.5">Reference</p>
              <p className="font-extrabold text-[#463C38] text-[14px]">{reference}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#8C8279] mb-0.5">Move-in</p>
              <p className="font-extrabold text-[#463C38] text-[14px]">{moveIn}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#8C8279] mb-0.5">Paid</p>
              <p className="font-extrabold text-[#137333] text-[14px]">GHS {totalDue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#8C8279] mb-0.5">Method</p>
              <p className="font-extrabold text-[#463C38] text-[14px]">{paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-[#FDF6EF] border border-[#F5E5D5] rounded-2xl p-4 flex items-start space-x-3 text-[#B85822]">
          <Bell className="w-5 h-5 shrink-0 mt-0.5 opacity-80" />
          <p className="text-sm font-medium leading-snug">
            A receipt and move-in guide were sent to your email.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent p-5 pb-8 z-50 flex flex-col space-y-3">
         <button 
            onClick={() => navigate('/manage-bookings', { replace: true })}
            className="w-full bg-[#C56A30] active:bg-[#B85822] text-white font-extrabold py-4 rounded-full shadow-md flex justify-center items-center transition-all text-[15px]"
          >
            View my booking
          </button>
          <button 
            onClick={() => navigate('/', { replace: true })}
            className="w-full bg-white active:bg-gray-50 text-[#C56A30] border border-[#C56A30] font-extrabold py-4 rounded-full shadow-sm flex justify-center items-center transition-all text-[15px]"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Get directions
          </button>
      </div>

    </div>
  );
}
