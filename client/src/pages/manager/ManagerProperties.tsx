import { Plus, Settings, Home, Loader2, HomeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { transformHostel } from "@/hooks/useHostels";
import type { Hostel } from "@/hooks/useHostels";

export default function ManagerProperties() {
  const [properties, setProperties] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManagerHostels = async () => {
      try {
        const res = await api.get<{ success: boolean; data: any[] }>('/users/me/hostels');
        if (res.success) {
          const mapped = res.data.map(transformHostel);
          setProperties(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch manager hostels", err);
      } finally {
        setLoading(false);
      }
    };
    fetchManagerHostels();
  }, []);

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
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-semibold text-muted-foreground mt-4">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground/50">
                <HomeIcon className="w-8 h-8" />
             </div>
             <p className="font-bold text-muted-foreground">You don't have any properties yet.</p>
           </div>
        ) : (
          properties.map((prop) => (
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
                <span className="text-emerald-500">Active</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="flex items-center justify-center space-x-2 bg-accent/50 hover:bg-accent text-foreground font-semibold text-xs py-2.5 rounded-lg border border-border/50 transition-colors cursor-pointer">
                  <Home className="w-4 h-4" />
                  <span>Rooms</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-accent/50 hover:bg-accent text-foreground font-semibold text-xs py-2.5 rounded-lg border border-border/50 transition-colors cursor-pointer">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
