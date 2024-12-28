import React from "react";
import { Course } from "./course";
import { MenuIcon, ThumbsDownIcon } from "lucide-react";
import { LightningBoltIcon } from "@radix-ui/react-icons";

const MyCourses = () => {
  const courses = [
    {
      title: "Flutter Masterclass (Dart, APIs, Firebase & More)",
      category: "IT & Software",
      rating: 4.8,
      students: 9530,
      progress: 20,
      colorScheme: {
        darker: "#EF98A1",
        lighter: "#F3C5C5",
      },
      iconSvg: <MenuIcon size={10} />,
    },
    {
      title: "Advanced JavaScript Concepts",
      category: "Web Development",
      rating: 4.9,
      students: 12750,
      progress: 65,
      colorScheme: {
        darker: "#F8B577",
        lighter: "#FAE0C1",
      },
      iconSvg: <LightningBoltIcon />,
    },
  ];

  return (
    <div className="px-6 h-full ">
      {courses.map((course, index) => (
        <div className="pb-6" key={index}>
        <Course {...course} /></div>
      ))}
    </div>
  );
};

export default MyCourses;
