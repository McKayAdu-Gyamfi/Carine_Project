import { Heart, BedDouble, Star, Settings, ShieldCheck, Bell, ChevronRight, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import TopNav from "@/components/TopNav";
import NotificationsDropdown from "@/components/NotificationsDropdown";
// import { TygerAvatar } from 'tyger-avatar';

export default function Profile() {
  const userAvatar = localStorage.getItem("userAvatar");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans pb-24 relative">
      
      {/* Mobile Header */}
      <div className="lg:hidden">
        <TopNav />
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between px-8 pt-6 pb-6 w-full">
        <h1 className="text-[28px] font-extrabold tracking-tight text-foreground">My account</h1>
        <NotificationsDropdown />
      </header>

      <div className="px-5 lg:px-8 space-y-8 pt-24 lg:pt-0 w-full">
        
        {/* Mobile Header Title */}
        <div className="lg:hidden">
          <h1 className="text-2xl font-bold text-foreground">My account</h1>
        </div>

        {/* Profile Hero Banner Card */}
        <div className="w-full bg-gradient-to-r from-[#3D261B] via-[#7B3C1F] to-[#B85822] rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white shadow-sm relative overflow-hidden">
          
          <div className="flex items-center space-x-5 z-10">
            <div className="w-20 h-20 rounded-full bg-[#E5D0BA] flex items-center justify-center text-[#6c5e57] font-extrabold text-2xl shadow-md border-2 border-white/20 shrink-0 overflow-hidden">
              {/* userAvatar?.startsWith("Tr") ? (
                <TygerAvatar name={userAvatar as any} size="2xl" />
              ) : */}
              {userAvatar?.startsWith("http") ? (
                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span>SA</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl lg:text-[28px] font-extrabold text-white leading-tight">Sarah Adjei</h2>
              <p className="text-sm text-white/80 font-medium mb-3">sarah.adjei@ashesi.edu.gh</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white font-extrabold text-[12px] px-3.5 py-1 rounded-full">
                  Level 300 · Ashesi
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white font-extrabold text-[12px] px-3.5 py-1 rounded-full">
                  Verified student
                </span>
              </div>
            </div>
          </div>

          <Link 
            to="/settings" 
            className="w-full md:w-auto text-center bg-white text-[#3D261B] hover:bg-white/90 font-extrabold text-[15px] px-6 py-2.5 rounded-full transition-all shadow-sm shrink-0 cursor-pointer z-10"
          >
            Edit profile
          </Link>
        </div>

        {/* Current Booking Section */}
        <div>
          <h3 className="text-[12px] font-extrabold text-muted-foreground uppercase tracking-widest mb-3">
            Current booking
          </h3>
          <div className="bg-white dark:bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center space-x-4 flex-1">
              <img 
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80" 
                alt="Tanko Hostel" 
                className="w-[110px] h-[85px] rounded-[18px] object-cover shrink-0" 
              />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-extrabold text-[18px] text-foreground">Tanko Hostel</h4>
                  <span className="bg-[#E6F4EA] text-[#137333] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#137333]" />
                    <span>APPROVED</span>
                  </span>
                </div>
                <p className="text-[13px] text-muted-foreground font-medium mb-3">
                  Room 402B · Premium Studio · Move-in Jan 12, 2026
                </p>
                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-[11px] text-muted-foreground font-medium block">Paid</span>
                    <span className="text-[15px] font-extrabold text-[#137333]">GHS 8,500</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground font-medium block">Semester</span>
                    <span className="text-[15px] font-extrabold text-foreground">Spring 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px]">
            <Heart className="w-5 h-5 text-[#C56A30]" />
            <div>
              <span className="text-[26px] font-extrabold text-foreground block leading-none mb-1">7</span>
              <span className="text-[13px] font-medium text-muted-foreground">Saved hostels</span>
            </div>
          </div>

          <div className="bg-white dark:bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px]">
            <BedDouble className="w-5 h-5 text-[#C56A30]" />
            <div>
              <span className="text-[26px] font-extrabold text-foreground block leading-none mb-1">2</span>
              <span className="text-[13px] font-medium text-muted-foreground">Past bookings</span>
            </div>
          </div>

          <div className="bg-white dark:bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px]">
            <Star className="w-5 h-5 text-[#C56A30]" />
            <div>
              <span className="text-[26px] font-extrabold text-foreground block leading-none mb-1">3</span>
              <span className="text-[13px] font-medium text-muted-foreground">Reviews written</span>
            </div>
          </div>
        </div>

        {/* Settings Links */}
        <div className="bg-white dark:bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden divide-y divide-border/40">
          <Link to="/settings" className="flex items-center justify-between p-5 hover:bg-accent/40 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
              <Settings className="w-5 h-5 text-[#8C5B4F]" />
              <span className="font-bold text-[15px] text-foreground">Account settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>

          <Link to="/settings" className="flex items-center justify-between p-5 hover:bg-accent/40 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
              <ShieldCheck className="w-5 h-5 text-[#8C5B4F]" />
              <span className="font-bold text-[15px] text-foreground">Privacy & security</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>

          <Link to="/settings" className="flex items-center justify-between p-5 hover:bg-accent/40 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-[#8C5B4F]" />
              <span className="font-bold text-[15px] text-foreground">Notifications</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>

          <Link to="/login" className="flex items-center justify-between p-5 hover:bg-red-500/10 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="font-bold text-[15px] text-red-500">Log out</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-500 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

      </div>
    </div>
  );
}
