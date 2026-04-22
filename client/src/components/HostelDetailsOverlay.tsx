import { ChevronLeft, Heart, MapPin, Send, Star, X, Box, Wifi, WashingMachine, ChefHat, Dumbbell, AirVent, ShieldCheck, Droplets } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookings } from "@/contexts/BookingContext";

export interface HostelDetailsOverlayProps {
  selectedHostel: any;
  setSelectedHostel: (hostel: any) => void;
  savedHostels?: string[];
  onSave?: (e: React.MouseEvent, id: string) => void;
}

const AMENITY_ICONS: Record<string, any> = {
  "WiFi": Wifi,
  "Laundry": WashingMachine,
  "Kitchen Shared": ChefHat,
  "Kitchen Personal": ChefHat,
  "Gym": Dumbbell,
  "AC": AirVent,
  "Security": ShieldCheck,
  "Water": Droplets,
};

export default function HostelDetailsOverlay({ selectedHostel, setSelectedHostel, savedHostels = [], onSave }: HostelDetailsOverlayProps) {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { bookings } = useBookings();
  
  const hasActiveBooking = bookings.some((b) => b.studentName === "Nana Osei" && (b.status === "Pending" || b.status === "Approved"));

  const roomTypes = [
    { label: "1 in a room", value: 1, priceOffset: 2000, amenities: ["Air-Conditioned", "WiFi"] },
    { label: "2 in a room", value: 2, priceOffset: 1000, amenities: ["Air-Conditioned", "WiFi"] },
    { label: "4 in a room", value: 4, priceOffset: 0, amenities: ["WiFi"] },
  ];

  return (
    <>
      {/* Dimmed Background */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm transition-opacity duration-300 ${selectedHostel ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSelectedHostel(null)}
      />
      
      {/* Sliding Sheet */}
      <div 
        className={`fixed bottom-0 left-0 w-full h-[92vh] z-[110] bg-background rounded-t-[40px] flex flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${selectedHostel ? "translate-y-0" : "translate-y-full"}`}
      >
        {selectedHostel && (
          <>
            {/* Header / Hero Image */}
            <div className="relative h-64 shrink-0 bg-muted/50">
              <img src={selectedHostel.image} loading="lazy" className="w-full h-full object-cover transition-opacity duration-300" alt="Property Header" />
              
              {/* Back Button */}
              <button 
                onClick={() => setSelectedHostel(null)}
                className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 transition-colors"
               >
                 <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Heart/Save Button */}
              {onSave && (
                <button 
                  onClick={(e) => onSave(e, selectedHostel.id)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${savedHostels.includes(selectedHostel.id) ? 'fill-white text-white' : 'text-white'}`} />
                </button>
              )}

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-28 z-20 relative -mt-16 pt-2">
              
              {/* Title Card Overlay-like visual */}
              <div className="bg-card w-full rounded-[32px] p-6 shadow-xl border border-border mb-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">{selectedHostel.name}</h2>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedHostel.name} ${selectedHostel.location}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground text-sm font-medium hover:text-primary transition-colors cursor-pointer group"
                    >
                      <MapPin className="w-4 h-4 mr-1 opacity-70 group-hover:opacity-100" />
                      <span className="underline decoration-dotted underline-offset-2">{selectedHostel.location}</span>
                    </a>
                  </div>
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    <Send className="w-5 h-5" />
                    <span className="text-[9px] font-bold mt-0.5">{selectedHostel.distance}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-1 bg-yellow-400/20 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                    <span className="text-sm font-bold text-yellow-700">{selectedHostel.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              {selectedHostel.gallery && selectedHostel.gallery.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">Gallery</h3>
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 px-1">
                    {selectedHostel.gallery.map((img: string, idx: number) => (
                      <img 
                        key={idx} 
                        src={img} 
                        loading="lazy"
                        onClick={() => setActiveImage(img)}
                        className="w-20 h-20 rounded-2xl object-cover border border-border shrink-0 shadow-sm cursor-pointer transition-all hover:opacity-80" 
                        alt="Gallery item" 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Description Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedHostel.desc}
                </p>
              </div>

              {/* Amenities Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">What this place offers</h3>
                <div className="grid grid-cols-2 gap-y-4">
                  {(selectedHostel.amenities || []).map((amenity: string) => {
                    const Icon = AMENITY_ICONS[amenity] || Box;
                    return (
                      <div key={amenity} className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-primary/10 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{amenity}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Security</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                      <Droplets className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Water Supply</span>
                  </div>
                </div>
              </div>

              {/* Room Types Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Room Types</h3>
                <div className="space-y-3">
                  {roomTypes.map((type) => (
                    <div 
                      key={type.value} 
                      className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-accent/50 ${
                        selectedRoom === type.value 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border/50 bg-card hover:border-primary/30'
                      }`}
                      onClick={() => setSelectedRoom(type.value)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedRoom === type.value ? 'border-primary' : 'border-muted-foreground/30'}`}>
                            {selectedRoom === type.value && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                          <span className="font-bold text-[15px]">{type.label}</span>
                        </div>
                        <span className="font-bold text-primary">
                          GHS {Number(selectedHostel.startingPrice) + type.priceOffset}
                        </span>
                      </div>
                      
                      {/* Expanded Section for Selected Room */}
                      {selectedRoom === type.value && (
                        <div className="mt-4 pt-4 border-t border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300 flex items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-2">
                            {type.amenities.map((amenity, idx) => (
                              <span 
                                key={`${amenity}-${idx}`} 
                                className="px-3 py-1 rounded-full border border-border text-[10px] font-bold text-foreground bg-accent/30 whitespace-nowrap"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                          
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const activeRoomObj = roomTypes.find(t => t.value === selectedRoom) || roomTypes[1];
                              const finalPrice = Number(selectedHostel.startingPrice) + activeRoomObj.priceOffset;
                              navigate('/live-preview', { 
                                state: { 
                                  returnToHostel: selectedHostel.id, 
                                  returnPath: window.location.pathname,
                                  hostelName: selectedHostel.name,
                                  location: selectedHostel.location,
                                  image: selectedHostel.image,
                                  roomLabel: activeRoomObj.label,
                                  price: finalPrice,
                                  amenities: activeRoomObj.amenities
                                } 
                              });
                            }}
                            className="shrink-0 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 border border-primary/20"
                          >
                            <Box className="w-3.5 h-3.5" />
                            <span>Preview 360°</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 bg-background border-t border-border shrink-0 z-30 pb-8">
              <button 
                disabled={!selectedRoom || hasActiveBooking}
                onClick={() => {
                  if (!selectedRoom || hasActiveBooking) return;
                  const activeRoomObj = roomTypes.find(t => t.value === selectedRoom) || roomTypes[1];
                  const finalPrice = Number(selectedHostel.startingPrice) + activeRoomObj.priceOffset;
                  navigate('/booking', { 
                    state: { 
                       hostelName: selectedHostel.name,
                       location: selectedHostel.location,
                       image: selectedHostel.image,
                       roomLabel: activeRoomObj.label,
                       price: finalPrice,
                       returnToHostel: selectedHostel.id,
                       returnPath: window.location.pathname
                    } 
                  });
                }}
                className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center transition-all text-lg ${
                  hasActiveBooking
                    ? 'bg-red-500/10 text-red-500 opacity-90 cursor-not-allowed border border-red-500/20'
                    : selectedRoom 
                    ? 'bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
                }`}
              >
                {hasActiveBooking 
                   ? "You already have an active booking" 
                   : selectedRoom ? "Book Now" : "Select a room to proceed"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Full screen Image Preview Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex flex-col justify-center items-center backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={() => setActiveImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={activeImage} 
            alt="Preview" 
            className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
