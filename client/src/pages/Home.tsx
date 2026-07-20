import { Star, Search, Bell } from "lucide-react";
// import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import TopNav from "@/components/TopNav";
import FilterModal from "@/components/FilterModal";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import HostelCard from "@/components/HostelCard";
import HostelDetailsOverlay from "@/components/HostelDetailsOverlay";
import { useState, useEffect } from "react";
import { MOST_POPULAR, NEARBY_PLACES, ALL_HOSTELS } from "../data/hostels";
import { useToast } from "@/components/ui/toaster";

const getBadgeStyle = (availability: string) => {
  switch (availability?.toUpperCase()) {
    case 'AVAILABLE': return { bg: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500 animate-pulse' };
    case 'FULL': return { bg: 'bg-destructive/20 text-destructive dark:text-red-400', dot: 'bg-destructive' };
    default: return { bg: 'bg-amber-500/20 text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' };
  }
};

export default function Home() {
  const { toast } = useToast();
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedHostel, setSelectedHostel] = useState<any>(() => {
    return location.state?.restoreHostel ? ALL_HOSTELS.find(h => h.id === location.state.restoreHostel) || null : null;
  });
  const [savedHostels, setSavedHostels] = useState<string[]>(() => {
    const saved = localStorage.getItem("saved_hostels");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (location.state?.restoreHostel) {
      const hostel = ALL_HOSTELS.find(h => h.id === location.state.restoreHostel);
      if (hostel) setSelectedHostel(hostel);
    }
  }, [location.state]);

  const handleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    let newSaved;
    if (savedHostels.includes(id)) {
      newSaved = savedHostels.filter(h => h !== id);
      toast("Removed from favorites", "info");
    } else {
      newSaved = [...savedHostels, id];
      toast("Added to favorites", "success");
    }
    setSavedHostels(newSaved);
    localStorage.setItem("saved_hostels", JSON.stringify(newSaved));
  };

  const carouselImages = ALL_HOSTELS.map(h => h.image);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-6 transition-colors">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden">
        <TopNav rightAction={<div className="hidden sm:block"><NotificationsDropdown /></div>} />
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between px-8 pt-6 pb-6 w-full">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search hostels near Berekuso..." 
            className="w-full h-[52px] pl-12 pr-4 bg-white/60 border border-border/50 rounded-full text-[15px] font-medium outline-none focus:ring-2 focus:ring-canyon/30 transition-all shadow-sm backdrop-blur-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="w-[52px] h-[52px] bg-white/60 border border-border/50 rounded-full flex items-center justify-center relative shadow-sm hover:bg-white transition-colors cursor-pointer">
            <Bell className="w-[22px] h-[22px] text-[#5E5B58]" />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-[#B17B6A] rounded-full border-2 border-white" />
          </button>
          <div className="w-[52px] h-[52px] bg-[#E5D0BA] rounded-full flex items-center justify-center font-bold text-[#6c5e57] shadow-sm text-lg cursor-pointer hover:opacity-90">
            SA
          </div>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="lg:hidden relative px-4 pt-24 pb-8 mb-4 overflow-hidden">
        {/* Background Room Image with Fade Carousel */}
        <div className="absolute inset-0 z-0 bg-background pointer-events-none">
          {carouselImages.map((img, idx) => {
            const isCurrent = heroIndex === idx;
            
            return (
              <img 
                key={idx}
                src={img}
                alt="Hero Background" 
                loading={idx === 0 ? "eager" : "lazy"}
                style={{ willChange: 'opacity' }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${isCurrent ? 'opacity-100 dark:opacity-40' : 'opacity-0'}`}
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        
        <div className="relative z-10">
          <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1"><br/><br/><br/><br/>Welcome back</p><br/>
          <h1 className="text-3xl font-bold text-foreground leading-tight mb-1">Hey User!</h1>
          <h2 className="text-[28px] font-bold text-primary leading-[1.1] mb-8">Find your perfect<br/>room</h2>

          {/* Search */}
          {/* 
          <div className="flex items-center bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[10px] p-1.5 mb-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
            <Search className="w-6 h-6 text-primary ml-3 shrink-0" />
            <Input 
              placeholder="Search hostels" 
              className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground shadow-none focus-visible:ring-0 h-12 px-3 text-[15px]"
            />
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="h-12 w-12 bg-primary rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform active:scale-95"
            >
              <SlidersHorizontal className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
          */}

          <Link to="/explore" className="inline-flex items-center justify-center h-14 px-8 bg-primary text-primary-foreground font-bold rounded-xl shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform active:scale-95 mb-6 text-[15px]">
            Explore More
          </Link>
        </div>
      </section>

      {/* Desktop Hero Banner */}
      <section className="hidden lg:block px-8 mb-10">
        <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#6c5e57] to-[#4D4D4D] p-12 flex flex-col justify-center shadow-xl shadow-black/10" style={{ minHeight: '320px' }}>
          {/* Diagonal stripe pattern overlay */}
          <div className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,1) 10px, rgba(255,255,255,1) 12px)',
            }}
          />
          <div className="relative z-10 max-w-xl">
            <p className="text-[12px] font-bold tracking-[0.2em] text-[#E09F5E] uppercase mb-3">
              WELCOME BACK, SARAH
            </p>
            <h1 className="text-white text-[48px] font-extrabold leading-[1.1] tracking-tight mb-8">
              Find your perfect room
            </h1>
            <Link to="/explore" className="inline-flex items-center justify-center h-14 px-8 bg-canyon hover:bg-[#c28446] text-white font-bold rounded-full transition-colors shadow-lg shadow-black/20 text-[16px] cursor-pointer">
              Explore hostels
            </Link>
          </div>
          {/* Badge */}
          <div className="absolute bottom-1/2 left-1/2 translate-x-12 translate-y-16 z-10 hidden xl:block">
             <span className="inline-block px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c5e57] bg-white/90 border border-white/25 rounded-full backdrop-blur-md shadow-sm">
                CAMPUS / HOSTEL PHOTO
              </span>
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-2 lg:px-4">
        <div className="flex items-center justify-between px-4 lg:px-4 mb-4 lg:mb-6">
          <h3 className="text-xl lg:text-[24px] font-extrabold tracking-tight text-foreground">Featured hostels</h3>
          <Link to="/explore" className="text-sm font-bold text-[#B17B6A] hover:underline cursor-pointer">View all</Link>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 px-4 pb-4 pt-1">
            
            {MOST_POPULAR.map((hostel) => (
              <div key={hostel.id} className="block outline-none cursor-pointer">
                <HostelCard 
                  hostel={hostel} 
                  onClick={() => setSelectedHostel(hostel)} 
                  onSave={(e) => handleSave(e, hostel.id)}
                  isSaved={savedHostels.includes(hostel.id)}
                  showHeart={true}
                />
              </div>
            ))}

          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </section>

      {/* Recommended for you */}
      <section className="px-4 py-2 mt-4 lg:px-8 lg:mt-6 mb-12">
        <h3 className="text-xl lg:text-[24px] font-extrabold tracking-tight text-foreground mb-4 lg:mb-6">Recommended for you</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
          
          {NEARBY_PLACES.map((hostel) => (
            <div 
              key={hostel.id} 
              onClick={() => setSelectedHostel(hostel)}
              className="bg-card border border-border rounded-lg flex p-3 hover:shadow-md hover:bg-accent/50 transition-all cursor-pointer w-full"
            >
              <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0">
                <img src={hostel.image} alt={hostel.name} loading="lazy" className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
              </div>
              <div className="flex-1 ml-4 py-0.5 flex flex-col justify-between overflow-hidden">
                <div>
                  <h4 className="font-bold text-foreground text-[16px] truncate">{hostel.name}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-wide truncate">{hostel.distance} away</p>
                </div>
                <div className="flex items-center justify-between">
                  {(() => {
                    const style = getBadgeStyle(hostel.availability);
                    return (
                      <div className={`font-bold text-[8px] px-1.5 py-0.5 rounded-md flex items-center ${style.bg}`}>
                        <span className={`w-1 h-1 rounded-full mr-1 ${style.dot}`} />
                        {hostel.availability}
                      </div>
                    );
                  })()}
                  <div className="flex items-center space-x-1 bg-yellow-400/20 px-2 flex-shrink-0 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-yellow-600 fill-yellow-600" />
                    <span className="text-sm font-bold text-yellow-700">{hostel.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Filter Options Modal */}
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplyFilters={() => {}} 
        initialFilters={{ distance: 10, amenities: [], priceRange: [0, 10000] }}
      />

      <HostelDetailsOverlay 
        selectedHostel={selectedHostel} 
        setSelectedHostel={setSelectedHostel}
        savedHostels={savedHostels}
        onSave={handleSave}
      />

    </div>
  );
}
