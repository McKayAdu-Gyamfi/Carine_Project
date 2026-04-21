import { Search, MapPin, Heart, ChevronLeft, Send, SlidersHorizontal, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopNav from "@/components/TopNav";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import { useState } from "react";
import FilterModal from "@/components/FilterModal";
import HostelCard from "@/components/HostelCard";
import { MOST_POPULAR, NEARBY_PLACES } from "../data/hostels";

export default function Explore() {
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  const [savedHostels, setSavedHostels] = useState<string[]>(() => {
    const saved = localStorage.getItem("saved_hostels");
    return saved ? JSON.parse(saved) : [];
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({ distance: 10, amenities: [] as string[] });
  const navigate = useNavigate();

  const filteredPopular = MOST_POPULAR.filter(h => {
    if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (parseFloat(h.distance) > activeFilters.distance) return false;
    if (activeFilters.amenities.length > 0 && !activeFilters.amenities.every(a => h.amenities.includes(a))) return false;
    return true;
  });

  const filteredNearby = NEARBY_PLACES.filter(h => {
    if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (parseFloat(h.distance) > activeFilters.distance) return false;
    if (activeFilters.amenities.length > 0 && !activeFilters.amenities.every(a => h.amenities.includes(a))) return false;
    return true;
  });

  const handleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    let newSaved;
    if (savedHostels.includes(id)) {
      newSaved = savedHostels.filter(h => h !== id);
    } else {
      newSaved = [...savedHostels, id];
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
            <button className="text-sm font-bold text-primary">See All</button>
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
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

      {/* Sliding Details Overlay */}
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
            <div className="relative h-64 shrink-0">
              <img src={selectedHostel.image} loading="lazy" className="w-full h-full object-cover" alt="Property Header" />
              
              {/* Back Button */}
              <button 
                onClick={() => setSelectedHostel(null)}
                className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 transition-colors"
               >
                 <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Heart/Save Button */}
              <button 
                onClick={(e) => handleSave(e, selectedHostel.id)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-colors"
               >
                 <Heart className={`w-5 h-5 ${savedHostels.includes(selectedHostel.id) ? 'fill-white text-white' : 'text-white'}`} />
              </button>

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
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Gallery</h3>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {selectedHostel.gallery.map((img: string, idx: number) => (
                    <img key={idx} src={img} loading="lazy" className="w-20 h-20 rounded-2xl object-cover border border-border shrink-0 shadow-sm" alt="Gallery item" />
                  ))}
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedHostel.desc}
                </p>
                <button 
                  onClick={() => navigate('/live-preview')}
                  className="mt-4 w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  Enter live 360 ° tour
                </button>
              </div>

            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 bg-background border-t border-border shrink-0 z-30 pb-8">
              <button 
                onClick={() => navigate('/booking')}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform text-lg"
              >
                Book Now
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
