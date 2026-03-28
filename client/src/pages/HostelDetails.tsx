import { ArrowLeft, Heart, Share2, MapPin, Star, ShieldCheck, Fingerprint, Wifi, Thermometer, Dumbbell, WashingMachine, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function HostelDetails() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors pb-24">
      {/* Hero Image Section */}
      <div className="relative w-full h-[350px]">
        <img 
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1000&h=800" 
          alt="Unity Hall exterior" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background pointer-events-none" />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex items-center justify-between z-10">
          <Link to="/" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-sm hover:bg-black/60 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-sm hover:bg-black/60 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-sm hover:bg-black/60 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-1.5">
          <div className="w-6 h-1 bg-primary rounded-full shadow-sm"></div>
          <div className="w-1.5 h-1.5 bg-white/60 dark:bg-white/40 rounded-full shadow-sm"></div>
          <div className="w-1.5 h-1.5 bg-white/60 dark:bg-white/40 rounded-full shadow-sm"></div>
          <div className="w-1.5 h-1.5 bg-white/60 dark:bg-white/40 rounded-full shadow-sm"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 -mt-2 relative z-10">
        
        {/* Title & Header info */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground leading-tight">Unity Hall</h1>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span className="text-sm">Main Campus, West Wing Avenue</span>
            </div>
          </div>
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-500 border border-orange-500/30 px-2.5 py-1 whitespace-nowrap ml-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse" />
            TRENDING
          </Badge>
        </div>

        {/* Reviews snippet */}
        <div className="flex items-center space-x-1 mb-6 mt-2">
          <div className="flex items-center">
             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
             <span className="text-sm font-bold text-foreground ml-1">4.8</span>
          </div>
          <span className="text-xs text-muted-foreground underline decoration-muted-foreground/30 hover:text-foreground cursor-pointer transition-colors">(254 reviews)</span>
        </div>

        {/* About Card */}
        <div className="bg-card rounded-2xl p-5 border border-border mb-6 shadow-sm transition-colors">
          <h3 className="text-lg font-bold text-foreground mb-2">About the Residency</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            Designed for the modern scholar, Unity Hall redefines student living. Nestled directly on the <span className="text-primary font-semibold">Main Campus</span>, it offers a seamless blend of academic focus and social vitality. Our spaces are curated to foster collaboration while respecting your need for quiet study.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge variant="outline" className="text-xs rounded-full border-border text-muted-foreground bg-accent/50 font-medium">#QuietHours</Badge>
            <Badge variant="outline" className="text-xs rounded-full border-border text-muted-foreground bg-accent/50 font-medium">#StudentFriendly</Badge>
            <Badge variant="outline" className="text-xs rounded-full border-border text-muted-foreground bg-accent/50 font-medium">#StudyHub</Badge>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Verification</p>
                <p className="text-xs font-medium text-foreground">Campus Approved</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Fingerprint className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Security</p>
                <p className="text-xs font-medium text-foreground">24/7 Biometrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Header */}
        <h3 className="text-lg font-bold text-foreground mb-3">Premium Amenities</h3>
        
        {/* Amenities Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Card className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-start">
              <Wifi className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm font-bold text-foreground mb-0.5">Gigabit WiFi</p>
              <p className="text-[10px] text-muted-foreground">Fiber to your room</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-start">
              <Thermometer className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm font-bold text-foreground mb-0.5">Climate Control</p>
              <p className="text-[10px] text-muted-foreground">Personal A/C unit</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-start">
              <Dumbbell className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm font-bold text-foreground mb-0.5">24hr Gym</p>
              <p className="text-[10px] text-muted-foreground">Cardio & Weights</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-start">
              <WashingMachine className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm font-bold text-foreground mb-0.5">Smart Laundry</p>
              <p className="text-[10px] text-muted-foreground">In-app Tracking</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Spaces */}
        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center justify-between">
          Available Spaces
        </h3>

        <div className="space-y-4 mb-8">
          {/* Card 1 */}
          <Link to="/booking">
            <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="h-40 relative">
                <img src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=800&h=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Executive Single" />
                <Badge className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white border border-white/20 font-semibold text-xs shadow-sm">Premium Setup</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">Executive Single Studio</h4>
                  <div className="text-right">
                    <p className="text-orange-600 dark:text-orange-500 text-xs font-bold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">Only 2 left!</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4 pr-10">Private bathroom, ergonomic workstation, and sunset balcony view. Fully furnished with premium oak finishes.</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3 text-xs text-muted-foreground font-medium">
                    <span>📐 24m²</span>
                    <span>🛏️ 1 Bed</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-xl font-extrabold text-foreground mr-1">$450</span>
                    <span className="text-[10px] text-muted-foreground">/ month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card 2 */}
          <Link to="/booking">
            <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group opacity-85 hover:opacity-100">
              <div className="h-32 relative">
                <img src="https://images.unsplash.com/photo-1522771731470-ea13a6bcfbc5?auto=format&fit=crop&q=80&w=800&h=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Standard Double" />
                <Badge className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white border border-white/20 font-semibold text-xs shadow-sm">Value Choice</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-foreground text-md group-hover:text-primary transition-colors">Standard Shared Double</h4>
                  <Badge variant="outline" className="text-[10px] border-border text-muted-foreground bg-accent/20">Shared</Badge>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-3 text-xs text-muted-foreground font-medium">
                    <span>📐 32m²</span>
                    <span>🛏️ 2 Beds</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-lg font-extrabold text-foreground mr-1">$280</span>
                    <span className="text-[10px] text-muted-foreground">/ month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 flex items-center justify-between transition-colors">
        <div>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase">Starts From</p>
          <div className="flex items-baseline">
             <span className="text-2xl font-extrabold text-foreground mr-1">$280</span>
             <span className="text-xs text-muted-foreground">/mo</span>
          </div>
        </div>
        <Link to="/booking" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 px-8 rounded-full shadow-lg shadow-primary/30 flex items-center transition-transform hover:-translate-y-0.5 active:translate-y-0">
          BOOK NOW <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
