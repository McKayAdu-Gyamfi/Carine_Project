import { useState, useEffect } from "react";
import TopNav from "@/components/TopNav";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import { ALL_HOSTELS } from "../data/hostels";
import { Heart, MapPin, Trash2, Search, SlidersHorizontal } from "lucide-react";
import FilterModal from "@/components/FilterModal";
import HostelDetailsOverlay from "@/components/HostelDetailsOverlay";

export default function Saved() {
  const [savedHostelIds, setSavedHostelIds] = useState<string[]>([]);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ distance: number; amenities: string[], priceRange: [number, number] }>({ 
    distance: 10, 
    amenities: [], 
    priceRange: [0, 10000] 
  });
  
  useEffect(() => {
    const saved = localStorage.getItem("saved_hostels");
    if (saved) {
      setSavedHostelIds(JSON.parse(saved));
    }
  }, []);

  const handleUnsave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSaved = savedHostelIds.filter(hId => hId !== id);
    setSavedHostelIds(newSaved);
    localStorage.setItem("saved_hostels", JSON.stringify(newSaved));
  };

  const savedHostels = ALL_HOSTELS.filter(h => savedHostelIds.includes(h.id));

  // Apply filtering and search
  const filteredSaved = savedHostels.filter(h => {
    // Search query
    if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Distance filter
    if (parseFloat(h.distance) > activeFilters.distance) return false;
    
    // Price range filter
    if (h.startingPrice < activeFilters.priceRange[0] || h.startingPrice > activeFilters.priceRange[1]) return false;
    
    // Amenities filter
    if (activeFilters.amenities.length > 0 && !activeFilters.amenities.every(a => h.amenities.includes(a))) return false;
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-accent/20 dark:bg-black/30 transition-colors pt-24 pb-20">
      <TopNav rightAction={<div className="hidden sm:block"><NotificationsDropdown /></div>} />
      <div className="px-5 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Saved Hostels</h1>
          {savedHostelIds.length > 0 && (
            <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">{savedHostelIds.length} Saved</span>
          )}
        </div>

        {/* Search & Filter Bar */}
        {savedHostels.length > 0 && (
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search your saved list" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 bg-card rounded-2xl pl-12 pr-4 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border border-border/50 transition-all"
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="w-14 h-14 flex items-center justify-center bg-card text-foreground rounded-2xl shadow-sm border border-border/50 transition-transform active:scale-95 hover:bg-accent"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        )}

        {filteredSaved.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 opacity-50">
            <Heart className={`w-16 h-16 text-muted-foreground mb-4 opacity-50 ${searchQuery ? 'hidden' : 'block'}`} />
            <Search className={`w-16 h-16 text-muted-foreground mb-4 opacity-50 ${searchQuery ? 'block' : 'hidden'}`} />
            <p className="text-lg font-medium text-muted-foreground text-center">
              {searchQuery ? "No results found" : "No saved hostels yet."}
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              {searchQuery ? "Try a different search term or clear filters." : "Explore and click the heart icon to save your favorites here."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {filteredSaved.map((hostel) => (
              <div 
                key={hostel.id} 
                onClick={() => setSelectedHostel(hostel)}
                className="w-full bg-card rounded-3xl p-3 shadow-md border border-border flex items-center justify-between group animate-in fade-in slide-in-from-bottom-4 duration-300 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <img src={hostel.image} alt={hostel.name} loading="lazy" className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                  <div className="flex flex-col">
                    <h3 className="font-bold text-base text-foreground mb-1">{hostel.name}</h3>
                    <div className="flex items-center text-muted-foreground text-xs font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span className="truncate max-w-[120px]">{hostel.location}</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-primary font-bold text-sm">GHS {hostel.price}</span>
                      <span className="text-muted-foreground text-[10px] ml-1">/ {hostel.priceFreq}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 pr-2">
                  <button 
                    onClick={(e) => handleUnsave(e, hostel.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors shadow-sm"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <HostelDetailsOverlay 
        selectedHostel={selectedHostel} 
        setSelectedHostel={setSelectedHostel}
        savedHostels={savedHostelIds}
        onSave={handleUnsave}
      />

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplyFilters={setActiveFilters}
        initialFilters={activeFilters}
      />
    </div>
  );
}
