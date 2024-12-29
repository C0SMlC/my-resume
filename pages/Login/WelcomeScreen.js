import { MoveRight, MoveRightIcon } from "lucide-react";
import React from "react";

export default function WelcomeScreen({ setIsLoggedIn }) {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-200 to-blue-300 font-retro text-primary_black">
      <div className="absolute inset-0 bg-white/30" />{" "}
      {/* This creates the soft, hazy effect */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider font-retro">
            WELCOME
          </h1>
        </div>
        <div className="w-full max-w-md flex justify-center mb-8">
          <div className="relative">
            <div className="rounded-full bg-pink-200 p-8 w-32 h-32 flex items-center justify-center">
              <div className="text-4xl font-bold text-teal-500">N</div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-lg shadow-md">
              <span className="text-gray-800">Pratik</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md flex items-center gap-4">
          <input
            type="password"
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="******"
          />
          <button
            className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setIsLoggedIn(true)}
          >
            <div className="w-6 h-6 text-white ">
              <MoveRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
