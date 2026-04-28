import { useState, useEffect } from "react";
import { ChevronLeft, Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

const PREFERENCES = [
  "Quiet / Low Noise",
  "Air-Conditioned",
  "Wi-Fi Included",
  "Kitchen Access",
  "Backup Generator"
];

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(() => {
    const stored = localStorage.getItem("userPrefs");
    return stored ? JSON.parse(stored) : ["Air-Conditioned", "Wi-Fi Included"];
  });
  const [bio, setBio] = useState(localStorage.getItem("userBio") || "Jus a chill person merhnnnn...");
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const togglePreference = (pref: string) => {
    if (selectedPrefs.includes(pref)) {
      setSelectedPrefs(selectedPrefs.filter(p => p !== pref));
    } else {
      setSelectedPrefs([...selectedPrefs, pref]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save local preferences that don't belong in the DB
      localStorage.setItem("userBio", bio);
      localStorage.setItem("userPrefs", JSON.stringify(selectedPrefs));
      
      // Save real name to DB
      if (name && name !== user?.name) {
        await api.patch('/users/me', { name });
        await refreshUser();
      }
      
      navigate(-1);
    } catch (err: any) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "👤";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-20 border-b border-border/50 sticky top-0 bg-background z-50">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-accent rounded-full transition-colors cursor-pointer">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Edit Profile</h1>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="p-2 text-primary font-bold text-sm cursor-pointer hover:bg-primary/10 rounded-lg transition-colors flex items-center"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </button>
      </div>

      <div className="px-6 py-8 flex-1 pb-16">
        
        {/* Avatar Display */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-[100px] h-[100px] mb-4">
            <div className="w-full h-full rounded-full overflow-hidden bg-accent flex items-center justify-center border-2 border-border shadow-md p-1">
              <span className="text-[50px] leading-none mb-1 text-primary">{initial}</span>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 bg-card border border-border/60 rounded-lg px-4 font-semibold text-[13px] focus:outline-none focus:ring-1 ring-primary/50 transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">University</label>
            <input 
              type="text" 
              readOnly
              value={user?.user_type === "HOSTEL_MANAGER" ? "Manager" : "Ashesi University"}
              className="w-full h-12 bg-muted border border-border/60 rounded-lg px-4 font-semibold text-[13px] focus:outline-none shadow-sm text-foreground/70"
            />
          </div>
          
          {user?.user_type !== "HOSTEL_MANAGER" && (
          <div className="flex space-x-4">
            <div className="space-y-2 flex-1">
              <label className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Program</label>
              <input 
                type="text" 
                defaultValue="Computer Science"
                className="w-full h-12 bg-card border border-border/60 rounded-lg px-4 font-semibold text-[13px] focus:outline-none focus:ring-1 ring-primary/50 transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2 w-28">
              <label className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Level</label>
              <select 
                defaultValue="300"
                className="w-full h-12 bg-card border border-border/60 rounded-lg px-4 font-semibold text-[13px] focus:outline-none focus:ring-1 ring-primary/50 transition-all shadow-sm"
              >
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
              </select>
            </div>
          </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-24 py-3 bg-card border border-border/60 rounded-lg px-4 font-medium text-[13px] focus:outline-none focus:ring-1 ring-primary/50 transition-all resize-none leading-relaxed shadow-sm"
            />
          </div>

          {/* Separator */}
          <div className="h-px bg-border/50 w-full my-8" />

          {/* Preferences Tags */}
          <div className="space-y-3">
             <div className="ml-1 mb-4">
               <label className="text-[14px] font-extrabold tracking-tight text-foreground">Room Preferences</label>
               <p className="text-[11px] text-muted-foreground font-medium mt-1 leading-relaxed max-w-[280px]">Select the exact amenities that matter most to your comfort so hosts can match you correctly.</p>
             </div>
             
             <div className="flex flex-wrap gap-2.5">
               {PREFERENCES.map(pref => {
                 const isSelected = selectedPrefs.includes(pref);
                 return (
                   <button
                     key={pref}
                     onClick={() => togglePreference(pref)}
                     className={`px-4 py-2 rounded-full text-[11px] font-extrabold transition-all cursor-pointer flex items-center shadow-sm border ${
                       isSelected 
                         ? 'bg-primary border-primary text-primary-foreground hover:bg-primary/90' 
                         : 'bg-card border-border/60 text-muted-foreground hover:border-border hover:bg-accent'
                     }`}
                   >
                     {isSelected && <Check className="w-3 h-3 mr-1.5 stroke-[3px]" />}
                     <span>{pref}</span>
                   </button>
                 );
               })}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
