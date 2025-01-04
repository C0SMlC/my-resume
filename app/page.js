"use client";
import { useEffect, useState } from "react";
import WelcomeScreen from "@/pages/Login/WelcomeScreen";
import { Window } from "@/components/Window/Window";
import { PixelIcon } from "@/components/Window/PixelIcon";
import { StatusBar } from "@/components/Window/StatusBar";
import Sidebar from "@/components/Sidebar";
import TutorialOverlay from "@/components/Global/Tutorial";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeProgram, setActiveProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [minimizedPrograms, setMinimizedPrograms] = useState(new Set());
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
  }, [isLoggedIn]);

  const completeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  const onToggleClicked = () => {
    setIsToggleClicked(true);
  };

  const handleDockClick = (id) => {
    if (minimizedPrograms.has(id)) {
      // If program is minimized, restore it
      setMinimizedPrograms((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setActiveProgram(id);
    } else if (activeProgram === id) {
      // If program is active, minimize it
      setMinimizedPrograms((prev) => new Set(prev).add(id));
      setActiveProgram(null);
    } else {
      // If program is neither minimized nor active, make it active
      setActiveProgram(id);
    }
  };

  const handleMinimize = (programId) => {
    setMinimizedPrograms((prev) => new Set(prev).add(programId));
    setActiveProgram(null);
  };

  const toggleProgram = (type) => {
    const existingProgram = programs.find((p) => p.type === type);
    if (existingProgram) {
      if (minimizedPrograms.has(existingProgram.id)) {
        setMinimizedPrograms((prev) => {
          const newSet = new Set(prev);
          newSet.delete(existingProgram.id);
          return newSet;
        });
        setActiveProgram(existingProgram.id);
      } else if (activeProgram === existingProgram.id) {
        handleMinimize(existingProgram.id);
      } else {
        setActiveProgram(existingProgram.id);
      }
    } else {
      // Create new program
      const newProgram = { id: Date.now(), type };
      setPrograms((prev) => [...prev, newProgram]);
      setActiveProgram(newProgram.id);
    }
  };

  return (
    <div className="text-black">
      {!isLoggedIn ? (
        <WelcomeScreen className="text-5xl" setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div
          className="min-h-screen relative overflow-hidden"
          onClick={() => {
            if (isToggleClicked) setIsToggleClicked(false);
          }}
          style={{
            backgroundImage: 'url("/Background/Wallpaper.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {showTutorial && <TutorialOverlay onComplete={completeTutorial} />}
          {isToggleClicked ? <Sidebar /> : <div></div>}
          <StatusBar onToggleClicked={onToggleClicked} />

          <div className="grid grid-cols-8 gap-4 p-4 mt-14">
            <PixelIcon
              name="Terminal"
              icon="terminal"
              onClick={() => toggleProgram("terminal")}
            />
          </div>

          {programs.map((program) => (
            <Window
              key={program.id}
              program={program}
              onClose={() => {
                setPrograms((prev) => prev.filter((p) => p.id !== program.id));
                setMinimizedPrograms((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(program.id);
                  return newSet;
                });
                if (activeProgram === program.id) {
                  setActiveProgram(null);
                }
              }}
              isActive={activeProgram === program.id}
              onClick={() => setActiveProgram(program.id)}
              isMinimized={minimizedPrograms.has(program.id)}
              setIsMinimized={(minimized) => {
                if (minimized) {
                  handleMinimize(program.id);
                } else {
                  setMinimizedPrograms((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(program.id);
                    return newSet;
                  });
                  setActiveProgram(program.id);
                }
              }}
              setActiveProgram={setActiveProgram}
            />
          ))}

          <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-800 flex items-center px-4">
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 font-retro text-xs"
            >
              Logout
            </button>

            <div className="flex-1 flex items-center justify-center space-x-2">
              {programs.map((program) => (
                <button
                  key={program.id}
                  className={`px-4 py-1 ${
                    activeProgram === program.id ? "bg-blue-500" : "bg-gray-700"
                  } text-white rounded font-retro text-xs`}
                  onClick={() => handleDockClick(program.id)}
                >
                  {program.type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
