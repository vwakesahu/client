"use client";
import { useParams } from "next/navigation";
import React from "react";
import { Star, Users, BookOpen, ChevronLeft, Play } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { id } = useParams();

  // Mock course data (replace with actual data fetching logic)
  const course = {
    id: id,
    title: "Flutter Masterclass (Dart, APIs, Firebase & More)",
    category: "IT & Software",
    instructor: "Jane Doe",
    rating: 4.8,
    students: 9530,
    hours: 42,
    lessons: [
      { title: "Introduction to Flutter", duration: "10:30" },
      { title: "Dart Fundamentals", duration: "15:45" },
      { title: "Building Your First Flutter App", duration: "20:15" },
      { title: "Working with APIs", duration: "18:20" },
      { title: "Firebase Integration", duration: "25:00" },
    ],
    price: 99.99,
    description:
      "Master Flutter development with this comprehensive course covering Dart, APIs, Firebase, and more.",
    colorScheme: {
      darker: "#EF98A1",
      lighter: "#F3C5C5",
    },
  };

  return (
    <div className="max-w-7xl mx-auto mt-24">
      <Link
        href="/dashboard/search"
        className="flex items-center text-gray-600 mb-12"
      >
        <ChevronLeft size={20} />
        <span className="ml-2 text-sm">Back to Courses</span>
      </Link>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2">
          <h1 className="text-[3rem] font-light leading-[3.5rem] tracking-wide mb-8">
            {course.title}
          </h1>

          <div className="flex items-center mb-8">
            <div
              className={`bg-[${course.colorScheme.lighter}] p-2 rounded-full flex items-center gap-4 mr-6`}
            >
              <div
                className={`bg-[${course.colorScheme.darker}] w-12 h-12 rounded-full grid place-items-center`}
              >
                <BookOpen size={20} className="text-white" />
              </div>
              <p className="pr-8 text-sm">{course.category}</p>
            </div>
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-1" size={16} />
              <span className="mr-4 text-sm">{course.rating}</span>
              <Users className="text-gray-400 mr-1" size={16} />
              <span className="text-sm">{course.students} students</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>

          <div className="bg-[#F3EBE5] rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-serif mb-4">Course Content</h2>
            {course.lessons.map((lesson, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg mb-2 ${
                  index === 0 ? "bg-black text-white" : ""
                }`}
              >
                <div className="flex items-center">
                  <Play size={16} className="mr-4" />
                  <span className="text-sm">{lesson.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">{lesson.duration}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-700 mb-8 text-base">{course.description}</p>
        </div>

        <div className="col-span-1">
          <div
            className={`bg-[${course.colorScheme.lighter}] rounded-3xl p-8 sticky top-20`}
          >
            <div
              className={`bg-[${course.colorScheme.darker}] w-16 h-16 rounded-full grid place-items-center mb-6`}
            >
              <BookOpen size={24} className="text-white" />
            </div>
            <p className="text-4xl font-light mb-8">${course.price}</p>
            <button className="w-full bg-black text-white py-3 rounded-full font-normal text-sm hover:bg-gray-800 transition duration-300">
              Buy Now
            </button>
            <p className="text-center text-xs text-gray-600 mt-4">
              30-Day Money-Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
