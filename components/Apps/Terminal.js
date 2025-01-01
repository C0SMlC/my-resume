import { useEffect, useRef, useState } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    'Welcome to the Portfolio Terminal! Type "help" for available commands.',
  ]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = terminalRef.current;
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [history]);

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
        ].join("\n");
      },
    },
    clear: {
      description: "Clear terminal",
      action: () => {
        setHistory([]);
        return "";
      },
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
          "Work Experience:",
          "",
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
          "Education:",
          "",
          "• Bachelor of Technology",
          "  Electronics And Computer Science",
          "  College of Engineering",
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

      let output;
      if (commands[cmd]) {
        output = commands[cmd].action(cmdArgs);
      } else {
        output = `Command not found: ${cmd}. Type "help" for available commands.`;
      }

      if (input !== "clear") {
        setHistory((prev) => [...prev, `> ${input}`, output]);
      }
      setInput("");
    }
  };

  return (
    <div className="font-mono text-sm h-full flex flex-col">
      <div className="flex-1 overflow-auto" ref={terminalRef}>
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap mt-2">
            {line}
          </div>
        ))}
      </div>
      <div className="flex mt-auto">
        <span className="mr-2">{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent focus:outline-none flex-1 terminal-input"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
