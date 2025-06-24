import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center space-x-2 lg:space-x-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center">
          <div className="text-center">
            <div className="bg-primary-600 text-white rounded-lg px-3 py-2 lg:px-4 lg:py-3 min-w-[60px] lg:min-w-[80px]">
              <p className="text-xs lg:text-sm font-medium opacity-90">
                {unit.label}
              </p>
              <p className="text-lg lg:text-xl font-bold">
                {unit.value.toString().padStart(2, '0')}
              </p>
            </div>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-primary-600 font-bold text-lg lg:text-xl mx-1 lg:mx-2">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
