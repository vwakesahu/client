"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Profile from "./profile";
import NumberOfGroupsJoined from "./number-groups";
import MyCourses from "./my-courses";

const RightSidebar = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <Profile />
        <NumberOfGroupsJoined />
      </div>

      <div className="p-6">
        <p className="font-semibold">My Courses</p>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <MyCourses />
      </div>
    </div>
  );
};

export default RightSidebar;
