import React from "react";

const CertificateSVG = ({
  name = "Vivek Sahu",
  seriesTitle = "Design Basics: Core Principles for Visual Design",
  moduleCount = "80",
  host = "Swayam Karle",
  issueDate = "April 9, 2022",
}) => {
  return (
    <svg
      viewBox="0 0 1000 600"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="curved-pattern"
          patternUnits="userSpaceOnUse"
          width="60"
          height="60"
          patternTransform="rotate(-15)"
        >
          <path
            d="M -20 40 Q 0 38, 20 40 Q 40 42, 60 40 Q 80 38, 100 40"
            stroke="#FFE4B0"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Background with rounded corners */}
      <rect width="100%" height="100%" fill="white" rx="24" />
      <rect width="100%" height="100%" fill="url(#curved-pattern)" rx="24" />

      {/* Main circle with logo */}
      <g transform="translate(150, 150)">
        <circle cx="50" cy="50" r="80" fill="#FFD95A" />
        {/* Thumbs up icon */}
        <path
          d="M30 60 C 40 40, 60 40, 70 60"
          stroke="black"
          strokeWidth="3"
          fill="none"
        />
        {/* Dotted circle border */}
        <circle
          cx="50"
          cy="50"
          r="85"
          stroke="#ddd"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
        />
      </g>

      {/* Certificate text content */}
      <text x="400" y="150" fill="#666" fontSize="16">
        This is to certify that
      </text>
      <text x="400" y="190" fontSize="24" fontWeight="bold">
        {name}
      </text>
      <text x="400" y="230" fill="#666" fontSize="16">
        has successfully completed the series:
      </text>
      <text x="400" y="270" fontSize="24" fontWeight="bold">
        {seriesTitle.split(" ").slice(0, 6).join(" ")}
      </text>
      <text x="400" y="305" fontSize="24" fontWeight="bold">
        {seriesTitle.split(" ").slice(6).join(" ")}
      </text>
      <text x="520" y="305" fill="#666" fontSize="16">
        - {moduleCount} Modules
      </text>
      <text x="400" y="350" fill="#666" fontSize="16">
        hosted by {host}
      </text>
      <text x="400" y="420" fill="#666" fontSize="16">
        Issued on
      </text>
      <text x="400" y="450" fontSize="20">
        {issueDate}
      </text>

      {/* Footer logo */}
      <g transform="translate(400, 520)">
        <path
          d="M0 0 Q 8 12, 16 0"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        <text x="24" y="4" fontSize="18" fontWeight="500">
          superpeer
        </text>
      </g>
    </svg>
  );
};

export default CertificateSVG;
