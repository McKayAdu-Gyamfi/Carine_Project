import { useState } from "react";
import { ArrowRight, Shield, HelpCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);
    try {
      const u = await signIn(email, password);
      // Determine destination based on server-assigned role
      if (u?.user_type === "HOSTEL_MANAGER" || u?.user_type === "ADMIN") {
        navigate("/manager");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Visual only for now per requirements
    setLoginError("Microsoft login is currently disabled. Please use email.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-6 justify-between select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-center w-full mb-4 mt-8">
        <Logo />
      </div>

      {/* Main Login Card Area */}
      <div className="w-full max-w-[340px] mx-auto flex-1 flex flex-col justify-center mb-8 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="mb-8 text-center">
          <h2 className="text-[28px] font-extrabold leading-tight mb-2 tracking-tight">Your Campus<br/>Home Awaits</h2>
          <p className="text-xs text-muted-foreground font-medium">Log in to explore exclusive student spaces.</p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-bold text-center">
            {loginError}
          </div>
        )}

        {/* Microsoft Auth */}
        <button onClick={handleMicrosoftClick} className="w-full bg-card border border-border shadow-sm hover:shadow-md hover:bg-accent text-foreground rounded-lg h-12 flex items-center justify-center space-x-3 font-bold text-[13px] transition-all cursor-pointer mb-6 transform hover:-translate-y-0.5">
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4 mr-1">
            <div className="bg-[#F25022]" />
            <div className="bg-[#7FBA00]" />
            <div className="bg-[#00A4EF]" />
            <div className="bg-[#FFB900]" />
          </div>
          <span>Sign in with Microsoft</span>
        </button>
        
        {/* Divider */}
        <div className="flex items-center justify-center space-x-4 mb-6 opacity-70">
          <div className="h-px bg-border flex-1" />
          <span className="text-[9px] font-extrabold tracking-[0.2em] text-muted-foreground uppercase">Or use email</span>
          <div className="h-px bg-border flex-1" />
        </div>

        {/* Fallback Auth */}
        <form className="flex flex-col space-y-4" onSubmit={handleLoginSubmit}>
          <div className="space-y-1.5">
             <label className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
             <Input 
               type="email" 
               required 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="student@university.edu" 
               className="h-12 rounded-lg bg-card border-border/60 text-[13px] font-medium placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-primary/50" 
             />
          </div>
          
          <div className="space-y-1.5">
             <div className="flex items-center justify-between ml-1">
               <label className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Password</label>
               <a href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot?</a>
             </div>
             <Input 
               type="password" 
               required 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="••••••••" 
               className="h-12 rounded-lg bg-card border-border/60 text-[13px] font-medium placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-primary/50" 
             />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 mt-4 bg-primary hover:bg-primary/90 disabled:opacity-70 text-primary-foreground font-bold text-[13px] rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Management Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/50">
          <button className="h-12 bg-card border border-border rounded-lg flex items-center justify-center space-x-2 font-bold text-[11px] hover:bg-accent transition-colors shadow-sm cursor-pointer text-muted-foreground hover:text-foreground">
            <Shield className="w-4 h-4" />
            <span>Manager</span>
          </button>
          <button className="h-12 bg-card border border-border rounded-lg flex items-center justify-center space-x-2 font-bold text-[11px] hover:bg-accent transition-colors shadow-sm cursor-pointer text-muted-foreground hover:text-foreground">
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-muted-foreground font-bold tracking-[0.1em] pb-2">
        <p className="leading-tight uppercase opacity-60">© 2026 CampusNest</p>
        <div className="flex space-x-4 opacity-60">
          <span className="cursor-pointer hover:text-foreground transition-colors hover:opacity-100">PRIVACY</span>
          <span className="cursor-pointer hover:text-foreground transition-colors hover:opacity-100">TERMS</span>
        </div>
      </div>

    </div>
  );
}
