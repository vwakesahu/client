'use client'
import React from "react";
import { Github, X, Wallet } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full px-4 sticky top-0 bg-white/80">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-gray-900 font-semibold">Certify/Blocks</div>
          <div className="flex space-x-4"></div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 h-full">
          <div className="relative h-16 w-[26rem] overflow-hidden rounded-b-2xl">
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-b-2xl border-gray-200/50">
              <div className="glass-effect h-full w-full"></div>
            </div>
            <svg className="hidden">
              <defs>
                <filter id="fractal-noise">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.12 0.12"
                    numOctaves="1"
                    result="warp"
                  />
                  <feDisplacementMap
                    xChannelSelector="R"
                    yChannelSelector="G"
                    scale="30"
                    in="SourceGraphic"
                    in2="warp"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Wallet className="h-5 w-5" />
            <span>Connect Wallet</span>
          </button> */}
          <Github className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900" />
          <X className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900" />
        </div>
      </div>

      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.4);
          background: repeating-radial-gradient(
            circle at 50% 50%,
            rgb(255 255 255 / 0),
            rgba(255, 255, 255, 0.4) 10px,
            rgb(255 255 255) 31px
          );
          filter: url(#fractal-noise);
          background-size: 6px 6px;
          backdrop-filter: blur(0px);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;