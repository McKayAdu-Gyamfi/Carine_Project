import { useState, useEffect } from "react";
import TopNav from "@/components/TopNav";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import { ALL_HOSTELS } from "../data/hostels";
import { Heart, MapPin, Trash2 } from "lucide-react";

export default function Saved() {
  const [savedHostelIds, setSavedHostelIds] = useState<string[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem("saved_hostels");
    if (saved) {
      setSavedHostelIds(JSON.parse(saved));
    }
  }, []);

  const handleUnsave = (id: string) => {
    const newSaved = savedHostelIds.filter(hId => hId !== id);
    setSavedHostelIds(newSaved);
    localStorage.setItem("saved_hostels", JSON.stringify(newSaved));
  };

  const savedHostels = ALL_HOSTELS.filter(h => savedHostelIds.includes(h.id));

  return (
    <div className="flex flex-col min-h-screen bg-accent/20 dark:bg-black/30 transition-colors pt-24 pb-20">
      <TopNav rightAction={<div className="hidden sm:block"><NotificationsDropdown /></div>} />
      <div className="px-5">
        <h1 className="text-2xl font-bold text-foreground mb-6">Saved Hostels</h1>

        {savedHostels.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 opacity-50">
            <Heart className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <p className="text-lg font-medium text-muted-foreground text-center">No saved hostels yet.</p>
            <p className="text-sm text-muted-foreground text-center mt-2">Explore and click the heart icon to save your favorites here.</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {savedHostels.map((hostel) => (
              <div 
                key={hostel.id} 
                className="w-full bg-card rounded-3xl p-3 shadow-md border border-border flex items-center justify-between group"
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
                    onClick={() => handleUnsave(hostel.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
