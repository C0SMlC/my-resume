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
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check if it's the first visit
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    // if (!hasSeenTutorial && isLoggedIn) {
    //   setShowTutorial(true);
    // }
  }, [isLoggedIn]);

  const completeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  const handleDockClick = (id) => {
    if (activeProgram === id) return;
    setIsMinimized(false);
    setActiveProgram(id);
  };

  const toggleProgram = (type) => {
    const existingProgram = programs.find((p) => p.type === type);
    if (existingProgram) {
      if (activeProgram === existingProgram.id) {
        // If already active, minimize
        setActiveProgram(null);
      } else {
        // If not active, activate
        setActiveProgram(existingProgram.id);
      }
    } else {
      // If doesn't exist, create new
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
          style={{
            backgroundImage: 'url("/Background/Wallpaper.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {showTutorial && <TutorialOverlay onComplete={completeTutorial} />}
          {isHovered ? <Sidebar /> : <div></div>}
          <StatusBar
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <div className="grid grid-cols-8 gap-4 p-4 mt-14">
            {/* <PixelIcon
              name="Home"
              icon="home"
              onClick={() => toggleProgram("files")}
            /> */}
            <PixelIcon
              name="Terminal"
              icon="terminal"
              onClick={() => toggleProgram("terminal")}
            />
            {/* <PixelIcon
              name="Achievement"
              icon="trophy"
              onClick={() => toggleProgram("achievement")}
            /> */}
          </div>
          {programs.map((program) => (
            <Window
              key={program.id}
              program={program}
              onClose={() =>
                setPrograms((prev) => prev.filter((p) => p.id !== program.id))
              }
              isActive={activeProgram === program.id}
              onClick={() => setActiveProgram(program.id)}
              isMinimized={isMinimized}
              setIsMinimized={setIsMinimized}
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
