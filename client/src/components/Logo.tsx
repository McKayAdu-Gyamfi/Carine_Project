import kaya from "../assets/Kaya.png";

export default function Logo({ 
  className = "", 
  iconClassName = "h-14 w-auto", 
  textClassName = "text-xl font-bold tracking-tight text-current" 
}: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <img src={kaya} alt="Logo" className={iconClassName} />
      <span className={textClassName}>
        Kaya<span className="text-canyon">Campus</span>
      </span>
    </div>
  );
}
