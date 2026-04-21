import { useLocation, useNavigate, Link } from "react-router-dom";
import { Maximize, X, Hand, Scaling, Box, Home, Compass, User } from "lucide-react";

export default function LivePreview() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    if (location.state?.returnPath) {
      navigate(location.state.returnPath, { state: { restoreHostel: location.state.returnToHostel }, replace: true });
    } else {
      navigate(-1);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Background Room Tour (Pannellum) */}
      <div className="absolute inset-0 z-0 bg-black">
        <iframe 
          width="100%" 
          height="100%" 
          allowFullScreen 
          style={{ borderStyle: "none" }} 
          src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https://pannellum.org/images/alma.jpg&autoLoad=true"
        />
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
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col space-y-4 z-[9999]">
        <button onClick={handleFullscreen} className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg hover:bg-black/80 transition-colors pointer-events-auto">
          <Maximize className="w-5 h-5" />
        </button>
        <button onClick={handleClose} className="w-12 h-12 rounded-full bg-destructive/90 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg hover:bg-destructive transition-colors pointer-events-auto cursor-pointer">
          <X className="w-5 h-5" />
        </button>
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
                <span>Dufie Annex</span>
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
