import { useState, useEffect } from "react";

interface BookingProgressProps {
  currentStep: 1 | 2 | 3;
}

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  const [lineWidth, setLineWidth] = useState("0%");

  useEffect(() => {
    // Small delay to trigger the transition after mount
    const timer = setTimeout(() => {
      setLineWidth(currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%");
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const steps = [
    { id: 1, label: "DATES" },
    { id: 2, label: "DETAILS" },
    { id: 3, label: "PAYMENT" },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8">
      <div className="relative flex justify-between items-center">
        {/* Lines Container */}
        <div className="absolute top-1/2 left-11 right-11 h-[2px] -translate-y-[18px] z-0 overflow-hidden">
          {/* Background Line */}
          <div className="absolute inset-0 bg-muted" />
          {/* Animated Progress Line */}
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-in-out"
            style={{ width: lineWidth }}
          />
        </div>

        {steps.map((step) => {
          const isActive = step.id <= currentStep;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-500 ${
                  isActive 
                    ? "bg-primary border-primary text-white" 
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                {step.id}
              </div>
              <span className={`mt-2 text-[10px] font-extrabold tracking-widest uppercase transition-colors duration-500 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
