import React from "react";
import { Power } from "lucide-react";

export const Sidebar = () => {
  const userInfo = {
    name: "Pratik Pendurkar",
    age: "02/06/2002",
    activity: "Online",
    occupation: "Software Engineer",
    education: "bachelor of technology",
    location: "Pune, India",
  };

  return (
    <div className="w-96 h-full bg-indigo-200/90 text-indigo-950 font-retro border-r-2 border-indigo-300 flex flex-col absolute top-0 left-0 z-10">
      <div className="p-4 border-b-2 border-indigo-300">
        <h2 className="text-2xl font-bold tracking-wide mb-4">WELCOME</h2>
      </div>

      <div className="flex-1 p-4 space-y-6 text-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
          <div>
            <div className="opacity-80">NAME</div>
            <div className="font-bold">{userInfo.name}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-pink-400 flex items-center justify-center text-white text-xs">
            📅
          </div>
          <div>
            <div className="opacity-80">AGE</div>
            <div className="font-bold">{userInfo.age}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-blue-400 flex items-center justify-center">
            💻
          </div>
          <div>
            <div className="opacity-80">ACTIVITY</div>
            <div className="font-bold">{userInfo.activity}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-green-400 flex items-center justify-center">
            💼
          </div>
          <div>
            <div className="opacity-80">OCCUPATION</div>
            <div className="font-bold">{userInfo.occupation}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-yellow-400 flex items-center justify-center">
            😊
          </div>
          <div>
            <div className="opacity-80">Education</div>
            <div className="font-bold uppercase">{userInfo.education}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-red-400 flex items-center justify-center">
            📍
          </div>
          <div>
            <div className=" opacity-80">PLACE</div>
            <div className="font-bold">{userInfo.location}</div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t-2 border-indigo-300">
        <button className="flex items-center space-x-2 text-indigo-950 hover:text-indigo-700">
          <Power size={18} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
