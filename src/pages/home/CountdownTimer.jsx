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

  return (
    <div className="days-time d-flex align-items-center">
      <div className="days">
        <p>Days</p>
        <h2>
          {timeLeft.days} <span style={{ color: "#E07575" }}>:</span>
        </h2>
      </div>
      <div className="hours">
        <p>Hours</p>
        <h2>
          {timeLeft.hours} <span style={{ color: "#E07575" }}>:</span>
        </h2>
      </div>
      <div className="minutes">
        <p>Minutes</p>
        <h2>
          {timeLeft.minutes} <span style={{ color: "#E07575" }}>:</span>
        </h2>
      </div>
      <div className="seconds">
        <p>Seconds</p>
        <h2>{timeLeft.seconds}</h2>
      </div>
    </div>
  );
}
