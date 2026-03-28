import { useState } from "react";
import { Building2, ArrowRight, Shield, HelpCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AVATARS = [
  "🦊", "🐺", "🦝", "🐼", "🐸", "🌞", "🐻‍❄️", 
  "🐢", "🦅", "🦉", "🐤", "🐙", "🦌", "🐶", 
  "🐪", "🐯", "🐧", "⛄", "🐻", "🌍", "💀", 
  "🦄", "🐉", "🐱", "🐭", "🐰", "🧟", "🐴",
  "🦘", "👹", "👾", "🦖"
];

export default function Login() {
  const [step, setStep] = useState<"login" | "avatar">("login");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep("avatar");
  };

  const handleComplete = () => {
    if (selectedAvatar) {
      localStorage.setItem("userAvatar", selectedAvatar);
      navigate("/");
    }
  };

  if (step === "avatar") {
    return (
      <div className="flex flex-col min-h-screen bg-[#0B101E] text-white p-6 justify-center items-center select-none animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="w-full max-w-[380px] bg-[#13192B] border border-white/5 rounded-[40px] p-8 shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl font-extrabold mb-2 text-center tracking-tight">Choose your avatar</h2>
          <p className="text-gray-400 mb-8 text-center font-medium text-sm">Pick a fun profile character to represent you</p>
          
          <div className="grid grid-cols-4 gap-3 w-full mb-10 max-h-[45vh] overflow-y-auto hide-scrollbar p-2">
            {AVATARS.map((avatar, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedAvatar(avatar)}
                className={`aspect-square flex items-center justify-center text-4xl rounded-2xl transition-all duration-300 cursor-pointer ${
                  selectedAvatar === avatar 
                    ? 'bg-[#60A5FA] scale-110 shadow-[0_0_20px_rgba(96,165,250,0.5)] ring-4 ring-white/20 z-10' 
                    : 'bg-white/5 hover:bg-white/10 hover:scale-105'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>

          <button 
            onClick={handleComplete}
            disabled={!selectedAvatar}
            className={`w-full h-14 rounded-full font-bold text-[15px] flex items-center justify-center transition-all duration-300 ${
              selectedAvatar 
                ? 'bg-[#60A5FA] hover:bg-blue-400 text-blue-950 shadow-[0_0_30px_rgba(96,165,250,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer' 
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedAvatar ? (
              <span className="flex items-center space-x-2">
                <span>Ready to go</span>
                <CheckCircle2 className="w-5 h-5" />
              </span>
            ) : "Select an Avatar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B101E] text-white p-6 justify-between select-none">
      
      {/* Top Section */}
      <div className="flex flex-col items-center mt-12 mb-8">
        <div className="w-16 h-16 bg-blue-400 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(96,165,250,0.3)] border-[3px] border-[#0B101E]">
          <Building2 className="w-8 h-8 text-[#0B101E] fill-current" />
        </div>
        <h1 className="text-xl font-extrabold tracking-widest text-blue-300 mb-2">CampusPulse</h1>
        <h2 className="text-[32px] font-extrabold text-center leading-tight">Your Campus Home<br/>Awaits</h2>
      </div>

      {/* Main Login Card Area */}
      <div className="w-full max-w-[340px] mx-auto flex-1 flex flex-col justify-center mb-8">
        
        <div className="mb-6">
          <h3 className="text-[22px] font-bold mb-2">Get Started</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-medium">Use your institutional credentials to enter the pulse.</p>
        </div>

        <button onClick={handleLoginClick} className="w-full bg-[#60A5FA] hover:bg-blue-400 text-blue-950 rounded-[28px] h-14 flex items-center justify-between px-6 font-bold text-[15px] shadow-[0_0_30px_rgba(96,165,250,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
          <div className="flex space-x-1">
            <span className="w-2.5 h-2.5 bg-red-400 rounded-sm" />
            <span className="w-2.5 h-2.5 bg-green-400 rounded-sm" />
            <span className="w-2.5 h-2.5 bg-blue-300 rounded-sm" />
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-sm" />
          </div>
          <span>Sign in with School Email</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        
        {/* Divider */}
        <div className="flex items-center justify-center space-x-4 my-8">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Management Access</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* Secondary Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="h-[60px] bg-[#13192B] border border-white/5 rounded-3xl flex items-center justify-center space-x-2 font-semibold text-sm hover:bg-white/10 transition-colors shadow-sm cursor-pointer">
            <Shield className="w-4 h-4 text-gray-300" />
            <span className="leading-tight text-left">Login as<br/>Manager</span>
          </button>
          <button className="h-[60px] bg-[#13192B] border border-white/5 rounded-3xl flex items-center justify-center space-x-2 font-semibold text-sm hover:bg-white/10 transition-colors shadow-sm cursor-pointer">
            <HelpCircle className="w-4 h-4 text-gray-300" />
            <span>Help</span>
          </button>
        </div>
      </div>

      {/* Bottom Promo Image */}
      <div className="w-full max-w-[340px] mx-auto relative h-40 rounded-[32px] border border-white/10 overflow-hidden shadow-2xl mb-8">
        <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fit=crop&w=600&h=300" alt="Promo" className="w-full h-full object-cover mix-blend-luminosity opacity-60 hover:mix-blend-normal hover:opacity-100 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-orange-400 text-orange-950 text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Only 2 rooms left</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold tracking-[0.1em] pb-2">
        <p className="leading-tight">© 2024 CAMPUS<br/>PULSE NETWORK</p>
        <div className="flex space-x-4">
          <span className="cursor-pointer hover:text-white transition-colors">PRIVACY</span>
          <span className="cursor-pointer hover:text-white transition-colors">TERMS</span>
          <span className="cursor-pointer hover:text-white transition-colors">SAFETY</span>
        </div>
      </div>

    </div>
  );
}
