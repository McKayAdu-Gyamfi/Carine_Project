import { Star, MapPin, TrendingUp, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HostelCardProps {
  hostel: any;
  onClick?: () => void;
  onSave?: (e: React.MouseEvent) => void;
  isSaved?: boolean;
  showHeart?: boolean;
}

export default function HostelCard({ hostel, onClick, onSave, isSaved = false, showHeart = false }: HostelCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`w-[280px] h-[280px] bg-card border border-border/80 rounded-lg overflow-hidden shrink-0 group transition-all hover:shadow-lg hover:border-primary/30 flex flex-col isolate relative ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="relative h-[150px] w-full shrink-0 overflow-hidden bg-muted">
        <img src={hostel.image} alt={hostel.name} loading="lazy" className="object-cover w-full h-[105%] -mt-[1%] group-hover:scale-105 transition-transform duration-700" />
        
        {showHeart && onSave && (
          <button 
            onClick={onSave}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-colors shadow-sm z-10"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : 'text-white'}`} />
          </button>
        )}
        
        <div className={`absolute top-3 ${showHeart ? 'left-3' : 'right-3'} bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm`}>
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-semibold text-white">{hostel.rating.toFixed(1)}</span>
        </div>
        
        <div className="absolute bottom-3 left-3 shadow-sm">
          <Badge variant="secondary" className={`border-none font-bold text-[9px] px-2 py-0.5 backdrop-blur-md ${hostel.availability === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${hostel.availability === 'AVAILABLE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            {hostel.availability}
          </Badge>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-foreground text-[16px] truncate mb-1 group-hover:text-primary transition-colors">{hostel.name}</h4>
          <div className="flex items-center text-muted-foreground text-xs">
            <MapPin className="w-3 h-3 mr-1 shrink-0" />
            <span className="truncate">{hostel.location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Starts from</p>
            <p className="font-bold text-foreground text-lg">GHS {hostel.startingPrice}<span className="text-xs font-normal text-muted-foreground">/{hostel.priceFreq.replace('per ', '')}</span></p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md shrink-0">
            <TrendingUp className="w-4 h-4 text-primary-foreground rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
