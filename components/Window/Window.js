import React, { useState, useEffect, useRef } from "react";
import { Minus, Square, X } from "lucide-react";

export const Window = ({
  program,
  onClose,
  isActive,
  onClick,
  isMinimized,
  setIsMinimized,
  setActiveProgram,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousDimensions, setPreviousDimensions] = useState(null);
  const [position, setPosition] = useState(null);
  const windowRef = useRef(null);

  useEffect(() => {
    if (position === null && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.top,
      });
    }
  }, []);

  useEffect(() => {
    if (position === null && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.top,
      });
    }
  }, []);

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    if (e.target.closest(".title-bar")) {
      setIsDragging(true);
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      windowRef.current.classList.remove("center-window");
    }
  };
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    if (!isMaximized) {
      const rect = windowRef.current.getBoundingClientRect();
      setPreviousDimensions({
        width: rect.width,
        height: rect.height,
        x: position.x,
        y: position.y,
      });
      setIsMaximized(true);
      setIsMinimized(false);
      windowRef.current.classList.remove("center-window");
    } else {
      setIsMaximized(false);
      if (previousDimensions) {
        setPosition({
          x: previousDimensions.x,
          y: previousDimensions.y,
        });
      }
    }
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
    setActiveProgram(null);
    if (isMaximized) {
      setIsMaximized(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleDoubleClick = (e) => {
    if (e.target.closest(".title-bar")) {
      handleMaximize(e);
    }
  };

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-0 left-0 bg-gray-800 text-white p-2 rounded-t cursor-pointer"
        onClick={() => setIsMinimized(false)}
      >
        {program.type}
      </div>
    );
  }

  if (isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-gray-800 rounded shadow-lg ${
        isActive ? "z-10" : "z-0"
      } ${isDragging ? "cursor-grabbing" : ""} ${
        position === null ? "center-window" : ""
      }`}
      style={{
        userSelect: "none",
        width: isMaximized ? "100%" : "50%",
        height: isMaximized ? "calc(100% - 32px)" : "50%",
        left: isMaximized ? 0 : position?.x ?? "50%",
        top: isMaximized ? "32px" : position?.y ?? "50%",
        transform: position === null ? "translate(-50%, -50%)" : "none",
        transition: isDragging ? "none" : "all 0.2s ease",
      }}
      onClick={onClick}
    >
      <div
        className="title-bar flex items-center justify-between bg-gray-700 p-2 rounded-t cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <span className="text-white select-none">{program.type}</span>
        <div className="flex space-x-2">
          <button
            className="p-1 hover:bg-gray-600 rounded focus:outline-none"
            onClick={handleMinimize}
          >
            <Minus size={14} className="text-white" />
          </button>
          <button
            className="p-1 hover:bg-gray-600 rounded focus:outline-none"
            onClick={handleMaximize}
          >
            <Square size={14} className="text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 hover:bg-red-500 rounded focus:outline-none"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="p-4 text-white overflow-auto"
        style={{
          maxHeight: isMaximized ? "calc(100vh - 40px)" : "calc(100vh - 200px)",
        }}
      >
        {program.type === "terminal" && <Terminal />}
        {program.type === "files" && <FileExplorer />}
        {program.type === "settings" && <Settings />}
      </div>
    </div>
  );
};

function Terminal() {
  return <div className="font-mono">C:\&gt;</div>;
}

function FileExplorer() {
  return <div>My Files</div>;
}

function Settings() {
  return <div>Settings</div>;
}
