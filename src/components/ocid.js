"use client";

import { useOCAuth } from "@opencampus/ocid-connect-js";

const Ocid = () => {
  const { isInitialized, authState, ocAuth, OCId, ethAddress } = useOCAuth();

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (!isInitialized) {
    return <div className="p-4">Initializing...</div>;
  }

  if (authState.error) {
    return (
      <div className="p-4 text-red-500">Error: {authState.error.message}</div>
    );
  }

  if (authState.isAuthenticated) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">User Information</h2>
        <div className="space-y-2">
          <p>
            <strong>OCID:</strong> {OCId}
          </p>
          <p>
            <strong>ETH Address:</strong> {ethAddress}
          </p>
          <button
            onClick={() => ocAuth.signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign in with OCID
      </button>
    </div>
  );
};

export default Ocid;
