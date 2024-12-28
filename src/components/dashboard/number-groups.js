import { ChevronRight, User } from "lucide-react";
import React from "react";

const NumberOfGroupsJoined = () => {
  return (
    <div className="px-6">
    <div className="bg-white flex items-center justify-between px-6 py-4 rounded-full">
      <div className="flex gap-6">
        <User />
        <p>20 Courses Joined</p>
      </div>
      <div>
        <ChevronRight />
      </div>
    </div></div>
  );
};

export default NumberOfGroupsJoined;
