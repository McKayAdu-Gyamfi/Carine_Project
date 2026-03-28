import type { ReactNode } from "react";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

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
          <Avatar className="w-10 h-10 ring-2 ring-background flex items-center justify-center bg-accent shadow-md cursor-pointer hover:opacity-80 transition-opacity">
            {userAvatar ? (
              <span className="text-2xl leading-none">{userAvatar}</span>
            ) : (
              <>
                <AvatarImage src="https://i.pravatar.cc/100?img=5" />
                <AvatarFallback>S</AvatarFallback>
              </>
            )}
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
