import { ArrowLeft, CheckCircle2, ChevronRight, Copy, Landmark, Smartphone, MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useBookings } from "@/contexts/BookingContext";

export default function PaymentDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedMomo, setCopiedMomo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const summary = location.state || {
    hostelName: "Dufie Annex",
    location: "Berekuso",
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=400&h=400",
    roomLabel: "2 in a room",
    price: 7000,
    returnPath: null,
    returnToHostel: null
  };

  // Mock available rooms for demo purposes
  const availableRoomNumbers = ["Room 101", "Room 102", "Room 205", "Room 304A"];

  const handleBack = () => {
    navigate(-1);
  };

  const copyToClipboard = (text: string, type: 'bank' | 'momo') => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else {
      setCopiedMomo(true);
      setTimeout(() => setCopiedMomo(false), 2000);
    }
  };

  const handleProcessPayment = () => {
    if (!selectedRoomNumber) return;
    setIsProcessing(true);
    
    // Simulate network delay
    setTimeout(() => {
      // 1. Add booking to global context
      addBooking({
        studentName: "Nana Osei", // Mock current user
        hostelName: summary.hostelName,
        roomLabel: summary.roomLabel,
        roomNumber: selectedRoomNumber,
        price: summary.price,
        image: summary.image,
        location: summary.location
      });

      // 2. Navigate straight back to Manage Bookings with success state
      navigate('/manage-bookings', { 
        state: { newBookingSuccess: true },
        replace: true 
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 transition-colors">
      <header className="px-6 py-6 sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
          <button onClick={handleBack} className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border text-foreground shadow-sm hover:bg-muted transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Manual Payment</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-8">
        
        {/* Payment Warning Badge */}
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 px-4 py-3 rounded-2xl flex items-start space-x-3 mb-8">
          <InfoIcon className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold mb-1">Make payment explicitly to the details provided below.</p>
            <p className="text-xs font-medium opacity-90">Hostel management will manually verify your transfer and approve your room request. Do not pay anyone outside of these official details.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8">
          
          <div className="space-y-8">
            
            {/* 1. Room Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight flex items-center">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-2">1</span>
                Select Room Number
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {availableRoomNumbers.map((r) => (
                  <button 
                    key={r}
                    onClick={() => setSelectedRoomNumber(r)}
                    className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all focus:outline-none ${selectedRoomNumber === r ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-border/50 bg-card hover:border-primary/40'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-border/50 w-full" />

            {/* 2. Manager Payment Details */}
            <div className="space-y-4">
               <h2 className="text-xl font-bold tracking-tight flex items-center">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-2">2</span>
                Make Transfer
               </h2>

               <div className="grid grid-cols-1 gap-5">
                 {/* MoMo Card */}
                 <Card className="bg-card border border-border/80 rounded-[28px] p-6 shadow-sm relative overflow-hidden group">
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                         <Smartphone className="w-5 h-5" />
                       </div>
                       <div>
                         <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest">Mobile Money</h3>
                         <p className="font-bold text-lg mt-0.5">MTN Mobile Money</p>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <div>
                       <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Account Number</p>
                       <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl">
                          <p className="font-mono font-bold text-lg">054 123 4567</p>
                          <button onClick={() => copyToClipboard('0541234567', 'momo')} className="p-2 bg-background border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer">
                            {copiedMomo ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                       </div>
                     </div>
                     <div>
                       <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Account Name</p>
                       <p className="font-bold">{summary.hostelName} Mgt</p>
                     </div>
                   </div>
                 </Card>

                 {/* Bank Card */}
                 <Card className="bg-card border border-border/80 rounded-[28px] p-6 shadow-sm relative overflow-hidden group">
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                         <Landmark className="w-5 h-5" />
                       </div>
                       <div>
                         <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest">Bank Transfer</h3>
                         <p className="font-bold text-lg mt-0.5">Ecobank Ghana</p>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <div>
                       <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Account Number</p>
                       <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl">
                          <p className="font-mono font-bold text-lg">1441 5000 0000</p>
                          <button onClick={() => copyToClipboard('144150000000', 'bank')} className="p-2 bg-background border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer">
                            {copiedBank ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                       </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Account Name</p>
                         <p className="font-bold">{summary.hostelName}</p>
                       </div>
                       <div>
                         <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Branch</p>
                         <p className="font-bold">Legon Branch</p>
                       </div>
                     </div>
                   </div>
                 </Card>
               </div>
            </div>

          </div>

          <div className="space-y-6">
              <Card className="bg-card border border-border/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-3xl p-6 sticky top-28 transition-colors">
                
                <h3 className="font-bold text-foreground text-sm uppercase tracking-widest text-muted-foreground mb-4">Confirm Payment</h3>

                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm border border-border/50">
                    <img src={summary.image} className="w-full h-full object-cover" alt="Selected Room" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary transition-colors border-none text-[9px] px-2 py-0.5 tracking-wider uppercase font-bold self-start mb-1">{summary.roomLabel}</Badge>
                    <h3 className="font-bold text-foreground text-sm tracking-tight">{summary.hostelName}</h3>
                    <p className="text-[11px] font-semibold text-muted-foreground flex items-center mt-0.5"><MapPin className="w-3 h-3 mr-1 opacity-70" /> {summary.location}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center bg-muted/40 p-5 rounded-2xl border border-border/50 mb-6">
                   <span className="font-bold text-foreground uppercase tracking-widest text-[10px] block text-left mb-2 opacity-70">Amount Expected</span>
                   <span className="font-extrabold text-primary text-3xl tracking-tight leading-none">GHS {summary.price.toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleProcessPayment}
                  disabled={!selectedRoomNumber || isProcessing}
                  className={`w-full font-bold py-5 rounded-2xl flex justify-center items-center transition-all text-[15px] ${
                    !selectedRoomNumber
                      ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
                      : isProcessing
                      ? 'bg-primary/70 text-primary-foreground cursor-wait'
                      : 'bg-primary text-primary-foreground shadow-[0_8px_25px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                   {isProcessing ? "Processing..." : selectedRoomNumber ? "I Have Made Payment" : "Select Room First"}
                </button>
              </Card>
          </div>

        </div>
      </main>
    </div>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
