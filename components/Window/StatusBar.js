import React, { useState, useEffect, useRef } from "react";
import { Search, Home, Clock, Battery, Volume2 } from "lucide-react";

// Status Bar Component
export const StatusBar = () => {
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
      <div className="flex items-center space-x-4">
        <span className="text-white font-['Press_Start_2P'] text-xs">
          ABOUT PRATIK
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <Search className="w-4 h-4 text-white" />
        <Home className="w-4 h-4 text-white" />
        <Clock className="w-4 h-4 text-white" />
        <span className="text-white font-['Press_Start_2P'] text-xs">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <Volume2 className="w-4 h-4 text-white" />
        <div className="flex items-center space-x-1">
          <Battery className="w-4 h-4 text-white" />
          <span className="text-white font-['Press_Start_2P'] text-xs">
            65%
          </span>
        </div>
      </div>
    </div>
  );
};
