"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useCallback, useEffect, useState } from "react";

const GetStarted = ({onClickStarted}) => {
  const [isClicked, setIsClicked] = useState(false);

  const { RiveComponent, rive } = useRive({
    src: "/rive/intro.riv",
    stateMachines: "Motion",
    autoplay: true,
  });

  const hoverInput = useStateMachineInput(rive, "Motion", "isHover");

  useEffect(() => {
    if (hoverInput) {
      hoverInput.value = isClicked;
    }
  }, [hoverInput, isClicked]);

  const handleClick = useCallback(() => {
    onClickStarted()
    setIsClicked((prevState) => !prevState);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <RiveComponent
        onClick={handleClick}
        style={{
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default GetStarted;
