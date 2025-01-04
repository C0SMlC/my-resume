import { useEffect, useRef, useState } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      content: 'Welcome to the Terminal! Type "help" for available commands.',
    },
  ]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const parseLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const commands = {
    help: {
      description: "Show available commands",
      action: () => {
        return [
          "Available commands:",
          "  help        - Show this help message",
          "  clear       - Clear the terminal",
          "  skills      - List technical skills",
          "  experience  - Show work experience",
          "  education   - Show education details",
          "  certs       - Show certifications",
          "  links       - Show portfolio links",
          "  about       - About this system",
          "  banner      - Display ASCII art banner",
          "  time        - Show current time",
          "  echo [text] - Echo back your text",
        ].join("\n");
      },
    },
    clear: {
      description: "Clear terminal",
      action: () => {
        setHistory([]);
        return null;
      },
    },
    banner: {
      description: "Display ASCII art banner",
      action: () => {
        return `
██████╗ ██████╗  █████╗ ████████╗██╗██╗  ██╗
██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██║ ██╔╝
██████╔╝██████╔╝███████║   ██║   ██║█████╔╝ 
██╔═══╝ ██╔══██╗██╔══██║   ██║   ██║██╔═██╗ 
██║     ██║  ██║██║  ██║   ██║   ██║██║  ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝
`;
      },
    },
    time: {
      description: "Show current time",
      action: () => {
        return new Date().toLocaleString();
      },
    },
    echo: {
      description: "Echo back your text",
      action: (args) =>
        args.join(" ") || "You didn't provide any text to echo!",
    },
    skills: {
      description: "List technical skills",
      action: () => {
        return [
          "Technical Skills:",
          "• Programming Languages:",
          "  - C++",
          "  - Python",
          "  - JavaScript",
          "  - Rust",
          "",
          "• Web Technologies:",
          "  - HTML5",
          "  - CSS3",
          "  - Tailwind",
          "  - Bootstrap",
          "  - ReactJS",
          "",
          "• Backend & Databases:",
          "  - NodeJS",
          "  - ExpressJS",
          "  - MongoDB",
          "  - SQL",
          "",
          "• Other Technologies:",
          "  - API Development",
          "  - Version Control",
          "  - Qt/QML",
          "  - GraphQL",
        ].join("\n");
      },
    },
    experience: {
      description: "Show work experience",
      action: () => {
        return [
          "1. Inovact - Backend Developer",
          "   Mumbai, Maharashtra (08/2023 - 05/2024)",
          "   • Built efficient server-side solutions using Node.js and Express",
          "   • Implemented WebSocket for real-time communication",
          "   • Utilized Postman for API testing",
          "",
          "2. Front End Developer - College of Engineering",
          "   (05/2023 - 05/2024)",
          "   • Developed responsive UI for Internship Management Portal",
          "   • Integrated frontend with PHP backend and MySQL database",
          "",
          "3. Qt6 and Software Developer",
          "   (12/2023 - 02/2024)",
          "   • Engineered Qt6-based vehicle dashboard",
          "   • Developed library management solution",
          "",
          "4. JavaScript Instructor",
          "   Mumbai, Maharashtra (06/2023 - 07/2023)",
          "   • Conducted comprehensive JavaScript bootcamp",
          "   • Designed learning sessions covering ES6, DOM manipulation",
          "   • Mentored students through practical coding exercises",
        ].join("\n");
      },
    },
    education: {
      description: "Show education details",
      action: () => {
        return [
          "• Bachelor of Technology",
          "  Electronics And Computer Science",
          "  Pillai College of Engineering, New Panvel",
          "  Graduation: 05/2024",
          "",
          "• Higher Secondary",
          "  NES And Junior College",
          "  Maharashtra",
        ].join("\n");
      },
    },
    certs: {
      description: "Show certifications",
      action: () => {
        return [
          "• JavaScript Bootcamp Instructor Certification",
          "  College of Engineering",
          "",
          "• Advanced Styling with Responsive Design",
          "  University of Michigan (Coursera)",
          "",
          "• HTML, CSS, and JavaScript for Web Developers",
          "  Johns Hopkins University (Coursera)",
          "",
          "• Interactivity with JavaScript",
          "  University of Michigan (Coursera)",
        ].join("\n");
      },
    },
    links: {
      description: "Show portfolio links",
      action: () => {
        return [
          "Portfolio Links:",
          "",
          "• GitHub: https://github.com/C0SM1C",
          "• LinkedIn: https://www.linkedin.com/in/pratikpendurkar/",
        ].join("\n");
      },
    },
    about: {
      description: "About the system",
      action: () =>
        "Interactive terminal portfolio showcasing professional experience, skills, and achievements. Type 'help' to explore available commands.",
    },
  };

  const handleCommand = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const args = input.trim().split(" ");
      const cmd = args[0].toLowerCase();
      const cmdArgs = args.slice(1);

      // Add command to history
      setHistory((prev) => [...prev, { type: "command", content: input }]);

      // Process command
      if (commands[cmd]) {
        const output = commands[cmd].action(cmdArgs);
        if (output !== null) {
          // Only add output if not null (for clear command)
          setHistory((prev) => [...prev, { type: "output", content: output }]);
        }
      } else {
        setHistory((prev) => [
          ...prev,
          {
            type: "error",
            content: `Command not found: ${cmd}. Type "help" for available commands.`,
          },
        ]);
      }

      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Get last command from history
      const lastCommand = [...history]
        .reverse()
        .find((item) => item.type === "command");
      if (lastCommand) {
        setInput(lastCommand.content);
      }
    }
  };

  const getLineStyle = (type) => {
    switch (type) {
      case "command":
        return "text-green-400 font-bold";
      case "error":
        return "text-red-400";
      case "system":
        return "text-yellow-400";
      default:
        return "text-gray-200";
    }
  };
  return (
    <div
      className="h-full flex flex-col font-mono text-sm bg-gray-900 text-white"
      onClick={handleTerminalClick}
    >
      {/* Output Area */}
      <div
        className="flex-1 overflow-y-auto min-h-0 p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        ref={terminalRef}
      >
        {history.map((item, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap mb-2 ${getLineStyle(item.type)}`}
          >
            {item.type === "command" ? "> " : ""}
            {parseLinks(item.content)}
          </div>
        ))}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="flex items-center p-4 border-t border-gray-700 bg-gray-900">
        <span className="text-green-400 mr-2">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent focus:outline-none flex-1 text-white"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
