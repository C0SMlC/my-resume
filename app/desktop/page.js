"use client";
import WelcomeScreen from "@/pages/Login/WelcomeScreen";
import { Minus, Square, X } from "lucide-react";
import React, { useState } from "react";
export default function VintageOS() {
  const [activeProgram, setActiveProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login Screen
  if (!isLoggedIn) {
    return <WelcomeScreen setIsLoggedIn={setIsLoggedIn} />;
  }

  // Desktop Environment
  return (
    <div className="min-h-screen bg-blue-900 relative overflow-hidden">
      {/* Desktop Icons */}
      <div className="grid grid-cols-4 gap-4 p-4">
        <DesktopIcon
          name="My Files"
          onClick={() =>
            setPrograms((prev) => [...prev, { id: Date.now(), type: "files" }])
          }
        />
        <DesktopIcon
          name="Terminal"
          onClick={() =>
            setPrograms((prev) => [
              ...prev,
              { id: Date.now(), type: "terminal" },
            ])
          }
        />
        <DesktopIcon
          name="Settings"
          onClick={() =>
            setPrograms((prev) => [
              ...prev,
              { id: Date.now(), type: "settings" },
            ])
          }
        />
      </div>

      {/* Program Windows */}
      {programs.map((program) => (
        <Window
          key={program.id}
          program={program}
          onClose={() =>
            setPrograms((prev) => prev.filter((p) => p.id !== program.id))
          }
          isActive={activeProgram === program.id}
          onClick={() => setActiveProgram(program.id)}
        />
      ))}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-800 flex items-center px-4">
        <button
          onClick={() => setIsLoggedIn(false)}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Logout
        </button>
        <div className="flex-1 flex items-center justify-center space-x-2">
          {programs.map((program) => (
            <button
              key={program.id}
              className={`px-4 py-1 ${
                activeProgram === program.id ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded`}
              onClick={() => setActiveProgram(program.id)}
            >
              {program.type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Window Component
function Window({ program, onClose, isActive, onClick }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <div
      className={`absolute w-96 bg-gray-800 rounded shadow-lg ${
        isActive ? "z-10" : "z-0"
      }`}
      style={{ left: position.x, top: position.y }}
      onClick={onClick}
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between bg-gray-700 p-2 rounded-t">
        <span className="text-white">{program.type}</span>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-600 rounded">
            <Minus size={14} className="text-white" />
          </button>
          <button className="p-1 hover:bg-gray-600 rounded">
            <Square size={14} className="text-white" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-red-500 rounded">
            <X size={14} className="text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-4 text-white">
        {program.type === "terminal" && <Terminal />}
        {program.type === "files" && <FileExplorer />}
        {program.type === "settings" && <Settings />}
      </div>
    </div>
  );
}

// Desktop Icon Component
function DesktopIcon({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-2 p-2 hover:bg-blue-800 rounded"
    >
      <div className="w-12 h-12 bg-gray-200 rounded"></div>
      <span className="text-white text-sm">{name}</span>
    </button>
  );
}

function Terminal() {
  return <div className="font-mono">C:\&gt</div>;
}

function FileExplorer() {
  return <div>My Files</div>;
}

function Settings() {
  return <div>Settings</div>;
}
