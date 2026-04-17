import { Plus, Settings, Home } from "lucide-react";
import { MOST_POPULAR } from "@/data/hostels";

export default function ManagerProperties() {
  // Mock only picking properties belonging to manager
  const properties = MOST_POPULAR.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen pb-6">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 sticky top-0 bg-background/80 backdrop-blur-md z-40 flex items-center justify-between border-b border-border/30 mb-4">
        <h1 className="text-xl font-bold text-foreground">My Properties</h1>
        <button className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-sm active:scale-95 transition-transform">
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      <div className="px-5 space-y-5">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
            <div className="h-32 relative">
              <img src={prop.image} loading="lazy" className="w-full h-[120%] object-cover -mt-[5%]" alt="Property" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <h3 className="font-bold text-white text-lg tracking-wide">{prop.name}</h3>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${prop.availability === 'AVAILABLE' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90">{prop.availability}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 flex flex-col space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Distance</span>
                <span className="text-foreground">{prop.distance} from Campus</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold border-t border-border/40 pt-3">
                <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Occupancy</span>
                <span className="text-emerald-500">92% Filled</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="flex items-center justify-center space-x-2 bg-accent/50 hover:bg-accent text-foreground font-semibold text-xs py-2.5 rounded-lg border border-border/50 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Rooms</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-accent/50 hover:bg-accent text-foreground font-semibold text-xs py-2.5 rounded-lg border border-border/50 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
