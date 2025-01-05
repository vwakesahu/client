import React from "react";
import Image from "next/image";
import { Pencil, Save } from "lucide-react";

export const ProfileHeader = ({
  fullName,
  eduId,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => (
  <div className="relative rounded-3xl border bg-white overflow-hidden mb-8">
    <div className="absolute inset-0 flex">
      <div
        className="h-full relative w-full"
      >
      </div>
    </div>

    <div className="relative z-10 p-8">
      <div className="flex items-center gap-8">
        <div className="relative w-32 h-32">
          <Image
            src="/avatar.svg"
            alt="Profile"
            fill
            className="rounded-full object-cover bg-white"
          />
        </div>
        <div>
          <h1 className="text-[2.5rem] font-light tracking-wide mb-2">
            {fullName || "Your Profile"}
          </h1>
          <p className="text-xl text-gray-600">EDU ID: {eduId}</p>
        </div>
        <div className="ml-auto">
          {!isEditing ? (
            <button
              onClick={onEdit}
              className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="bg-[#F3EBE5] px-6 py-3 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
