import React from "react";

export const InputField = React.memo(
  ({
    icon: Icon,
    label,
    value,
    onChange,
    disabled = false,
    isEditing,
    colorScheme = { darker: "#F3EBE5", lighter: "#F8F8F8" },
  }) => (
    <div className="mb-6">
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex">
          <div
            className="h-full relative w-full border"
            style={{
              backgroundColor: colorScheme.darker,
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent"
              style={{ to: `${colorScheme.darker}20` }}
            ></div>
          </div>
        </div>

        <div className="relative z-10 flex items-center min-h-[72px]">
          <div className="absolute left-6 flex items-center gap-3 pointer-events-none">
            <div className="bg-white p-2 rounded-full">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </div>

          {isEditing && (
            <input
              type="text"
              value={value}
              onChange={onChange}
              disabled={!isEditing || disabled}
              placeholder={`Enter your ${label.toLowerCase()}`}
              className="w-full h-full py-6 pl-48 pr-32 bg-transparent outline-none text-black disabled:cursor-not-allowed placeholder:text-gray-500"
            />
          )}

          <div
            className={`absolute right-6 ${
              isEditing ? "text-gray-400" : "text-gray-700"
            }`}
          >
            <span>{value}</span>
          </div>
        </div>
      </div>
    </div>
  )
);

InputField.displayName = "InputField";
