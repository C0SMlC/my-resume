import React, { useState, useEffect, useRef } from "react";
import { Search, Home, Clock, Battery, Volume2 } from "lucide-react";

export const StatusBar = ({ onMouseEnter, onMouseLeave }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-16 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700"
      style={{ imageRendering: "pixelated" }}
    >
      <div className="flex items-center w-56 h-32">
        <span
          className="text-white font-retro text-xl"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          ABOUT PRATIK
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <Search className="w-8 h-8 text-white" />
        <Home className="w-8 h-8 text-white" />
        <Clock className="w-8 h-8 text-white" />
        <span className="text-white font-retro text-xl">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <Volume2 className="w-8 h-8 text-white" />
        <div className="flex items-center space-x-1">
          <img src="./Icons/battery.png" width={25} height={25} />
          <span className="text-white font-retro text-xl">100%</span>
        </div>
      </div>
    </div>
  );
};
