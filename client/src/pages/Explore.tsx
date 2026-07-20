import { Search, SlidersHorizontal, Star } from "lucide-react";
import { useLocation } from "react-router-dom";
import TopNav from "@/components/TopNav";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import { useState, useEffect } from "react";
import FilterModal from "@/components/FilterModal";
import HostelCard from "@/components/HostelCard";
import HostelDetailsOverlay from "@/components/HostelDetailsOverlay";
import { MOST_POPULAR, NEARBY_PLACES, ALL_HOSTELS } from "../data/hostels";
import { useToast } from "@/components/ui/toaster";

const getBadgeStyle = (availability: string) => {
  switch (availability?.toUpperCase()) {
    case 'AVAILABLE': return { bg: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500 animate-pulse' };
    case 'FULL': return { bg: 'bg-destructive/20 text-destructive dark:text-red-400', dot: 'bg-destructive' };
    default: return { bg: 'bg-amber-500/20 text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' };
  }
};

export default function Explore() {
  const { toast } = useToast();
  const location = useLocation();
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ distance: number; amenities: string[], priceRange: [number, number] }>({ 
    distance: 10, 
    amenities: [], 
    priceRange: [0, 10000] 
  });

  const filteredPopular = MOST_POPULAR.filter(h => {
    if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (parseFloat(h.distance) > activeFilters.distance) return false;
    if (h.startingPrice < activeFilters.priceRange[0] || h.startingPrice > activeFilters.priceRange[1]) return false;
    if (activeFilters.amenities.length > 0 && !activeFilters.amenities.every(a => h.amenities.includes(a))) return false;
    return true;
  });

  const filteredNearby = NEARBY_PLACES.filter(h => {
    if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (parseFloat(h.distance) > activeFilters.distance) return false;
    if (h.startingPrice < activeFilters.priceRange[0] || h.startingPrice > activeFilters.priceRange[1]) return false;
    if (activeFilters.amenities.length > 0 && !activeFilters.amenities.every(a => h.amenities.includes(a))) return false;
    return true;
  });

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

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 relative">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden">
        <TopNav rightAction={<div className="hidden sm:block"><NotificationsDropdown /></div>} />
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between px-8 pt-6 pb-6 w-full">
        <h1 className="text-[28px] font-extrabold tracking-tight text-foreground">Explore</h1>
        <div className="flex items-center space-x-4">
          <button className="w-[52px] h-[52px] bg-white border border-border/50 rounded-full flex items-center justify-center relative shadow-sm hover:bg-accent transition-colors cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5E5B58]">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#B17B6A] rounded-full border-2 border-white" />
          </button>
          <div className="w-[52px] h-[52px] bg-[#E5D0BA] rounded-full flex items-center justify-center font-bold text-[#6c5e57] shadow-sm text-lg cursor-pointer hover:opacity-90">
            SA
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-5 lg:px-8 space-y-8 pt-24 lg:pt-0">
        
        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search address, or near you" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-[#F8F6F3] rounded-[16px] pl-12 pr-4 text-[15px] font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-none border-none transition-all"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-14 h-14 flex items-center justify-center bg-[#A2705D] text-white rounded-[16px] shadow-sm transition-transform active:scale-95 cursor-pointer hover:bg-[#8e6150]"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="hidden lg:flex items-center space-x-3 overflow-x-auto pb-2">
          {["All", "Available", "Under GHS 6,500", "Air-conditioned", "Ensuite"].map((chip, idx) => (
            <button 
              key={idx} 
              className={`px-5 py-2.5 rounded-full font-bold text-[13px] whitespace-nowrap transition-colors ${
                idx === 0 
                  ? "bg-[#8C5E4D] text-white" 
                  : "bg-transparent text-[#8C5E4D] hover:bg-[#F2EFEA]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Most Popular */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl lg:text-[22px] font-extrabold tracking-tight text-foreground">Most popular</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredPopular.length === 0 && <p className="text-muted-foreground text-sm py-4">No popular hostels match your search.</p>}
            {filteredPopular.map((hostel) => (
              <div key={hostel.id} className="flex items-stretch w-full">
                <div className="w-full">
                  <HostelCard 
                    hostel={hostel} 
                    onClick={() => setSelectedHostel(hostel)} 
                    onSave={(e) => handleSave(e, hostel.id)}
                    isSaved={savedHostels.includes(hostel.id)}
                    showHeart={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Place */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl lg:text-[22px] font-extrabold tracking-tight text-foreground">Closer to campus</h2>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredNearby.length === 0 && <p className="text-muted-foreground text-sm py-4">No nearby hostels match your search.</p>}
            {filteredNearby.map((hostel) => (
              <div 
                key={hostel.id} 
                onClick={() => setSelectedHostel(hostel)}
                className="w-full bg-[#FDFCFB] rounded-[20px] p-4 flex items-center shadow-sm border border-border/50 cursor-pointer hover:shadow-md transition-all gap-4"
              >
                <img src={hostel.image} alt={hostel.name} loading="lazy" className="w-[100px] h-[100px] rounded-[16px] object-cover" />
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-bold text-[17px] text-foreground truncate mb-0.5">{hostel.name}</h3>
                  <p className="text-muted-foreground text-[12px] font-medium mb-3 truncate">{hostel.location} · {hostel.distance}</p>
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const style = getBadgeStyle(hostel.availability);
                      return (
                        <div className={`font-bold text-[10px] px-2 py-1 rounded-md flex items-center ${style.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.dot}`} />
                          {hostel.availability}
                        </div>
                      );
                    })()}
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 text-[#E09F5E] fill-[#E09F5E]" />
                      <span className="text-[13px] font-bold text-foreground">{hostel.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplyFilters={setActiveFilters}
        initialFilters={activeFilters}
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
