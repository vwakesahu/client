"use client";
import {
  Calendar1,
  HomeIcon,
  LayoutGrid,
  Search,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const IconButton = ({ icon: Icon, isActive, href = "" }) => (
  <Link
    href={href}
    className={`w-16 h-16 rounded-full grid place-items-center cursor-pointer ${
      isActive ? "bg-black text-white" : "bg-white hover:bg-black/70 hover:text-white"
    }`}
  >
    <Icon />
  </Link>
);

const LeftSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: HomeIcon, path: "/dashboard/home" },
    { icon: Search, path: "/dashboard/search" },
    { icon: Calendar1, path: "/dashboard/calendar" },
    // { icon: LayoutGrid, path: "/dashboard/explore" },
    { icon: User, path: "/dashboard/user" },
  ];

  return (
    <div className="h-full w-full relative">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="p-3 w-full mx-auto py-10 sticky top-0 bg-[#F3EBE5]">
            <Image
              src="/smile.svg"
              width={35}
              height={35}
              className="mx-auto"
              alt="Logo"
            />
          </div>
          <div className="mx-auto flex justify-center">
            <IconButton icon={ShoppingBag} href="/dashboard/edustore" isActive={ pathname === "/dashboard/edustore" } />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {menuItems.map(({ icon, path }) => (
            <div key={path} className="mx-auto flex justify-center">
              <IconButton
                icon={icon}
                isActive={pathname === path}
                href={path}
              />
            </div>
          ))}
        </div>

        <div className="p-3 w-full mx-auto py-10 sticky top-0 bg-[#F3EBE5]">
          <div className="mx-auto flex justify-center">
            <Image
              src="/avatar.svg"
              width={64}
              height={64}
              className="bg-white rounded-full cursor-pointer hover:bg-white/90"
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
