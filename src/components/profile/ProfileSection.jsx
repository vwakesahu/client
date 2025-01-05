import React from "react";

export const ProfileSection = ({ title, children }) => (
  <section>
    <h2 className="text-2xl font-light mb-6">{title}</h2>
    {children}
  </section>
);
