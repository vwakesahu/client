"use client";

import PopularCourses from "@/components/dashboard/popular-courses";
import { BadgeDollarSign, Building, Computer, DollarSign, DoorClosed, LayoutGrid, LucideGlasses, Play, Video } from "lucide-react";
import React, { useRef } from "react";

const Page = () => {
  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const categories = [
    { name: "All", icon: LayoutGrid, bgColor: "bg-black", textColor: "text-white" },
    { name: "IT & Software", icon: Computer, bgColor: "bg-[#F3EBE5]", textColor: "text-black" },
    { name: "Media Training", icon: Video, bgColor: "bg-[#F3EBE5]", textColor: "text-black" },
    { name: "Business", icon: Building, bgColor: "bg-[#F3EBE5]", textColor: "text-black" },
    { name: "Interior", icon: DoorClosed, bgColor: "bg-[#F3EBE5]", textColor: "text-black" },
  ];

  return (
    <div>
      <div className="mt-20">
        <p className="text-[5rem] font-light leading-[6rem] tracking-wide max-w-xl">
          Invest in your education
        </p>
      </div>

      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex mt-8 overflow-x-auto no-scrollbar"
      >
        <div className="flex gap-4 pb-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} p-2 rounded-full flex items-center gap-4 cursor-pointer shrink-0`}
            >
              <div className="bg-white w-12 h-12 rounded-full grid place-items-center">
                <category.icon />
              </div>
              <p className={`${category.textColor} pr-8 text-sm`}>{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      <PopularCourses />
    </div>
  );
};

export default Page;
