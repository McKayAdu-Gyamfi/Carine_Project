import { ArrowLeft, Calendar as CalendarIcon, Flame, Lock, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Booking() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors pb-6">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-8 pb-4 sticky top-0 z-50 bg-background/90 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <Link to="/hostel-details" className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border text-foreground shadow-sm hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Complete Booking</h1>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="px-4 py-2 mb-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-muted rounded-full z-0" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary w-1/3 rounded-full z-0" />
          
          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md shadow-primary/30">1</div>
            <span className="text-[10px] font-semibold text-primary mt-1">Dates</span>
          </div>
          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-full bg-card border-2 border-border text-muted-foreground flex items-center justify-center font-bold text-sm bg-background">2</div>
            <span className="text-[10px] font-semibold text-muted-foreground mt-1">Details</span>
          </div>
          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-full bg-card border-2 border-border text-muted-foreground flex items-center justify-center font-bold text-sm bg-background">3</div>
            <span className="text-[10px] font-semibold text-muted-foreground mt-1">Payment</span>
          </div>
        </div>
      </div>

      {/* Selected Unit Summary */}
      <div className="px-4 mb-6">
        <Card className="bg-card border-border shadow-sm rounded-2xl overflow-hidden p-3 flex space-x-3 transition-colors">
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
            <img src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=400&h=400" className="w-full h-full object-cover" alt="Selected Room" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-1">
              <Badge className="bg-primary/10 text-primary border-none text-[8px] px-1.5 py-0">Executive SingleStudio</Badge>
            </div>
            <h3 className="font-bold text-foreground text-sm">Unity Hall</h3>
            <p className="text-xs text-muted-foreground mt-0.5">1 Bed • Private Bath</p>
          </div>
        </Card>
      </div>

      {/* Custom Calendar Section */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Select Duration</h2>
          <div className="flex items-center space-x-1.5 bg-orange-500/10 px-2 py-1 rounded-md text-orange-600 dark:text-orange-500">
             <Flame className="w-3.5 h-3.5" />
             <span className="text-[10px] font-bold">High Demand</span>
          </div>
        </div>

        <Card className="bg-card border-border shadow-md rounded-3xl p-5 mb-4 transition-colors">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-foreground hover:bg-border transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-foreground">September 2024</span>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-foreground hover:bg-border transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-muted-foreground uppercase">{day}</div>
            ))}
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-sm font-medium">
            {/* Empty boxes for offset */}
            <div className="py-2 opacity-0">...</div>
            <div className="py-2 opacity-0">...</div>
            <div className="py-2 opacity-0">...</div>
            <div className="py-2 text-muted-foreground">1</div>
            <div className="py-2 text-muted-foreground">2</div>
            <div className="py-2 text-muted-foreground">3</div>
            <div className="py-2 text-muted-foreground">4</div>
            <div className="py-2 text-foreground">5</div>
            <div className="py-2 text-foreground">6</div>
            <div className="py-2 text-foreground">7</div>
            <div className="py-2 text-foreground">8</div>
            <div className="py-2 text-foreground">9</div>
            <div className="py-2 bg-primary text-primary-foreground rounded-l-full relative shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10">10</div>
            <div className="py-2 bg-primary/20 text-primary relative"><div className="absolute inset-y-0 -left-2 -right-2 bg-primary/20 z-0"></div><span className="relative z-10">11</span></div>
            <div className="py-2 bg-primary/20 text-primary relative"><div className="absolute inset-y-0 -left-2 -right-2 bg-primary/20 z-0"></div><span className="relative z-10">12</span></div>
            <div className="py-2 bg-primary/20 text-primary relative"><div className="absolute inset-y-0 -left-2 -right-2 bg-primary/20 z-0"></div><span className="relative z-10">13</span></div>
            <div className="py-2 bg-primary/20 text-primary relative"><div className="absolute inset-y-0 -left-2 -right-2 bg-primary/20 z-0"></div><span className="relative z-10">14</span></div>
            <div className="py-2 bg-primary text-primary-foreground rounded-r-full shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 relative">15</div>
            <div className="py-2 text-foreground">16</div>
            <div className="py-2 text-foreground">17</div>
            <div className="py-2 text-foreground">18</div>
            <div className="py-2 text-foreground">19</div>
            <div className="py-2 text-foreground">20</div>
            <div className="py-2 text-foreground">21</div>
            <div className="py-2 text-foreground">22</div>
            <div className="py-2 text-foreground">23</div>
            <div className="py-2 text-foreground">24</div>
            <div className="py-2 text-foreground">25</div>
            <div className="py-2 text-foreground">26</div>
            <div className="py-2 text-foreground">27</div>
            <div className="py-2 text-foreground">28</div>
            <div className="py-2 text-foreground">29</div>
            <div className="py-2 text-foreground">30</div>
          </div>
        </Card>

        {/* Selected Dates Summary */}
        <div className="grid grid-cols-2 gap-3">
           <Card className="bg-card border-border p-3 rounded-2xl transition-colors">
              <div className="flex items-center text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-1.5">
                <CalendarIcon className="w-3 h-3 mr-1" /> Check in
              </div>
              <p className="font-bold text-foreground text-sm">10 Sep 2024</p>
              <p className="text-xs text-muted-foreground mt-0.5">14:00 PM</p>
           </Card>
           <Card className="bg-card border-border p-3 rounded-2xl transition-colors">
              <div className="flex items-center text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-1.5">
                <CalendarIcon className="w-3 h-3 mr-1" /> Check out
              </div>
              <p className="font-bold text-foreground text-sm">15 Sep 2024</p>
              <p className="text-xs text-muted-foreground mt-0.5">11:00 AM</p>
           </Card>
        </div>
      </div>

      {/* Bill Breakdown */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4">Price Breakdown</h2>
        <Card className="bg-card border-border shadow-sm rounded-3xl p-5 mb-4 transition-colors">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
               <span className="text-muted-foreground">Standard Rate (<span className="text-foreground font-medium">5 nights</span>)</span>
               <span className="font-bold text-foreground text-base">GHS 2,250</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-muted-foreground">Cleaning Fee</span>
               <span className="font-bold text-foreground">GHS 150</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-muted-foreground">Service Fee</span>
               <span className="font-bold text-foreground">GHS 85</span>
            </div>
            
            <div className="h-px w-full bg-border my-2" />
            
            <div className="flex justify-between items-center">
               <span className="font-bold text-foreground">Total (GHS)</span>
               <span className="font-extrabold text-primary text-2xl">GHS 2,485</span>
            </div>
          </div>
        </Card>
        
        <div className="flex items-center justify-center space-x-1.5 text-xs text-muted-foreground px-4 text-center">
           <Lock className="w-3 h-3 text-emerald-500" />
           <span>Secure SSL encrypted payment processing.</span>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-4 mt-auto">
        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] flex justify-center items-center transition-transform active:scale-[0.98]">
           Proceed to Details <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>

    </div>
  );
}
