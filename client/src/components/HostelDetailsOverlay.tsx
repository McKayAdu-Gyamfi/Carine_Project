import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Heart, 
  MapPin, 
  Star, 
  X, 
  Box, 
  Wifi, 
  WashingMachine, 
  Utensils, 
  AirVent, 
  ShieldCheck, 
  Bath, 
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBookings } from "@/contexts/BookingContext";

export interface HostelDetailsOverlayProps {
  selectedHostel: any;
  setSelectedHostel: (hostel: any) => void;
  savedHostels?: string[];
  onSave?: (e: React.MouseEvent, id: string) => void;
}

const AMENITY_LIST = [
  { label: "Unlimited WiFi", icon: Wifi },
  { label: "Laundry", icon: WashingMachine },
  { label: "Shared kitchen", icon: Utensils },
  { label: "24/7 Security", icon: ShieldCheck },
  { label: "Air-conditioned", icon: AirVent },
  { label: "Ensuite bathroom", icon: Bath },
];

export default function HostelDetailsOverlay({ 
  selectedHostel, 
  setSelectedHostel, 
  savedHostels = [], 
  onSave 
}: HostelDetailsOverlayProps) {
  const navigate = useNavigate();
  const [renderedHostel, setRenderedHostel] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const [selectedHeroImage, setSelectedHeroImage] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);
  const { bookings } = useBookings();

  // Smooth slide-up on open and slide-down on close
  useEffect(() => {
    if (selectedHostel) {
      setRenderedHostel(selectedHostel);
      setSelectedRoomIndex(0);
      setSelectedHeroImage(null);
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
      const timer = setTimeout(() => {
        setRenderedHostel(null);
        setSelectedHeroImage(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [selectedHostel]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedHeroImage(null);
      setSelectedHostel(null);
      setRenderedHostel(null);
    }, 400);
  };
  
  const hasActiveBooking = bookings.some(
    (b) => b.studentName === "Nana Osei" && (b.status === "Pending" || b.status === "Approved")
  );

  const roomTypes = [
    { 
      label: "Premium Studio", 
      sublabel: "1 person · ensuite", 
      price: renderedHostel ? Number(renderedHostel.startingPrice || 6500) + 2000 : 8500, 
      amenities: ["Air-Conditioned", "Ensuite bathroom", "Unlimited WiFi"] 
    },
    { 
      label: "Standard Single", 
      sublabel: "1 person · shared bath", 
      price: renderedHostel ? Number(renderedHostel.startingPrice || 6500) : 6500, 
      amenities: ["Fan cooled", "Shared bath", "Unlimited WiFi"] 
    },
    { 
      label: "2 in a room", 
      sublabel: "2 persons · shared bath", 
      price: renderedHostel ? Math.max(4500, Number(renderedHostel.startingPrice || 6500) - 1000) : 5500, 
      amenities: ["Shared room", "Shared bath", "Unlimited WiFi"] 
    },
  ];

  if (!renderedHostel) return null;

  const currentHeroImage = selectedHeroImage || renderedHostel.image;

  // Build full photo list for gallery
  const fullGallery: string[] = [
    renderedHostel.image,
    ...(renderedHostel.gallery || []),
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000"
  ].filter((v, i, a) => a.indexOf(v) === i); // deduplicate

  const thumbnails = fullGallery.slice(0, 3);
  const extraCount = Math.max(0, fullGallery.length - 3);

  const activeRoom = roomTypes[selectedRoomIndex] || roomTypes[0];

  const handleBookRoom = () => {
    if (hasActiveBooking) return;
    navigate('/payment-details', {
      state: {
        hostelName: renderedHostel.name,
        location: renderedHostel.location,
        image: currentHeroImage,
        roomLabel: `${activeRoom.label} · ${activeRoom.sublabel}`,
        price: activeRoom.price,
        serviceFee: 150,
        discount: 250,
        returnToHostel: renderedHostel.id,
        returnPath: window.location.pathname
      }
    });
  };

  const handleRoomTour = () => {
    navigate('/live-preview', {
      state: {
        returnToHostel: renderedHostel.id,
        returnPath: window.location.pathname,
        hostelName: renderedHostel.name,
        location: renderedHostel.location,
        image: currentHeroImage,
        roomLabel: activeRoom.label,
        price: activeRoom.price,
        amenities: activeRoom.amenities
      }
    });
  };

  const openDirections = () => {
    const query = encodeURIComponent(`${renderedHostel.name} ${renderedHostel.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <>
      {/* Dimmed Background */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />
      
      {/* Sliding Sheet */}
      <div 
        className={`fixed bottom-0 left-0 right-0 w-full h-[94vh] max-h-[96vh] z-[110] bg-[#FAF7F2] dark:bg-[#1A1614] text-[#463C38] dark:text-[#EAE3DC] rounded-t-[32px] md:rounded-t-[40px] shadow-2xl flex flex-col overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] border-t border-black/5 ${
          isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        {/* Scrollable Container with consistent, focused width */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5">
            
            {/* Top Navigation & Breadcrumbs */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={handleClose}
                className="flex items-center space-x-1.5 text-sm font-bold text-[#C56A30] hover:text-[#A84A1A] transition-colors cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Explore</span>
                <span className="text-[#8C8279] dark:text-muted-foreground font-normal">/</span>
                <span className="text-[#3D261B] dark:text-white font-bold">{renderedHostel.name}</span>
              </button>

              <button 
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 border border-[#E5E0D8] dark:border-border/40 flex items-center justify-center text-[#5C534E] dark:text-white shadow-sm transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Main Hero Image (16:9 Banner) */}
            <div className="relative w-full aspect-[16/9] max-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#E5E0D8] dark:border-border/40 bg-muted/40 mb-3 group">
              <img 
                src={currentHeroImage} 
                alt={renderedHostel.name} 
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Top-Left Availability Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/95 dark:bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-extrabold text-[#137333] shadow-sm flex items-center space-x-1.5 border border-white/40">
                  <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse" />
                  <span>{renderedHostel.availability || "AVAILABLE"}</span>
                </span>
              </div>

              {/* Top-Right Heart / Save Button */}
              {onSave && (
                <button 
                  onClick={(e) => onSave(e, renderedHostel.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md border border-white/40 flex items-center justify-center text-[#463C38] dark:text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
                >
                  <Heart className={`w-5 h-5 ${savedHostels.includes(renderedHostel.id) ? 'fill-[#C56A30] text-[#C56A30]' : 'text-[#463C38] dark:text-white'}`} />
                </button>
              )}

              {/* Bottom Caption */}
              <div className="absolute bottom-3 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-wider uppercase pointer-events-none">
                Hostel Exterior — 16:9
              </div>
            </div>

            {/* 2. Gallery Row (3 Thumbnails + "+N" Box) */}
            <div className="grid grid-cols-4 gap-3 sm:gap-3.5 mb-7">
              {thumbnails.map((img, idx) => {
                const isSelected = currentHeroImage === img;
                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedHeroImage(img)}
                    className={`relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shadow-sm ${
                      isSelected 
                        ? 'border-[#C56A30] ring-2 ring-[#C56A30]/30 scale-[1.01]' 
                        : 'border-[#E5E0D8] dark:border-border/40 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt={`Gallery thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                );
              })}

              {/* +N Remaining Photos Box */}
              <div 
                onClick={() => {
                  setGalleryActiveIndex(0);
                  setIsGalleryOpen(true);
                }}
                className="aspect-[4/3] rounded-xl sm:rounded-2xl bg-[#3D261B] hover:bg-[#523425] text-white flex flex-col items-center justify-center cursor-pointer transition-colors shadow-sm select-none group"
              >
                <span className="text-lg sm:text-2xl font-extrabold group-hover:scale-105 transition-transform">
                  +{extraCount > 0 ? extraCount : 6}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">Photos</span>
              </div>
            </div>

            {/* 3. Main Content Split: Left Details & Right Booking Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start pb-12">
              
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Title & Rating */}
                <div>
                  <div className="flex items-center space-x-3 mb-1.5 flex-wrap gap-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D261B] dark:text-white tracking-tight">
                      {renderedHostel.name}
                    </h1>
                    <div className="bg-[#FDF6EF] dark:bg-[#3D261B]/50 border border-[#F5E5D5] dark:border-[#C56A30]/30 text-[#C56A30] px-2.5 py-0.5 rounded-lg text-xs font-extrabold flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-[#C56A30] text-[#C56A30]" />
                      <span>{renderedHostel.rating ? renderedHostel.rating.toFixed(1) : "4.8"}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm font-medium text-[#7A6F68] dark:text-[#A89E96] space-x-1.5">
                    <MapPin className="w-4 h-4 text-[#C56A30] shrink-0" />
                    <span>{renderedHostel.location}</span>
                    <span>·</span>
                    <span className="text-[#C56A30] font-bold">
                      {renderedHostel.distance || "1.2 km"} from campus
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-[17px] font-extrabold text-[#3D261B] dark:text-white mb-2">Description</h3>
                  <p className="text-[#5C534E] dark:text-[#B5AAA2] text-[14px] leading-relaxed">
                    {renderedHostel.desc || "Experience the layout and natural lighting of your future home. This premium hostel offers a combination of aesthetics and state-of-the-art facilities including max security, 24/7 water supply, and unlimited WiFi."}
                  </p>
                </div>

                {/* What this place offers */}
                <div>
                  <h3 className="text-[17px] font-extrabold text-[#3D261B] dark:text-white mb-3.5">What this place offers</h3>
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-6">
                    {AMENITY_LIST.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-[#EFE9DD] dark:bg-white/5 flex items-center justify-center text-[#C56A30] shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] font-semibold text-[#463C38] dark:text-[#D5CDC6]">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Map Preview Box */}
                <div>
                  <div 
                    onClick={openDirections}
                    className="w-full h-36 sm:h-40 rounded-2xl border border-[#E5E0D8] dark:border-border/40 bg-gradient-to-br from-[#EAE2D5] via-[#E4D9C8] to-[#D5C7B5] dark:from-[#2B231F] dark:to-[#1C1816] relative overflow-hidden flex items-center justify-center cursor-pointer shadow-sm group"
                  >
                    {/* Map Decorative Grid Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-[#8C8279]" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="map-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
                        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#map-pattern)" />
                    </svg>

                    {/* Centered Map Pill */}
                    <div className="relative z-10 bg-white/95 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[#3D261B] dark:text-white shadow-md flex items-center space-x-2 border border-white/50 group-hover:scale-105 transition-transform">
                      <MapPin className="w-3.5 h-3.5 text-[#C56A30]" />
                      <span>MAP — {renderedHostel.location?.split(',')[1]?.trim().toUpperCase() || 'BEREKUSO'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Pricing & Booking Card (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-white dark:bg-[#231E1B] border border-[#E5E0D8] dark:border-border/40 rounded-3xl p-6 shadow-sm lg:sticky lg:top-6">
                  
                  {/* Starts From Header */}
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#8C8279]">STARTS FROM</p>
                    <div className="flex items-baseline space-x-1.5 mt-0.5">
                      <span className="text-3xl font-extrabold text-[#3D261B] dark:text-white tracking-tight">
                        GHS {Number(renderedHostel.startingPrice || 6500).toLocaleString()}
                      </span>
                      <span className="text-sm font-semibold text-[#8C8279]">/semester</span>
                    </div>
                  </div>

                  {/* Choose a Room */}
                  <div className="mt-6">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#8C8279] mb-3">CHOOSE A ROOM</p>
                    <div className="space-y-2.5">
                      {roomTypes.map((type, idx) => {
                        const isSelected = selectedRoomIndex === idx;
                        return (
                          <div 
                            key={idx}
                            onClick={() => setSelectedRoomIndex(idx)}
                            className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                              isSelected 
                                ? 'border-2 border-[#C56A30] bg-[#FDF8F5] dark:bg-[#C56A30]/10 shadow-sm' 
                                : 'border border-[#E5E0D8] dark:border-border/40 bg-white dark:bg-transparent hover:border-[#C56A30]/40'
                            }`}
                          >
                            <div>
                              <h4 className="font-extrabold text-[#3D261B] dark:text-white text-[15px] leading-tight">
                                {type.label}
                              </h4>
                              <p className="text-[12px] font-medium text-[#8C8279] mt-0.5">
                                {type.sublabel}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-extrabold text-[#3D261B] dark:text-white text-[15px]">
                                GHS {type.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-2.5">
                    
                    {/* Primary Button: Book this room */}
                    <button 
                      onClick={handleBookRoom}
                      disabled={hasActiveBooking}
                      className={`w-full py-4 rounded-full font-extrabold flex justify-center items-center transition-all text-[15px] cursor-pointer shadow-md ${
                        hasActiveBooking 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60' 
                          : 'bg-[#A84A1A] hover:bg-[#8F3E15] active:bg-[#7D3410] text-white shadow-[#A84A1A]/20'
                      }`}
                    >
                      {hasActiveBooking ? "Active booking in progress" : "Book this room"}
                    </button>

                    {/* Secondary Button: 3D Room Tour (Below Book this room) */}
                    <button 
                      onClick={handleRoomTour}
                      className="w-full py-3.5 rounded-full font-extrabold flex justify-center items-center space-x-2 transition-all text-[14px] cursor-pointer border border-[#3D261B]/80 dark:border-white/30 text-[#3D261B] dark:text-white hover:bg-[#3D261B]/5 dark:hover:bg-white/5"
                    >
                      <Box className="w-4 h-4 text-[#C56A30]" />
                      <span>3D room tour</span>
                    </button>

                  </div>

                  {/* Subtext */}
                  <p className="text-center text-[11px] font-medium text-[#8C8279] mt-3.5">
                    Free cancellation before move-in
                  </p>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Full Photo Lightbox Gallery Modal */}
      {isGalleryOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex flex-col justify-between items-center p-6 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsGalleryOpen(false)}
        >
          {/* Lightbox Header */}
          <div className="w-full flex items-center justify-between text-white z-10 max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="font-bold text-sm">
              Photo {galleryActiveIndex + 1} of {fullGallery.length} · {renderedHostel.name}
            </div>
            <button 
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              onClick={() => setIsGalleryOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Main Large Image with Next / Prev */}
          <div className="relative flex items-center justify-center w-full max-w-4xl flex-1 my-4" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setGalleryActiveIndex((prev) => (prev > 0 ? prev - 1 : fullGallery.length - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all z-20 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img 
              src={fullGallery[galleryActiveIndex]} 
              alt={`Photo ${galleryActiveIndex + 1}`} 
              className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl"
            />

            <button 
              onClick={() => setGalleryActiveIndex((prev) => (prev < fullGallery.length - 1 ? prev + 1 : 0))}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all z-20 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar max-w-4xl py-2 px-4 bg-black/40 rounded-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            {fullGallery.map((img, idx) => (
              <img 
                key={idx}
                src={img}
                alt={`Thumb ${idx + 1}`}
                onClick={() => setGalleryActiveIndex(idx)}
                className={`w-16 h-12 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                  galleryActiveIndex === idx ? 'border-[#C56A30] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
