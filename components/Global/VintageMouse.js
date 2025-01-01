"use client";
import React, { useState, useEffect } from "react";

export default function VintageCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      // Round to nearest pixel for pixelated movement
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "16px",
          height: "16px",
          imageRendering: "pixelated",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            fill="white"
            stroke="black"
            strokeWidth="1"
            d="M1,1 L1,15 L4,12 L7,15 L9,13 L6,10 L9,10 L1,1"
          />
        </svg>
      </div>
    </>
  );
}
