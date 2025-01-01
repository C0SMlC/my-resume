import React, { useState, useEffect } from "react";

const TutorialOverlay = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [terminalCommand, setTerminalCommand] = useState("");

  const steps = [
    {
      target: '[name="Terminal"]',
      content: "Click on the Terminal icon to get started!",
      position: "bottom",
    },
    {
      target: ".terminal-input",
      content: "Type 'help' and press Enter to see available commands",
      position: "top",
    },
  ];

  useEffect(() => {
    if (currentStep === 1 && terminalCommand.trim().toLowerCase() === "help") {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [terminalCommand, currentStep, onComplete]);

  if (currentStep >= steps.length) return null;

  const currentTarget = document.querySelector(steps[currentStep].target);
  if (!currentTarget) return null;

  const targetRect = currentTarget.getBoundingClientRect();

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div
          className="absolute rounded-full border-4 border-blue-400 animate-pulse"
          style={{
            left: targetRect.left - 10,
            top: targetRect.top - 10,
            width: targetRect.width + 20,
            height: targetRect.height + 20,
          }}
        />

        <div
          className="absolute bg-white text-black p-4 rounded-lg shadow-lg max-w-xs"
          style={{
            left: targetRect.left,
            top:
              steps[currentStep].position === "bottom"
                ? targetRect.bottom + 20
                : targetRect.top - 100,
          }}
        >
          <p className="font-pixel text-sm mb-2">
            {steps[currentStep].content}
          </p>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-pixel"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Got it!
          </button>
        </div>
      </div>
    </>
  );
};

export default TutorialOverlay;
