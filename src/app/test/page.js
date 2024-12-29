"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";

const RiveAnimation = () => {
  const { RiveComponent, rive } = useRive({
    src: "/rive/intro.riv",
    stateMachines: "Motion",
    autoplay: true,
  });

  const hoverInput = useStateMachineInput(rive, "Motion", "isHover");

  useEffect(() => {
    if (hoverInput) {
      // Set initial value
      hoverInput.value = false;
    }
  }, [hoverInput]);

  const handleMouseEnter = () => {
    if (hoverInput) {
      hoverInput.value = true;
    }
  };

  const handleMouseLeave = () => {
    if (hoverInput) {
      hoverInput.value = false;
    }
  };

  return (
    <div 
      style={{ 
        width: "100%",
        height: "400px",
        maxWidth: "500px",
        margin: "0 auto"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <RiveComponent />
    </div>
  );
};

export default RiveAnimation;
