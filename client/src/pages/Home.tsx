import { Star } from "lucide-react";
// import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import TopNav from "@/components/TopNav";
import FilterModal from "@/components/FilterModal";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import HostelCard from "@/components/HostelCard";
import { useState, useEffect } from "react";
import { MOST_POPULAR, NEARBY_PLACES, ALL_HOSTELS } from "../data/hostels";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const carouselImages = ALL_HOSTELS
    .filter(h => !h.name.toLowerCase().includes('evandy') && !h.name.toLowerCase().includes('gaza'))
    .map(h => h.image);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-6 transition-colors">
      {/* Top App Bar */}
      <TopNav rightAction={<div className="hidden sm:block"><NotificationsDropdown /></div>} />

      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-8 mb-4 overflow-hidden">
        {/* Background Room Image with Fade Carousel */}
        <div className="absolute inset-0 z-0 bg-background pointer-events-none">
          {carouselImages.map((img, idx) => {
            const isCurrent = heroIndex === idx;
            
            return (
              <img 
                key={idx}
                src={img}
                alt="Hero Background" 
                loading={idx === 0 ? "eager" : "lazy"}
                style={{ willChange: 'opacity' }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${isCurrent ? 'opacity-100 dark:opacity-40' : 'opacity-0'}`}
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        
        <div className="relative z-10">
          <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1"><br/><br/><br/><br/>Welcome back</p><br/>
          <h1 className="text-3xl font-bold text-foreground leading-tight mb-1">Hey User!</h1>
          <h2 className="text-[28px] font-bold text-primary leading-[1.1] mb-8">Find your perfect<br/>room</h2>

          {/* Search */}
          {/* 
          <div className="flex items-center bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[10px] p-1.5 mb-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
            <Search className="w-6 h-6 text-primary ml-3 shrink-0" />
            <Input 
              placeholder="Search hostels" 
              className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground shadow-none focus-visible:ring-0 h-12 px-3 text-[15px]"
            />
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="h-12 w-12 bg-primary rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform active:scale-95"
            >
              <SlidersHorizontal className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
          */}

          <Link to="/explore" className="inline-flex items-center justify-center h-14 px-8 bg-primary text-primary-foreground font-bold rounded-xl shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform active:scale-95 mb-6 text-[15px]">
            Explore More
          </Link>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-2">
        <div className="flex items-center justify-between px-4 mb-4">
          <h3 className="text-xl font-bold text-foreground">Featured Hostels</h3>
          <Link to="/explore" className="text-sm font-medium text-primary hover:underline">View All</Link>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 px-4 pb-4 pt-1">
            
            {MOST_POPULAR.map((hostel) => (
              <Link to="/explore" key={hostel.id} className="block outline-none">
                <HostelCard hostel={hostel} />
              </Link>
            ))}

          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </section>

      {/* Recommended for you */}
      <section className="px-4 py-2 mt-4">
        <h3 className="text-xl font-bold text-foreground mb-4">Recommended for you</h3>
        <div className="space-y-3">
          
          {NEARBY_PLACES.map((hostel) => (
            <div key={hostel.id} className="bg-card border border-border rounded-lg flex p-3 hover:shadow-md hover:bg-accent/50 transition-all cursor-pointer w-full">
              <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0">
                <img src={hostel.image} alt={hostel.name} loading="lazy" className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
              </div>
              <div className="flex-1 ml-4 py-0.5 flex flex-col justify-between overflow-hidden">
                <div>
                  <h4 className="font-bold text-foreground text-[16px] truncate">{hostel.name}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-wide truncate">{hostel.distance} away</p>
                </div>
                <div className="flex items-center justify-end">
                  <div className="flex items-center space-x-1 bg-yellow-400/20 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-yellow-600 fill-yellow-600" />
                    <span className="text-sm font-bold text-yellow-700">{hostel.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Filter Options Modal */}
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplyFilters={() => {}} 
        initialFilters={{ distance: 10, amenities: [] }}
      />

    </div>
  );
}
