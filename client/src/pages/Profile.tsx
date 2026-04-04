import { Grid3X3, ShieldCheck, ChevronRight, Moon, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import tanko_hostel_1 from "../assets/Tanko_4.png";


export default function Profile() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const userAvatar = localStorage.getItem("userAvatar") || "👤";
  const userBio = localStorage.getItem("userBio") || "Jus a chill person merhnnnn...";
  const storedPrefs = localStorage.getItem("userPrefs");
  const userPrefs = storedPrefs ? JSON.parse(storedPrefs) : ["Air-Conditioned", "Wi-Fi Included", "Ensuite Bathroom"];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24 font-sans select-none overflow-x-hidden">
      
      {/* Top Header Area */}
      <div className="px-6 pt-12 pb-12 relative z-10 bg-background">
        
        {/* Menu Icon */}
        <div className="flex justify-end mb-8">
          <Link to="/settings" className="block focus:outline-none">
            <Grid3X3 className="w-6 h-6 text-foreground/80 hover:text-primary transition-colors cursor-pointer" />
          </Link>
        </div>
        
        {/* Name & Edit */}
        <div className="flex justify-center mb-5">
          <div className="relative w-[120px] h-[120px] rounded-full p-1 flex items-center justify-center">
            <div className="w-full h-full rounded-full border-[4px] border-background overflow-hidden bg-accent flex items-center justify-center">
              <span className="text-[60px] leading-none mb-1">{userAvatar}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h1 className="text-[28px] font-bold mb-1 tracking-tight">Sarah Adjei</h1>
          <Link to="/edit-profile" className="text-primary font-medium text-[13px] hover:underline transition-all cursor-pointer inline-block">Edit Profile</Link>
        </div>
        
        {/* Bio */}
        <p className="text-center text-muted-foreground text-[13px] px-6 mb-4 leading-relaxed max-w-[320px] mx-auto">
          {userBio}
        </p>

        {/* Room Preferences Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-[320px] mx-auto mb-8">
          {userPrefs.map((pref: string) => (
            <span key={pref} className="px-3 py-1.5 rounded-full border border-border/80 text-[11px] font-extrabold text-foreground/70 bg-transparent">
              {pref}
            </span>
          ))}
        </div>
        
        {/* 3-Column Stats */}
        <div className="flex justify-center items-center divide-x divide-border/60 text-center mb-4">
          <div className="px-5 w-auto">
            <p className="text-[9px] font-extrabold text-primary uppercase tracking-[0.1em] mb-1">University</p>
            <p className="text-[13px] font-semibold text-foreground/90">Ashesi University</p>
          </div>
          <div className="px-5 w-auto">
            <p className="text-[9px] font-extrabold text-primary uppercase tracking-[0.1em] mb-1">Status</p>
            <p className="text-[13px] font-semibold text-foreground/90">Student</p>
          </div>
          <div className="px-5 w-auto">
            <p className="text-[9px] font-extrabold text-primary uppercase tracking-[0.1em] mb-1">Joined</p>
            <p className="text-[13px] font-semibold text-foreground/90">Nov 2024</p>
          </div>
        </div>
        
      </div>

      {/* Overlapping Verification Card */}
      <div className="px-5 -mt-8 relative z-20 mb-8">
        <div className="bg-card border border-border/50 rounded-[28px] p-5 shadow-xl flex items-center justify-between hover:shadow-2xl transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div className="pr-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-[15px]">Verify Student ID</h3>
                <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full">3 steps left &gt;</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-tight">We ask everyone for details to unlock student features. Get a head start!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Layout - Primary Tinted Background */}
      <div className="flex-1 bg-accent/30 dark:bg-primary/5 rounded-t-[40px] pt-8 pb-12 mt-[-4rem] px-5 border-t border-border/30">
        
        <div className="flex items-center justify-between mb-5 pt-8 px-1">
          <h3 className="text-[13px] font-extrabold text-foreground uppercase tracking-[0.08em]">Your Bookings</h3>
          <Link to="/manage-bookings" className="text-primary text-[13px] font-bold hover:underline cursor-pointer">Edit &gt;</Link>
        </div>
        
        {/* Horizontal Booking Cards */}
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-6 px-1">
          
          {/* Booking Card 1 */}
          <Link to="/hostel-details" className="block outline-none shrink-0 w-[240px]">
            <div className="bg-card rounded-[24px] overflow-hidden shadow-md border border-border/40 hover:shadow-xl transition-all group">
               <div className="h-[140px] relative overflow-hidden bg-muted">
                 <img src={tanko_hostel_1} className="w-full h-[105%] -mt-[1%] object-cover group-hover:scale-105 transition-transform duration-700" alt="Unity Hall" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                 <div className="absolute bottom-3 left-3">
                   <span className="bg-background/95 backdrop-blur-md text-foreground px-3 py-1.5 text-[9px] font-extrabold rounded-lg uppercase tracking-wider shadow-sm">In-Progress</span>
                 </div>
               </div>
               <div className="p-4 bg-card">
                  <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1">Sem 1 2024</p>
                  <h4 className="font-bold text-[15px] truncate">Tanko Hostel • Room 402B</h4>
               </div>
            </div>
          </Link>
          
          {/* Booking Card 2 */}
          <Link to="/explore" className="block outline-none shrink-0 w-[240px]">
             <div className="bg-card rounded-[24px] overflow-hidden shadow-md border border-border/40 hover:shadow-xl transition-all group opacity-80 hover:opacity-100">
               <div className="h-[140px] relative overflow-hidden bg-muted flex items-center justify-center border-b border-border/40">
                 <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/40 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    <span className="text-xl text-muted-foreground/50 group-hover:text-primary transition-colors">+</span>
                 </div>
               </div>
               <div className="p-4 bg-muted/10 text-center">
                  <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1">Next Semester</p>
                  <h4 className="font-bold text-muted-foreground text-[14px] truncate">Explore new locations</h4>
               </div>
            </div>
          </Link>
          
        </div>
        
        {/* Settings Links */}
        <div className="mt-6 flex flex-col space-y-3 px-1">
          
          {/* Account Settings */}
          <Link to="/settings" className="flex items-center justify-between w-full px-5 py-4 bg-card rounded-[24px] shadow-sm border border-border/40 hover:bg-accent/50 transition-colors cursor-pointer block outline-none">
            <div className="flex items-center space-x-4">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold text-[15px]">Account Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
          
          {/* Dark Mode Toggle */}
          <div 
            className="flex items-center justify-between w-full px-5 py-4 bg-card rounded-[24px] shadow-sm border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          >
            <div className="flex items-center space-x-4">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold text-[15px]">Dark Mode</span>
            </div>
            <div className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 shadow-inner ${isDarkMode ? 'bg-[#60A5FA] justify-end' : 'bg-muted border border-border justify-start'}`}>
              <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${isDarkMode ? 'bg-[#0B101E]' : 'bg-primary'}`} />
            </div>
          </div>
          
          {/* Sign Out */}
          <Link to="/login" className="flex items-center justify-between w-full px-5 py-4 bg-card rounded-[24px] shadow-sm border border-border/40 hover:bg-red-500/10 transition-colors group">
            <div className="flex items-center space-x-4">
              <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
              <span className="font-bold text-[15px] text-red-400 group-hover:text-red-500 transition-colors">Sign Out</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>
          
        </div>
      </div>
      
    </div>
  );
}
