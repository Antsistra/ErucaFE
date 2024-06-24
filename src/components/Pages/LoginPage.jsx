import { useState } from "react";
import LoginLayouts from "../Layouts/LoginLayouts";
import { Toaster } from "../ui/toaster";
import useRedirectBasedOnRole from "../../hooks/useRedirectBasedOnRole";

const LoginPage = () => {
  const [token] = useState(localStorage.getItem("token"));

  useRedirectBasedOnRole(token);

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center h-screen dark:bg-slate-900 bg-slate-300">
        <LoginLayouts />
      </div>
    </>
  );
};

export default LoginPage;
