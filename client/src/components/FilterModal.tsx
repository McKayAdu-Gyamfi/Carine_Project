import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [distance, setDistance] = useState<number>(5);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const amenities = ["WiFi", "AC", "Water Supply", "Generator", "Gym", "Study Room", "Security", "Laundry"];
  
  const toggleAmenity = (item: string) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={onClose}
      />
      
      {/* Bottom Sheet Modal */}
      <div 
        className={`fixed bottom-0 left-0 w-full z-[110] bg-background border-t border-border rounded-t-[32px] p-6 pb-12 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Filters</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto hide-scrollbar pb-6 relative">
          {/* Price Range */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Price Range (GHS)</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input type="number" placeholder="Min" className="w-full h-12 bg-card border border-border rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="text-muted-foreground font-bold">-</div>
              <div className="flex-1">
                <input type="number" placeholder="Max" className="w-full h-12 bg-card border border-border rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Distance */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Distance to Campus</h3>
              <span className="text-sm font-bold text-primary">{distance} km</span>
            </div>
            <div className="pt-2">
              <input 
                type="range" 
                min="0.5" 
                max="10" 
                step="0.5" 
                value={distance} 
                onChange={(e) => setDistance(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
                <span>0.5 km</span>
                <span>10+ km</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {amenities.map(item => (
                <button 
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border cursor-pointer ${selectedAmenities.includes(item) ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-4 mt-2 border-t border-border/50 bg-background">
          <button 
             onClick={() => { setSelectedAmenities([]); setDistance(5); }}
             className="px-6 py-4 font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Clear
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-primary text-primary-foreground rounded-2xl py-4 font-bold shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}
