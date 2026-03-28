import { Search, Grid, Wifi, Wind, Tag, Activity, Heart, MapPin, Star, Droplets, Dumbbell, Utensils, WashingMachine } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TopNav from "@/components/TopNav";
import { useState, useRef, useEffect } from "react";

export default function Explore() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors pt-20 pb-20">
      {/* Header */}
      <TopNav rightAction={
        <Search 
          className="w-6 h-6 text-muted-foreground transition-colors hover:text-foreground cursor-pointer" 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
      } />

      {/* Transparent overlay to dismiss search when clicking outside */}
      <div 
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Animated Search Bar Dropdown */}
      <div 
        className={`fixed top-20 left-0 w-full z-40 p-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSearchOpen 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search hostels, locations, or universities..." 
            className="w-full h-12 bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-2xl pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-4 py-2 mt-2 hide-scrollbar overflow-x-auto flex space-x-6 border-b border-border pb-6 transition-colors">
        {/* All - Active */}
        <div className="flex flex-col items-center space-y-2 shrink-0 group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-card border border-orange-500/50 flex items-center justify-center relative shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-colors">
            <Grid className="w-6 h-6 text-orange-500" />
            <div className="absolute inset-0 border-2 border-orange-500 rounded-full" />
          </div>
          <span className="text-xs font-bold text-orange-500">All</span>
        </div>

        {/* WiFi */}
        <div className="flex flex-col items-center space-y-2 shrink-0 group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center transition-colors shadow-sm">
            <Wifi className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">WiFi</span>
        </div>

        {/* AC */}
        <div className="flex flex-col items-center space-y-2 shrink-0 group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center transition-colors shadow-sm">
            <Wind className="w-6 h-6 text-emerald-500" />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">AC</span>
        </div>

        {/* Cheap */}
        <div className="flex flex-col items-center space-y-2 shrink-0 group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center border border-emerald-500/20 transition-colors shadow-sm">
            <Tag className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Cheap</span>
        </div>

        {/* Gym */}
        <div className="flex flex-col items-center space-y-2 shrink-0 group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center transition-colors shadow-sm">
            <Activity className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Gym</span>
        </div>
      </div>

      {/* Main List */}
      <div className="px-4 py-4 space-y-6 bg-accent/30 dark:bg-black/20 transition-colors">
        
        {/* Card 1: Unity Hall */}
        <Card className="bg-card border-border shadow-xl rounded-3xl overflow-hidden p-0 backdrop-blur-sm transition-all hover:shadow-2xl hover:border-primary/20">
          <div className="relative h-[220px]">
            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800&h=400" className="w-full h-full object-cover" alt="Unity Hall" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />

            <Badge className="absolute top-4 left-4 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30 border-none font-semibold text-[10px] px-2 py-0.5 rounded-md backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              12 ROOMS AVAILABLE
            </Badge>

            <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-sm hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </button>
          </div>

          <CardContent className="p-5 pt-2">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Unity Hall</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  <span>Ayeduase, Kumasi</span>
                </div>
              </div>
              <div className="flex items-center bg-background border border-border px-2 py-1 rounded-lg shadow-sm">
                 <Star className="w-3.5 h-3.5 text-primary fill-primary mr-1" />
                 <span className="font-bold text-foreground text-sm">4.8</span>
              </div>
            </div>

            {/* Amenities icons */}
            <div className="flex space-x-4 mb-5 text-sm font-medium text-muted-foreground">
               <div className="flex items-center space-x-1.5"><Wifi className="w-4 h-4 opacity-50" /><span>WiFi</span></div>
               <div className="flex items-center space-x-1.5"><Wind className="w-4 h-4 opacity-50" /><span>AC</span></div>
               <div className="flex items-center space-x-1.5"><Droplets className="w-4 h-4 opacity-50" /><span>Water</span></div>
               <div className="flex items-center space-x-1.5"><Dumbbell className="w-4 h-4 opacity-50" /><span>Gym</span></div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Pricing</p>
                <div className="flex items-baseline">
                   <span className="text-lg font-extrabold text-orange-600 dark:text-orange-500 mr-1">GHS 450</span>
                   <span className="text-xs text-muted-foreground">/bed</span>
                </div>
              </div>
              <Link to="/hostel-details" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 active:translate-y-0">
                 View Details
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Independence Hall */}
        <Card className="bg-card border-border shadow-xl rounded-3xl overflow-hidden p-0 backdrop-blur-sm transition-all hover:shadow-2xl hover:border-primary/20">
          <div className="relative h-[220px]">
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800&h=400" className="w-full h-full object-cover" alt="Independence Hall" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
            
            <Badge className="absolute top-4 left-4 bg-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-500/30 border-none font-semibold text-[10px] px-2 py-0.5 rounded-md backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse" />
              4 ROOMS AVAILABLE
            </Badge>

            <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-sm hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </button>
          </div>

          <CardContent className="p-5 pt-2">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Independence Hall</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  <span>KNUST Main Campus</span>
                </div>
              </div>
              <div className="flex items-center bg-background border border-border px-2 py-1 rounded-lg shadow-sm">
                 <Star className="w-3.5 h-3.5 text-primary fill-primary mr-1" />
                 <span className="font-bold text-foreground text-sm">4.5</span>
              </div>
            </div>

            {/* Amenities icons */}
            <div className="flex space-x-4 mb-5 text-sm font-medium text-muted-foreground">
               <div className="flex items-center space-x-1.5"><Wifi className="w-4 h-4 opacity-50" /><span>WiFi</span></div>
               <div className="flex items-center space-x-1.5"><Utensils className="w-4 h-4 opacity-50" /><span>Canteen</span></div>
               <div className="flex items-center space-x-1.5"><WashingMachine className="w-4 h-4 opacity-50" /><span>Laundry</span></div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Pricing</p>
                <div className="flex items-baseline">
                   <span className="text-lg font-extrabold text-orange-600 dark:text-orange-500 mr-1">GHS 380</span>
                   <span className="text-xs text-muted-foreground">/bed</span>
                </div>
              </div>
              <Link to="/hostel-details" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 active:translate-y-0">
                 View Details
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Loading Dots Indicator */}
        <div className="flex justify-center items-center space-x-1.5 py-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150" />
        </div>

      </div>
    </div>
  );
}
