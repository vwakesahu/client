"use client";

import { LoginCallBack, useOCAuth } from "@opencampus/ocid-connect-js";
import { useRouter } from "next/navigation";

const CustomErrorComponent = () => {
  const { authState } = useOCAuth();
  return (
    <div className="p-4 text-red-500">
      Error Logging in: {authState.error?.message}
    </div>
  );
};

const CustomLoadingComponent = () => {
  return <div className="p-4">Authenticating...</div>;
};

const RedirectPage = () => {
  const router = useRouter();

  const loginSuccess = () => {
    router.push("/"); // Redirect to home page after successful login
  };

  const loginError = (error) => {
    console.error("Login error:", error);
    // Handle error as needed
  };

  return (
    <LoginCallBack
      errorCallback={loginError}
      successCallback={loginSuccess}
      customErrorComponent={CustomErrorComponent}
      customLoadingComponent={CustomLoadingComponent}
    />
  );
};

export default RedirectPage;
