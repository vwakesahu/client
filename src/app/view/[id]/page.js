"use client";
import { useParams } from "next/navigation";
import React from "react";
import { Star, Users, Clock, BookOpen, ChevronLeft } from "lucide-react";
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
    lessons: 180,
    price: 99.99,
    description: "Master Flutter development with this comprehensive course covering Dart, APIs, Firebase, and more.",
    colorScheme: {
      darker: "#EF98A1",
      lighter: "#F3C5C5",
    },
  };

  return (
    <div className="max-w-6xl mx-auto mt-20">
      <Link href="/dashboard/search" className="flex items-center text-gray-600 mb-12">
        <ChevronLeft size={20} />
        <span className="ml-2 text-sm">Back to Courses</span>
      </Link>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2">
          <h1 className="text-[3rem] font-light leading-[3.5rem] tracking-wide mb-8">{course.title}</h1>
          
          <div className="flex items-center mb-8">
            <div className={`bg-[${course.colorScheme.lighter}] p-2 rounded-full flex items-center mr-2`}>
              <div className={`bg-[${course.colorScheme.darker}] w-12 h-12 rounded-full grid place-items-center`}>
                <BookOpen size={20} className="" />
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

          <p className="text-gray-700 mb-8 text-base">{course.description}</p>

          <div className="flex items-center mb-8">
            <Clock className="text-gray-400 mr-2" size={20} />
            <span className="mr-6 text-sm">{course.hours} hours</span>
            <BookOpen className="text-gray-400 mr-2" size={20} />
            <span className="text-sm">{course.lessons} lessons</span>
          </div>

          <h2 className="text-xl font-normal mb-4">What you'll learn</h2>
          <ul className="list-disc pl-5 mb-8 text-base space-y-2">
            <li>Dart programming language fundamentals</li>
            <li>Building responsive UIs with Flutter</li>
            <li>Integrating APIs and working with Firebase</li>
            <li>Advanced state management techniques</li>
          </ul>
        </div>

        <div className="col-span-1">
          <div className={`bg-[${course.colorScheme.lighter}] rounded-3xl p-8`}>
            <div className={`bg-[${course.colorScheme.darker}] w-16 h-16 rounded-full grid place-items-center mb-6`}>
              <BookOpen size={24} className="text-white" />
            </div>
            <p className="text-4xl font-light mb-8">${course.price}</p>
            <button className="w-full bg-black text-white py-3 rounded-full font-normal text-sm hover:bg-gray-800 transition duration-300">
              Buy Now
            </button>
            <p className="text-center text-xs text-gray-600 mt-4">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
