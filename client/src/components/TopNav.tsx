import type { ReactNode } from "react";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { Link } from "react-router-dom";
import { TygerAvatar } from 'tyger-avatar';

interface TopNavProps {
  rightAction?: ReactNode;
}

export default function TopNav({ rightAction }: TopNavProps) {
  const userAvatar = localStorage.getItem("userAvatar");

  return (
    <header className="flex items-center justify-between px-4 h-20 w-full fixed top-0 left-0 z-50 bg-white/10 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-white/10 transition-colors shadow-sm">
      <Logo />
      <div className="flex items-center space-x-3">
        {rightAction}
        <ModeToggle />
        <Link to="/profile">
          <div className="w-10 h-10 ring-2 ring-background flex items-center justify-center bg-accent shadow-md cursor-pointer hover:opacity-80 transition-opacity rounded-full overflow-hidden p-0.5">
            {userAvatar?.startsWith("Tr") ? (
               <TygerAvatar name={userAvatar as any} size="lg" />
            ) : userAvatar?.startsWith("http") ? (
               <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <span className="text-2xl leading-none">{userAvatar || "👤"}</span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
