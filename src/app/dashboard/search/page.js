"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, X, MenuIcon } from "lucide-react";
import { Course } from "@/components/dashboard/course";
import { LightningBoltIcon } from "@radix-ui/react-icons";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const searchResults = [
    {
      id: 124,
      title: "React Fundamentals Masterclass Oneshot",
      category: "Web Development",
      rating: 4.7,
      students: 8500,
      progress: 0,
      colorScheme: {
        darker: "#61DAFB",
        lighter: "#DEF0BF",
      },
      link: "/",
      iconSvg: <Search size={10} />,
    },
    {
      id: 124,
      title: "Flutter Masterclass (Dart, APIs, Firebase & More)",
      category: "IT & Software",
      rating: 4.8,
      students: 9530,
      progress: 20,
      colorScheme: {
        darker: "#EF98A1",
        lighter: "#F3C5C5",
      },
      link: "/",
      iconSvg: <MenuIcon size={10} />,
    },
    {
      id: 124,
      title: "Advanced JavaScript Concepts Masterclass",
      category: "Web Development",
      rating: 4.9,
      students: 12750,
      progress: 65,
      colorScheme: {
        darker: "#F8B577",
        lighter: "#FAE0C1",
      },
      link: "/",
      iconSvg: <LightningBoltIcon />,
    },
    {
      id: 124,
      title: "Advanced JavaScript Concepts Masterclass",
      category: "Web Development",
      rating: 4.9,
      students: 12750,
      progress: 65,
      colorScheme: {
        darker: "#F8B577",
        lighter: "#D5D2FE",
      },
      link: "/",
      iconSvg: <LightningBoltIcon />,
    },
    {
      id: 124,
      title: "Advanced JavaScript Concepts Masterclass",
      category: "Web Development",
      rating: 4.9,
      students: 12750,
      progress: 65,
      colorScheme: {
        darker: "#F8B577",
        lighter: "#BFF0DB",
      },
      link: "/",
      iconSvg: <LightningBoltIcon />,
    },
    // Add more mock results here
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    filterResults();
  };

  const filterResults = () => {
    const filtered = searchResults.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  useEffect(() => {
    filterResults();
  }, [searchTerm]);

  const addFilter = (filter) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  return (
    <div className="mt-24">
      <h1 className="text-4xl mb-8">Find Your Next Course</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex items-center border-2 rounded-full p-2">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow outline-none bg-transparent"
          />
          <button
            type="submit"
            className="bg-black hover:bg-black/80 text-white rounded-full px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 gap-4">
        {filteredResults.map((course, index) => (
          <Course key={index} {...course} progress={0} link={`/view/${course.id}`} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
