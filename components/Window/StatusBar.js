import React, { useState, useEffect } from "react";
import { Search, Home, Clock, Battery, Volume2 } from "lucide-react";

export const StatusBar = ({ onToggleClicked }) => {
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-16 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700"
      style={{ imageRendering: "pixelated" }}
    >
      <div
        className="relative flex items-center h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={onToggleClicked}
          className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md p-2 transition-colors duration-200"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"
              fill="#00A4EF"
            />
          </svg>

          {/* Hover text */}
          {isHovered && (
            <span className="absolute top-full left-0 mt-1 text-sm text-white bg-gray-900 px-2 py-1 rounded shadow-lg font-retro">
              About Pratik
            </span>
          )}
        </button>
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
          <img src="./Icons/battery.png" width={25} height={25} alt="battery" />
          <span className="text-white font-retro text-xl">100%</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
