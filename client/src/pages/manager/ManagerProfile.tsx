import { useState } from "react";
import { ShieldCheck, Phone as PhoneIcon, Pencil, Plus } from "lucide-react";

export default function ManagerProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col min-h-screen pb-6 lg:pb-12 bg-[#F0EFEA] h-full">
      {/* Header */}
      <div className="px-5 lg:px-8 pt-10 pb-6 sticky top-0 bg-[#F0EFEA]/90 backdrop-blur-md z-40 flex items-center justify-between border-b border-solid border-[#E5D0BA]/50 mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-[#463C38]">My profile</h1>
        {isEditing && (
          <button 
            onClick={() => setIsEditing(false)}
            className="bg-[#A84A1A] hover:bg-[#8F3E15] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors"
          >
            Save changes
          </button>
        )}
      </div>

      <div className="px-5 lg:px-8 w-full">
        {!isEditing ? (
          /* View Mode */
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column (Avatar Card) */}
            <div className="flex-1 lg:max-w-xs">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col items-center">
                <div className="w-full h-24 bg-[#A84A1A]"></div>
                <div className="w-20 h-20 bg-[#463C38] rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white -mt-10 mb-3 z-10 shrink-0 shadow-sm">
                  KO
                </div>
                
                <h2 className="text-lg font-bold text-[#463C38]">Kwame Owusu</h2>
                <p className="text-[13px] font-medium text-[#8C8279] mt-0.5">Manager · Dufie Annex</p>
                
                <div className="flex space-x-2 mt-4 mb-6">
                  <span className="flex items-center space-x-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>KYC verified</span>
                  </span>
                  <span className="flex items-center space-x-1 bg-[#F1E8DC] text-[#A84A1A] px-2.5 py-1 rounded-full text-[11px] font-bold">
                    <PhoneIcon className="w-3.5 h-3.5" />
                    <span>Phone</span>
                  </span>
                </div>

                <div className="w-full grid grid-cols-3 border-t border-[#F0EFEA] divide-x divide-[#F0EFEA] py-4">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-[#463C38] text-[15px]">1</span>
                    <span className="text-[11px] font-medium text-[#8C8279]">property</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-[#463C38] text-[15px]">52</span>
                    <span className="text-[11px] font-medium text-[#8C8279]">residents</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-[#463C38] text-[15px]">4.8</span>
                    <span className="text-[11px] font-medium text-[#8C8279]">rating</span>
                  </div>
                </div>
                
                <div className="w-full text-center py-3 border-t border-[#F0EFEA] bg-[#F8F6F3]">
                  <span className="text-[11px] font-medium text-[#8C8279]">Member since Aug 2023</span>
                </div>
              </div>
            </div>

            {/* Right Column (Info Cards) */}
            <div className="flex-[2] space-y-6">
              
              {/* Contact details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm relative">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-[#463C38]">Contact details</h3>
                  <button onClick={() => setIsEditing(true)} className="flex items-center space-x-1 border border-[#E5E0D8] text-[#A84A1A] hover:bg-[#F1E8DC]/50 px-4 py-2 rounded-full font-bold text-[12px] transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="block text-[11px] font-medium text-[#A29A91] mb-1">Full name</span>
                    <span className="block text-[14px] font-bold text-[#463C38]">Kwame Owusu</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-[#A29A91] mb-1">Phone</span>
                    <span className="block text-[14px] font-bold text-[#463C38]">024 555 0100</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-[#A29A91] mb-1">Email</span>
                    <span className="block text-[14px] font-bold text-[#463C38]">kwame.owusu@gmail.com</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-[#A29A91] mb-1">Ghana Card ID</span>
                    <span className="block text-[14px] font-bold text-[#463C38]">GHA-724119830-5</span>
                  </div>
                </div>
              </div>

              {/* Payout account */}
              <div className="bg-white rounded-2xl p-6 shadow-sm relative">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-[#463C38]">Payout account</h3>
                  <button onClick={() => setIsEditing(true)} className="flex items-center space-x-1 border border-[#E5E0D8] text-[#A84A1A] hover:bg-[#F1E8DC]/50 px-4 py-2 rounded-full font-bold text-[12px] transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="bg-[#F8F6F3] rounded-xl p-4 flex items-center justify-between mb-4 border border-[#E5E0D8]/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#E5D0BA] text-[#A84A1A] rounded-full flex items-center justify-center shrink-0">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#463C38]">MTN MoMo · Kwame Owusu</span>
                      <span className="text-[12px] font-medium text-[#8C8279] mt-0.5">···· ···· 4471</span>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold">
                    Primary
                  </span>
                </div>

                <button className="w-full flex items-center justify-center space-x-1.5 bg-transparent border border-dashed border-[#C8B09A] text-[#A84A1A] py-3 rounded-xl font-bold text-[13px] hover:bg-[#F1E8DC]/50 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add bank account</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-6 lg:space-y-8 w-full">
            
            {/* Header / Avatar Edit */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#463C38] rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-sm">
                  KO
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#463C38]">Kwame Owusu</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[12px] font-medium text-[#8C8279]">Verified manager</span>
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">KYC</span>
                  </div>
                </div>
              </div>
              <button className="border border-[#E5E0D8] text-[#5C4538] hover:bg-[#F8F6F3] px-4 py-2 rounded-full font-bold text-[12px] transition-colors">
                Change photo
              </button>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#463C38] mb-5">Personal information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-medium text-[#A29A91] mb-2">Full name</label>
                  <input 
                    type="text" 
                    defaultValue="Kwame Owusu" 
                    className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[14px] font-medium text-[#463C38] focus:outline-none focus:ring-2 focus:ring-[#A84A1A]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#A29A91] mb-2">Phone</label>
                  <input 
                    type="text" 
                    defaultValue="024 555 0100" 
                    className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[14px] font-medium text-[#463C38] focus:outline-none focus:ring-2 focus:ring-[#A84A1A]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#A29A91] mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="kwame.owusu@gmail.com" 
                    className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[14px] font-medium text-[#463C38] focus:outline-none focus:ring-2 focus:ring-[#A84A1A]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#A29A91] mb-2">Ghana Card ID</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="GHA-724119830-5" 
                      className="w-full border border-[#E5E0D8] rounded-xl pl-4 pr-20 py-3 text-[14px] font-medium text-[#463C38] focus:outline-none focus:ring-2 focus:ring-[#A84A1A]/20 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-[11px] flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payout Account Edit */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="mb-5">
                <h3 className="text-base font-bold text-[#463C38]">Payout account</h3>
                <p className="text-[12px] font-medium text-[#8C8279] mt-0.5">Where Kaya sends your booking earnings.</p>
              </div>

              <div className="flex p-1 bg-[#F8F6F3] rounded-xl mb-6">
                <button className="flex-1 bg-white border border-[#E5D0BA] text-[#A84A1A] py-2.5 rounded-lg font-bold text-[13px] shadow-sm flex items-center justify-center space-x-2">
                  <PhoneIcon className="w-4 h-4" />
                  <span>Mobile Money</span>
                </button>
                <button className="flex-1 text-[#8C8279] hover:text-[#463C38] py-2.5 rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                  <span>Bank account</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[11px] font-medium text-[#A29A91] mb-2">Network</label>
                  <select className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[14px] font-medium text-[#463C38] focus:outline-none focus:ring-2 focus:ring-[#A84A1A]/20 transition-all appearance-none bg-white">
                    <option>MTN MoMo</option>
                    <option>Telecel Cash</option>
                    <option>AT Money</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#A29A91] mb-2">MoMo number</label>
                  <input 
                    type="text" 
                    defaultValue="024 555 4471" 
                    className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[14px] font-medium text-[#463C38] focus:outline-none focus:ring-2 focus:ring-[#A84A1A]/20 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-medium text-[#A29A91] mb-2">Account name</label>
                <input 
                  type="text" 
                  defaultValue="Kwame Owusu" 
                  className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[14px] font-medium text-[#463C38] focus:outline-none focus:ring-2 focus:ring-[#A84A1A]/20 transition-all"
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#463C38] mb-5">Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#463C38] text-[14px]">New booking requests</h4>
                    <p className="text-[12px] font-medium text-[#8C8279] mt-0.5">Get notified the moment a student books</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-[#A84A1A] flex items-center p-1 transition-colors">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm transform translate-x-5 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#F0EFEA]">
                  <div>
                    <h4 className="font-bold text-[#463C38] text-[14px]">Payout confirmations</h4>
                    <p className="text-[12px] font-medium text-[#8C8279] mt-0.5">SMS when earnings hit your account</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-[#A84A1A] flex items-center p-1 transition-colors">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm transform translate-x-5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
