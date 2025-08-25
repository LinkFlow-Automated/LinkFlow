"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 7,
    minutes: 24,
    seconds: 16,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer reached zero
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="rounded-lg">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Days */}
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold mb-2">
              {formatNumber(timeLeft.days)}
            </div>
            <div className="text-sm uppercase tracking-wider">
              Days
            </div>
          </div>

          {/* Separator */}
          <div className="w-px h-20 bg-secondary"/>

          {/* Hours */}
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold mb-2">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-sm uppercase tracking-wider">
              Hours
            </div>
          </div>

          {/* Separator */}
          <div className="w-px h-20 bg-secondary"/>

          {/* Minutes */}
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold mb-2">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-sm uppercase tracking-wider">
              Minutes
            </div>
          </div>

          {/* Separator */}
          <div className="w-px h-20 bg-secondary"/>

          {/* Seconds */}
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold mb-2">
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-sm uppercase tracking-wider">
              Seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
