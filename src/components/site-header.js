"use client";
import React from "react";
import { Github, X, Wallet } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full px-4 sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between relative">
        <div className="md:flex hidden items-center space-x-8 z-20">
          <div className="text-gray-900 font-semibold">Certify/Blocks</div>
          <div className="flex space-x-4"></div>
        </div>
        <div className="absolute inset-x-0 h-full">
          <div className="relative h-20 w-full overflow-hidden rounded-b-2xl">
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
        <div className="md:flex hidden items-center justify-end space-x-4 z-20 w-full">
          <Link
            href="https://github.com/Certify-Labs"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900"
          >
            <Github />
          </Link>
          <Link
            href="https://x.com/CertifyBlocks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900"
          >
            <X />
          </Link>
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
