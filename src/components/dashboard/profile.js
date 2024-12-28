"use client";
import { BellIcon, CopyIcon, Settings2, CheckIcon } from "lucide-react";
import React, { useState, useCallback } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const IconButton = ({ Icon }) => (
  <div className={cn(buttonVariants({ variant: "ghost" }))}>
    <Icon />
  </div>
);

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const address = "0x12435...5648";

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [address]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full">
        <IconButton Icon={BellIcon} />
        <IconButton Icon={Settings2} />
      </div>

      <div className="flex flex-col gap-4 items-center w-full mt-6">
        <Image
          src="/avatar.svg"
          width={100}
          height={100}
          alt="Profile"
          className="rounded-full"
        />

        <div className="flex items-center relative">
          <p className="text-xl font-semibold">{address}</p>
          <div
            className="absolute -right-9 cursor-pointer hover:bg-white p-2 rounded-md transition-all duration-300"
            onClick={copyToClipboard}
          >
            {copied ? (
              <CheckIcon size={15} className="text-green-700 animate-bounce" />
            ) : (
              <CopyIcon size={15} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
