import { Link } from "react-router-dom";
import { Sun, Maximize, X, Hand, Scaling, MapPin, Box, Home, Compass, User } from "lucide-react";

export default function LivePreview() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Background Room Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1598928506311-c55dd121a97d?auto=format&fit=crop&q=80&w=1200&h=1600" 
          alt="Room interior" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* Top Left Pills */}
      <div className="absolute top-12 left-4 right-16 z-10 space-y-3 pointer-events-none">
        <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          <span className="text-sm font-bold tracking-wide text-white">LIVE PREVIEW</span>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-xl pointer-events-auto">
          <h2 className="text-lg font-bold text-primary mb-1">Premium Studio</h2>
          <p className="text-sm text-white/90 leading-snug">Experience the layout and natural lighting of your future home.</p>
        </div>
      </div>

      {/* Floating Action Buttons (Right) */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col space-y-4 z-20">
        <button className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg hover:bg-black/80 transition-colors">
          <Sun className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg hover:bg-black/80 transition-colors">
          <Maximize className="w-5 h-5" />
        </button>
        <Link to="/hostel-details" className="w-12 h-12 rounded-full bg-destructive/90 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg hover:bg-destructive transition-colors">
          <X className="w-5 h-5" />
        </Link>
      </div>

      {/* Interactive Hotspots */}
      <div className="absolute top-1/3 left-1/4 z-10">
        <div className="relative flex items-center justify-center w-12 h-12">
          <div className="absolute inset-0 bg-orange-500/40 rounded-full animate-ping" />
          <div className="w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,1)] border-2 border-white" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 z-10">
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping" />
          <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,1)] border-2 border-white" />
        </div>
      </div>
      <div className="absolute top-1/2 right-1/3 z-10">
        <div className="relative flex items-center justify-center w-14 h-14">
          <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
          <div className="w-3 h-3 bg-primary/90 rounded-full border border-white" />
        </div>
      </div>

      {/* Bottom Interface Group */}
      <div className="absolute bottom-6 left-2 right-2 z-30 flex flex-col items-center">
        
        {/* Interaction Hints & Map Preview */}
        <div className="w-full flex justify-between items-end mb-4 px-2">
          <div className="flex bg-black/60 backdrop-blur-md rounded-2xl px-4 py-2 space-x-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-2">
              <Hand className="w-4 h-4 text-white/90" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Drag to<br/>look</span>
            </div>
            <div className="w-px h-6 bg-white/30 self-center" />
            <div className="flex items-center space-x-2">
              <Scaling className="w-4 h-4 text-white/90" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Pinch<br/>to zoom</span>
            </div>
          </div>

          <div className="relative w-36 h-36 bg-gray-900 rounded-2xl border border-white/30 overflow-hidden shadow-2xl shrink-0">
            <div className="absolute inset-0 opacity-60 bg-[url('https://i.stack.imgur.com/HILmr.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <div className="absolute top-2 right-2 w-6 h-6 bg-primary border border-white/20 rounded-full flex items-center justify-center">
               <MapPin className="w-3 h-3 text-white fill-white" />
            </div>

            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-[8px] font-bold text-primary uppercase">Campus East</p>
              <p className="text-[10px] font-bold text-white leading-tight">North Campus District</p>
            </div>
          </div>
        </div>

        {/* Action Panel & Bottom Nav Wrapper */}
        {/* Using standard background variables here so the panel matches the system theme */}
        <div className="w-full bg-background/95 text-foreground backdrop-blur-xl border border-border rounded-[32px] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)] transition-colors">
          <div className="p-4 flex items-center justify-between border-b border-border mx-2">
             <div className="flex flex-col ml-2">
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Starting from</span>
               <div className="flex items-baseline">
                 <span className="text-2xl font-extrabold text-foreground mr-1">$450</span>
                 <span className="text-[10px] font-medium text-muted-foreground">/mo</span>
               </div>
             </div>
             
             <button className="bg-primary hover:bg-primary/90 transition-transform active:scale-95 px-6 py-3 rounded-full text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 mr-2 text-center h-full flex flex-col justify-center leading-tight">
                <span>Book</span>
                <span>Unity Hall</span>
             </button>
          </div>

          {/* Custom Bottom Nav for this screen */}
          <div className="w-full flex justify-around items-center py-4 bg-card/50 transition-colors">
            <Link to="/" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/explore" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Compass className="w-6 h-6" />
            </Link>
            <button className="p-3 bg-primary rounded-full text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform hover:scale-105">
               <Box className="w-6 h-6" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
