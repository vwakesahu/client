"use client";

import { OCConnect } from "@opencampus/ocid-connect-js";

const OCConnectWrapper = ({ children }) => {
  const opts = {
    redirectUri: "http://localhost:3000/redirect", // Update with your redirect URL
    referralCode: "", // Update with your partner code
  };

  return (
    <OCConnect opts={opts} sandboxMode={true}>
      {children}
    </OCConnect>
  );
};

export default OCConnectWrapper;
