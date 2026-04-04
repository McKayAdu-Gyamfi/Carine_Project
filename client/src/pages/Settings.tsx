import { ChevronLeft, User, CreditCard, Bell, Shield, HelpCircle, FileText, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-20 border-b border-border/50 sticky top-0 bg-background z-50">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-accent rounded-full transition-colors cursor-pointer">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Account Settings</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="px-5 py-6 space-y-8">
        
        {/* Section 1 */}
        <div>
          <h2 className="text-[12px] font-extrabold uppercase tracking-widest text-muted-foreground mb-3 pl-2">Account</h2>
          <div className="bg-card border border-border/40 rounded-[28px] overflow-hidden shadow-sm">
            <Link to="/edit-profile" className="flex items-center justify-between p-5 border-b border-border/50 hover:bg-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-primary" />
                <span className="font-bold text-[15px]">Personal Information</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
            <div className="flex items-center justify-between p-5 hover:bg-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <CreditCard className="w-5 h-5 text-orange-400" />
                <span className="font-bold text-[15px]">Payments & Payouts</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-[12px] font-extrabold uppercase tracking-widest text-muted-foreground mb-3 pl-2">Preferences</h2>
          <div className="bg-card border border-border/40 rounded-[28px] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-border/50 hover:bg-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <Bell className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-[15px]">Notifications</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="flex items-center justify-between p-5 hover:bg-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-[15px]">Privacy & Security</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-[12px] font-extrabold uppercase tracking-widest text-muted-foreground mb-3 pl-2">Support</h2>
          <div className="bg-card border border-border/40 rounded-[28px] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-border/50 hover:bg-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <span className="font-bold text-[15px]">Help Center</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="flex items-center justify-between p-5 hover:bg-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-bold text-[15px]">Terms of Service</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6 pb-12">
           <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase">Version 1.0.0 (MVP)</p>
        </div>

      </div>
    </div>
  );
}
