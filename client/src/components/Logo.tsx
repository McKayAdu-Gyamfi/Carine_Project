import NewLogo from "../assets/Logo.png";

export default function Logo({ 
  className = "", 
  iconClassName = "h-22 w-35", 
  // textClassName = "text-xl font-bold font-serif tracking-tight text-primary" 
}: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img src={NewLogo} alt="CampusNest Logo" className={iconClassName} />
      {/* <span className={textClassName}>CampusNest</span> */}
    </div>
  );
}
