import React from "react";

import { MenuIcon, ThumbsDownIcon } from "lucide-react";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Course } from "./course";

const PopularCourses = () => {
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
      title: "Advanced JavaScript Concepts Masterclass",
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
    {
      title: "Advanced JavaScript Concepts Masterclass",
      category: "Web Development",
      rating: 4.9,
      students: 12750,
      progress: 65,
      colorScheme: {
        darker: "#F8B577",
        lighter: "#D5D2FE",
      },
      iconSvg: <LightningBoltIcon />,
    },
    {
      title: "Advanced JavaScript Concepts Masterclass",
      category: "Web Development",
      rating: 4.9,
      students: 12750,
      progress: 65,
      colorScheme: {
        darker: "#F8B577",
        lighter: "#BFF0DB",
      },
      iconSvg: <LightningBoltIcon />,
    },  
  ];
  return (
    <div>
      <p className="my-6">Featured Courses</p>
      <div className="grid grid-cols-2 gap-2">
        {courses.map((course, index) => (
          <Course key={index} {...course} progress={0} />
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
