import { useState, useEffect } from "react";
import { Shield, CheckCircle2, Eye, EyeOff, CheckCircle, Monitor, BookOpen, Search, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";

// import { TygerAvatar } from 'tyger-avatar';

const AVATARS = [
  "TrChelsea", "TrEric", "TrSamantha", "TrTorsten", "TrIggy", 
  "TrFranklin", "TrImran", "TrMaria", "TrRachel", "TrShamila", 
  "TrAlex", "TrFelix", "TrEnrique", "TrSophia", "TrHarry", 
  "TrHelen", "TrStu", "TrNancy", "TrChad"
];

export default function Login() {
  const [step, setStep] = useState<"institution" | "login" | "avatar">("institution");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [institutionQuery, setInstitutionQuery] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signin');
  const [showMobileForm, setShowMobileForm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const INSTITUTIONS = [
    { id: 'ashesi', name: 'Ashesi University', location: 'Berekuso', abbr: 'AU' },
    { id: 'ug', name: 'Univ. of Ghana', location: 'Legon', abbr: 'UG' },
    { id: 'knust', name: 'KNUST', location: 'Kumasi', abbr: 'KN' },
    { id: 'gimpa', name: 'GIMPA', location: 'Achimota', abbr: 'GI' }
  ];

  const filteredInstitutions = INSTITUTIONS.filter(inst => 
    inst.name.toLowerCase().includes(institutionQuery.toLowerCase()) || 
    inst.abbr.toLowerCase().includes(institutionQuery.toLowerCase())
  );

  const handleLoginClick = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    // setStep("avatar");
    localStorage.setItem("userAvatar", "SA");
    navigate("/");
  };

  const handleComplete = () => {
    if (selectedAvatar) {
      localStorage.setItem("userAvatar", selectedAvatar);
      navigate("/");
    }
  };

  const handleManagerLogin = () => {
    localStorage.setItem("userAvatar", "manager-admin");
    navigate("/manager");
  };

  if (step === "institution") {
    return (
      <div className="flex flex-col h-[100dvh] w-full overflow-hidden relative font-sans bg-[#F8F6F3] sm:bg-gradient-to-br sm:from-[#4A2E1B] sm:to-[#2A1A0F]">
        {/* Floating background circles - Desktop Only */}
        <div 
          className="hidden sm:block absolute top-[-10%] right-[-15%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ backgroundColor: '#6B4226', animation: 'float 15s ease-in-out infinite' }}
        />
        <div 
          className="hidden sm:block absolute bottom-[-15%] left-[-15%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ backgroundColor: '#5C361D', animation: 'float 18s ease-in-out infinite 5s' }}
        />
        <div 
          className="hidden sm:block absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{ backgroundColor: '#452714', animation: 'float 22s ease-in-out infinite 2s' }}
        />

        {/* Top Header - Desktop Only */}
        <div className="hidden sm:block absolute top-8 left-8 z-10">
          <Logo iconClassName="h-10 w-auto brightness-0 invert" textClassName="text-xl font-bold tracking-tight text-white" />
        </div>

        {/* Center Card */}
        <div className="flex-1 flex items-center justify-center z-10 p-0 sm:p-6 h-full overflow-hidden">
          <div className="bg-transparent sm:bg-[#F8F6F3] sm:rounded-[28px] shadow-none sm:shadow-2xl sm:shadow-black/20 w-full h-full sm:h-auto max-w-[540px] p-6 pb-8 pt-8 sm:p-10 flex flex-col">
            
            {/* Progress Bar */}
            <div className="flex items-center w-full mb-8">
              <div className="flex-1 flex items-center space-x-4">
                <div className="flex-1 h-1.5 bg-[#E5E0D8] rounded-full overflow-hidden">
                  <div className="h-full bg-canyon rounded-full w-1/2"></div>
                </div>
                <span className="text-xs font-bold text-[#8C8279] whitespace-nowrap">2 / 4</span>
              </div>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-[28px] font-extrabold tracking-tight text-[#463C38] mb-1.5">
                Where do you study?
              </h1>
              <p className="text-[15px] text-[#8C8279] font-medium">
                We'll show hostels closest to your campus.
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A29A91] w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Search university..." 
                value={institutionQuery}
                onChange={(e) => setInstitutionQuery(e.target.value)}
                className="h-12 w-full pl-12 pr-4 bg-white border-[#E5E0D8] rounded-xl text-[15px] font-medium text-[#463C38] focus-visible:ring-2 focus-visible:ring-canyon/30 focus-visible:border-canyon placeholder:text-[#A29A91] transition-all shadow-sm"
              />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 flex-1 sm:flex-none overflow-y-auto sm:overflow-visible pr-2 sm:pr-0 pb-12 sm:pb-0 hide-scrollbar">
              {filteredInstitutions.map((inst) => {
                const isSelected = selectedInstitution === inst.id;
                return (
                  <button 
                    key={inst.id}
                    onClick={() => setSelectedInstitution(inst.id)}
                    className={`flex items-center text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-canyon bg-canyon/5 shadow-sm' 
                        : 'border-border/60 bg-transparent hover:border-border hover:bg-white/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[14px] flex-shrink-0 mr-3 ${
                      isSelected ? 'bg-canyon/10 text-canyon' : 'bg-muted text-muted-foreground'
                    }`}>
                      {inst.abbr}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[13px] text-[#463C38] truncate">{inst.name}</div>
                      <div className="text-[11px] font-medium text-[#8C8279] truncate">{inst.location}</div>
                    </div>
                    {isSelected && (
                      <div className="ml-2 w-5 h-5 rounded-full bg-canyon flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Buttons */}
            <div className="mt-auto pt-4 flex items-center space-x-4 w-full">
              <button 
                onClick={() => {
                  if (selectedInstitution) setStep("login");
                }}
                className={`flex-1 h-[52px] sm:h-12 w-full rounded-full font-bold text-[16px] sm:text-[14px] transition-all flex items-center justify-center shadow-md ${
                  selectedInstitution 
                    ? 'bg-canyon text-white hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'
                }`}
                disabled={!selectedInstitution}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "avatar") {
    return (
      <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-background text-foreground p-6 justify-center items-center select-none animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="w-full max-w-[380px] bg-card border border-border rounded-lg p-8 shadow-xl flex flex-col items-center">
          <Logo className="mb-6 scale-90" />
          <h2 className="text-2xl font-extrabold mb-1 text-center tracking-tight">Choose your avatar</h2>
          <p className="text-muted-foreground mb-8 text-center font-medium text-xs">Pick a fun profile character to represent you</p>
          
          <div className="grid grid-cols-4 gap-3 w-full mb-10 max-h-[45vh] overflow-y-auto hide-scrollbar p-1">
            {AVATARS.map((avatar, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedAvatar(avatar)}
                className={`aspect-square flex items-center justify-center p-1 rounded-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                  selectedAvatar === avatar 
                    ? 'bg-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 z-10 shadow-lg' 
                    : 'bg-muted hover:bg-accent hover:scale-105'
                }`}
              >
                {/* <TygerAvatar name={avatar as any} size="xl" /> */}
                <span className="text-[20px] font-bold">{avatar.slice(2,4)}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={handleComplete}
            disabled={!selectedAvatar}
            className={`w-full h-12 rounded-lg font-bold text-sm flex items-center justify-center transition-all duration-300 ${
              selectedAvatar 
                ? 'bg-primary text-primary-foreground shadow-md hover:opacity-90 active:scale-[0.98] cursor-pointer' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {selectedAvatar ? (
              <span className="flex items-center space-x-2">
                <span>Ready to go</span>
                <CheckCircle2 className="w-4 h-4" />
              </span>
            ) : "Select an Avatar"}
          </button>
        </div>
      </div>
    );
  }

  // ── Login Step: Split-screen layout ──
  return (
    <div className="flex h-[100dvh] w-full overflow-hidden select-none bg-soft-linen relative">
      
      {/* ─── Left Panel ─── */}
      <div className={`${showMobileForm ? 'hidden' : 'flex'} w-full lg:w-[45%] h-full relative overflow-hidden flex-col justify-between bg-gradient-to-br from-[#6c5e57] to-ironwood`}
      >
        {/* Diagonal stripe pattern overlay */}
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,1) 10px, rgba(255,255,255,1) 12px)',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-8 pb-10 lg:p-10 overflow-y-auto hide-scrollbar">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5">
            <Logo iconClassName="h-14 w-auto brightness-0 invert" textClassName="text-2xl font-bold tracking-tight text-white" />
          </div>
          
          {/* Middle area with carousel */}
          <div className="flex-1 flex flex-col justify-end lg:justify-center mt-18 lg:mt-24 pb-6 lg:pb-0">
            {/* Carousel Indicators */}
            <div className="flex items-center space-x-2 mb-4">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === 0 ? 'w-8 bg-canyon' : 'w-2 bg-white/30'}`} />
              <div className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === 1 ? 'w-8 bg-canyon' : 'w-2 bg-white/30'}`} />
              <div className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === 2 ? 'w-8 bg-canyon' : 'w-2 bg-white/30'}`} />
            </div>

            <div className="grid w-full items-center">
              {/* Slide 1 */}
              <div className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${activeSlide === 0 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none -z-10'}`}>
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 border border-white/25 rounded-full backdrop-blur-sm">
                    CAMPUS / HOSTEL AT DUSK
                  </span>
                </div>
                <h2 className="text-white text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight mb-5">
                  Find your perfect<br/>room near campus
                </h2>
                <p className="text-white/90 text-[16px] font-medium leading-relaxed max-w-[90%]">
                  Browse verified hostels around Ashesi, tour rooms in 360°, and book your semester in minutes.
                </p>
              </div>

              {/* Slide 2 */}
              <div className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${activeSlide === 1 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none -z-10'}`}>
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 border border-white/25 rounded-full backdrop-blur-sm">
                    Hostel Courtyard
                  </span>
                </div>
                <h2 className="text-white text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight mb-8">
                  Your next home is<br/>a few clicks away.
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4.5 h-4.5 text-white/90" />
                    </div>
                    <span className="text-white/90 text-[15px] font-medium">Verified hostels near your campus</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-4.5 h-4.5 text-white/90" />
                    </div>
                    <span className="text-white/90 text-[15px] font-medium">Tour rooms in 360° before you book</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4.5 h-4.5 text-white/90" />
                    </div>
                    <span className="text-white/90 text-[15px] font-medium">Book your semester in minutes</span>
                  </div>
                </div>
              </div>

              {/* Slide 3 (Testimonial) */}
              <div className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${activeSlide === 2 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none -z-10'}`}>
                <h2 className="text-white text-[28px] lg:text-[34px] font-bold leading-[1.25] tracking-tight mb-8">
                  “Found my room near Ashesi in a weekend — toured it in 360° before I ever visited.”
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#E5D0BA] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#6c5e57] font-bold text-[15px]">KA</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-[16px]">Kwame A.</div>
                    <div className="text-white/70 text-[13px] font-medium">Level 200 · Ashesi</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile buttons */}
            <div className="lg:hidden mt-auto pt-8 pb-2 w-full">
              <button 
                onClick={() => { setAuthMode('signup'); setShowMobileForm(true); }}
                className="w-full h-[52px] rounded-full font-bold text-[16px] bg-canyon text-white shadow-md cursor-pointer hover:shadow-lg transition-all"
              >
                Get started
              </button>
              <p className="text-center text-[13px] text-white/90 mt-4 font-medium">
                Already have an account?{" "}
                <button onClick={() => { setAuthMode('signin'); setShowMobileForm(true); }} className="text-[#C56A30] font-bold cursor-pointer hover:underline">Sign in</button>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Right Panel (Form) ─── */}
      <div className={`${showMobileForm ? 'flex' : 'hidden'} lg:flex flex-1 items-center justify-center bg-soft-linen p-6 pb-10 lg:p-8 h-full relative overflow-y-auto`}>
        {/* Mobile Back Button */}
        <button 
          onClick={() => setShowMobileForm(false)}
          className="lg:hidden absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-border text-foreground z-10 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-500 mt-10 lg:mt-0">
          
          {/* Heading */}
          <div className="mb-5">
            <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#463C38] leading-tight mb-1.5">
              {authMode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-[#8C8279] font-medium">
              {authMode === 'signup' ? 'Join Kaya Campus and find your next home.' : 'Sign in to continue your search.'}
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col space-y-4" onSubmit={handleLoginClick}>
            
            {/* Full name */}
            {authMode === 'signup' && (
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#463C38]">Full name</label>
                <Input 
                  type="text" 
                  placeholder="Sarah Adjei" 
                  className="h-11 rounded-lg bg-white border-[#E5E0D8] text-[#463C38] text-[14px] font-medium placeholder:text-[#A29A91] focus-visible:ring-2 focus-visible:ring-burnt-umber/30 focus-visible:border-burnt-umber"
                />
              </div>
            )}
            
            {/* University email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#463C38]">University email</label>
              <Input 
                type="email" 
                required 
                placeholder="sarah.adjei@ashesi.edu.gh" 
                className="h-11 rounded-lg bg-white border-[#E5E0D8] text-[#463C38] text-[14px] font-medium placeholder:text-[#A29A91] focus-visible:ring-2 focus-visible:ring-burnt-umber/30 focus-visible:border-burnt-umber"
              />
            </div>
            
            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#463C38]">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="••••••••" 
                  className="h-11 rounded-lg bg-white border-[#E5E0D8] text-[#463C38] text-[14px] font-medium placeholder:text-[#A29A91] pr-16 focus-visible:ring-2 focus-visible:ring-burnt-umber/30 focus-visible:border-burnt-umber"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8279] hover:text-[#463C38] text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
              {authMode === 'signin' && (
                <div className="flex justify-end pt-1.5 pb-0.5">
                  <button type="button" className="text-[12px] font-semibold text-canyon hover:underline cursor-pointer">
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
            
            {/* Create account button */}
            <button 
              type="submit" 
              className={`w-full h-11 ${authMode === 'signup' ? 'mt-1' : 'mt-2'} rounded-full font-bold text-[14px] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 text-white bg-canyon`}
            >
              <span>{authMode === 'signup' ? 'Create account' : 'Sign in'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-4 my-4">
            <div className="h-px bg-[#E5E0D8] flex-1" />
            <span className="text-xs text-[#8C8279] font-medium">or</span>
            <div className="h-px bg-[#E5E0D8] flex-1" />
          </div>

          {/* Microsoft SSO */}
          <button 
            onClick={handleLoginClick} 
            className="w-full bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md hover:bg-[#F8F6F3] text-[#463C38] rounded-full h-11 flex items-center justify-center space-x-3 font-semibold text-[14px] transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4 mr-1">
              <div className="bg-[#F25022]" />
              <div className="bg-[#7FBA00]" />
              <div className="bg-[#00A4EF]" />
              <div className="bg-[#FFB900]" />
            </div>
            <span>Continue with Microsoft</span>
          </button>

          {/* Footer Toggle */}
          <p className="text-center text-[12px] text-[#8C8279] mt-4 font-medium">
            {authMode === 'signup' ? (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => setAuthMode('signin')} className="font-semibold text-canyon hover:underline cursor-pointer">
                  Sign in
                </button>
              </>
            ) : (
              <>
                New here?{" "}
                <button type="button" onClick={() => setAuthMode('signup')} className="font-semibold text-canyon hover:underline cursor-pointer">
                  Create an account
                </button>
              </>
            )}
          </p>

          {/* Terms footer (only on signup) */}
          {authMode === 'signup' && (
            <p className="text-center text-[11px] text-[#8C8279] mt-3">
              By continuing you agree to our{" "}
              <a href="#" className="font-semibold text-canyon hover:underline">Terms & Privacy Policy</a>.
            </p>
          )}

          {/* Manager login - subtle link */}
          <div className="flex items-center justify-center mt-5 pt-4 border-t border-[#E5E0D8]">
            <button 
              onClick={handleManagerLogin} 
              className="text-xs text-[#8C8279] hover:text-[#463C38] font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Manager Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
