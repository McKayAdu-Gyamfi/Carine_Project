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
import { useHostels } from "@/hooks/useHostels";

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
  const [searchQuery, setSearchQuery] = useState("");
  // Pass searchQuery directly to API hook if implemented, or filter client-side
  const { hostels } = useHostels(searchQuery);

  const [selectedHostel, setSelectedHostel] = useState<any>(() => {
    return location.state?.restoreHostel ? ALL_HOSTELS.find(h => h.id === location.state.restoreHostel) || null : null;
  });
  const [savedHostels, setSavedHostels] = useState<string[]>(() => {
    const saved = localStorage.getItem("saved_hostels");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (location.state?.restoreHostel) {
      // Look in both API results and fallback data
      const hostel = hostels.find(h => h.id === location.state.restoreHostel) || ALL_HOSTELS.find(h => h.id === location.state.restoreHostel);
      if (hostel) setSelectedHostel(hostel);
    }
  }, [location.state, hostels]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ distance: number; amenities: string[], priceRange: [number, number] }>({ 
    distance: 10, 
    amenities: [], 
    priceRange: [0, 10000] 
  });

  // Decide the base source of data
  const basePopular = hostels.length > 0 ? hostels : MOST_POPULAR;
  const baseNearby = hostels.length > 0 ? hostels.slice(0, 5) : NEARBY_PLACES;

  const applyClientSideFilters = (h: any) => {
    if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (parseFloat(h.distance) > activeFilters.distance) return false;
    if (h.startingPrice < activeFilters.priceRange[0] || h.startingPrice > activeFilters.priceRange[1]) return false;
    if (activeFilters.amenities.length > 0 && !activeFilters.amenities.every((a: string) => h.amenities.includes(a))) return false;
    return true;
  };

  const filteredPopular = basePopular.filter(applyClientSideFilters);
  const filteredNearby = baseNearby.filter(applyClientSideFilters);


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
    <div className="flex flex-col min-h-screen bg-accent/20 dark:bg-black/30 transition-colors pt-24 pb-20 relative">
      {/* Top Navigation - simplified */}
      <TopNav rightAction={<div className="hidden sm:block"><NotificationsDropdown /></div>} />

      {/* Main Content Area */}
      <div className="px-5 space-y-8">
        
        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search address, or near you" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-card rounded-lg pl-12 pr-4 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border border-border"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground rounded-lg shadow-md transition-transform active:scale-95"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Most Popular */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Most Popular</h2>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar -mx-5 px-5 space-x-5 pb-5">
            {filteredPopular.length === 0 && <p className="text-muted-foreground text-sm py-4">No popular hostels match your search.</p>}
            {filteredPopular.map((hostel) => (
              <div key={hostel.id} className="shrink-0 flex items-stretch">
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
        </div>

        {/* Nearby Place */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Closer to campus</h2>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar -mx-5 px-5 space-x-4 pb-5">
            {filteredNearby.length === 0 && <p className="text-muted-foreground text-sm py-4">No nearby hostels match your search.</p>}
            {filteredNearby.map((hostel) => (
              <div 
                key={hostel.id} 
                onClick={() => setSelectedHostel(hostel)}
                className="shrink-0 w-[220px] bg-card rounded-lg p-2.5 flex items-center shadow-sm border border-border cursor-pointer hover:shadow-md transition-all gap-3"
              >
                <img src={hostel.image} alt={hostel.name} loading="lazy" className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-bold text-sm text-foreground truncate">{hostel.name}</h3>
                  <p className="text-muted-foreground text-[10px] font-medium mb-1 truncate">{hostel.location}</p>
                  <div className="flex items-center justify-between mt-1">
                    {(() => {
                      const style = getBadgeStyle(hostel.availability);
                      return (
                        <div className={`font-bold text-[8px] px-1.5 py-0.5 rounded-md flex items-center ${style.bg}`}>
                          <span className={`w-1 h-1 rounded-full mr-1 ${style.dot}`} />
                          {hostel.availability}
                        </div>
                      );
                    })()}
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium text-foreground">{hostel.rating.toFixed(1)}</span>
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
