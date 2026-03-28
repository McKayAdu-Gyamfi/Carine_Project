import { Bell, Search, SlidersHorizontal, TrendingUp, Tag, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import TopNav from "@/components/TopNav";
import FilterModal from "@/components/FilterModal";
import { useState } from "react";
import dufie_annex_1 from "../assets/Dufie_Annex_1.png";
import tanko_hostel_1 from "../assets/Tanko_4.png";
import new_hosanna from "../assets/New Hosanna_1.png";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-background pb-6 transition-colors">
      {/* Top App Bar */}
      <TopNav rightAction={<Bell className="w-6 h-6 text-muted-foreground transition-colors hover:text-foreground hidden sm:block" />} />

      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-8 mb-4">
        {/* Background Room Image with Fade */}
        <div className="absolute inset-0 z-0">
          <img 
            src={dufie_annex_1}
            alt="Dufie Platinum" 
            className="w-full h-full object-cover opacity-100 dark:opacity-40 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />
        </div>
        
        <div className="relative z-10">
          <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1"><br/><br/><br/><br/>Welcome back</p><br/>
          <h1 className="text-3xl font-bold text-foreground leading-tight mb-1">Hey User!</h1>
          <h2 className="text-[28px] font-bold text-primary leading-[1.1] mb-8">Find your perfect<br/>room</h2>

          {/* Search */}
          <div className="flex items-center bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[22px] p-1.5 mb-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
            <Search className="w-6 h-6 text-primary ml-3 shrink-0" />
            <Input 
              placeholder="Search hostels" 
              className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground shadow-none focus-visible:ring-0 h-12 px-3 text-[15px]"
            />
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="h-12 w-12 bg-primary rounded-[16px] flex items-center justify-center shrink-0 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform active:scale-95"
            >
              <SlidersHorizontal className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-none">
            <button className="flex items-center space-x-2 bg-primary px-5 py-2.5 rounded-full whitespace-nowrap shadow-[0_0_20px_rgba(59,130,246,0.35)] shrink-0 transition-transform active:scale-95">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Trending</span>
            </button>
            <button className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-border px-5 py-2.5 rounded-full whitespace-nowrap shrink-0 hover:bg-accent transition-all active:scale-95">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground/90">Under GHS 500</span>
            </button>
          </div>
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
            
            {/* Featured Card 1 */}
            <Link to="/hostel-details" className="block outline-none">
              <div className="w-[280px] h-[280px] bg-card border border-border/80 rounded-2xl overflow-hidden shrink-0 group transition-all hover:shadow-lg hover:border-primary/30 flex flex-col isolate relative">
                <div className="relative h-[150px] w-full shrink-0 overflow-hidden bg-muted">
                  <img src={dufie_annex_1} alt="Dufie Annex" className="object-cover w-full h-[105%] -mt-[1%] group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-white">4.8</span>
                  </div>
                  <div className="absolute bottom-3 left-3 shadow-sm">
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-none font-medium text-[10px] px-2 py-0.5 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                      AVAILABLE
                    </Badge>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-foreground text-[16px] truncate mb-1 group-hover:text-primary transition-colors">Dufie Annex</h4>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <MapPin className="w-3 h-3 mr-1 shrink-0" />
                      <span className="truncate">Berekuso, Eastern Region</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Starts from</p>
                      <p className="font-bold text-foreground text-lg">GHS 7,000<span className="text-xs font-normal text-muted-foreground">/sem</span></p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md shrink-0">
                      <TrendingUp className="w-4 h-4 text-primary-foreground rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Featured Card 2 */}
            <Link to="/hostel-details" className="block outline-none">
              <div className="w-[280px] h-[280px] bg-card border border-border/80 rounded-2xl overflow-hidden shrink-0 group transition-all hover:shadow-lg hover:border-primary/30 flex flex-col isolate relative">
                <div className="relative h-[150px] w-full shrink-0 overflow-hidden bg-muted">
                  <img src={tanko_hostel_1} alt="Tanko Hostel" className="object-cover w-full h-[105%] -mt-[1%] group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-white">4.9</span>
                  </div>
                  <div className="absolute bottom-3 left-3 shadow-sm">
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-none font-medium text-[10px] px-2 py-0.5 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                      AVAILABLE
                    </Badge>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-foreground text-[16px] truncate mb-1 group-hover:text-primary transition-colors">Tanko Hostel</h4>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <MapPin className="w-3 h-3 mr-1 shrink-0" />
                      <span className="truncate">Berekuso, Eastern Region</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Starts from</p>
                      <p className="font-bold text-foreground text-lg">GHS 7,100<span className="text-xs font-normal text-muted-foreground">/sem</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </section>

      {/* Recommended for you */}
      <section className="px-4 py-2 mt-4">
        <h3 className="text-xl font-bold text-foreground mb-4">Recommended for you</h3>
        <div className="space-y-3">
          
          {/* List item 1 */}
          <div className="bg-card border border-border rounded-2xl flex p-3 hover:shadow-md hover:bg-accent/50 transition-all cursor-pointer w-full">
            <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0">
              <img src={new_hosanna} alt="New Hosanna" className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
            </div>
            <div className="flex-1 ml-4 py-0.5 flex flex-col justify-between overflow-hidden">
              <div>
                <h4 className="font-bold text-foreground text-[16px] truncate">New Hosanna</h4>
                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-wide truncate">4 Mins walk to campus</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-primary text-[15px]">GHS 6,500<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-foreground">4.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* List item 2 */}
          <div className="bg-card border border-border rounded-2xl flex p-3 hover:shadow-md hover:bg-accent/50 transition-all cursor-pointer w-full">
            <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=200&h=200" alt="Blue Haven" className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
            </div>
            <div className="flex-1 ml-4 py-0.5 flex flex-col justify-between overflow-hidden">
              <div>
                <h4 className="font-bold text-foreground text-[16px] truncate">Blue Haven</h4>
                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-wide truncate">Near shuttle stop</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-primary text-[15px]">GHS 550<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-foreground">4.2</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Filter Options Modal */}
      <FilterModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

    </div>
  );
}
