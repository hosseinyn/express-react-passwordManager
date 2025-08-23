import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [authState, setAuthState] = useState("loading");
  const jwt_token = Cookies.get("jwt_token");

  const apiURL = import.meta.env.VITE_URL;

  useEffect(() => {
    if (!jwt_token) {
      setAuthState("unauthorized");
      return;
    }

    axios
      .get(`${apiURL}/auth/validate-token`, {
        headers: { Authorization: `${jwt_token}` },
      })
      .then((res) => {
          setAuthState("authenticated");
      })
      .catch(() => {
        setAuthState("unauthorized");
      });
  }, []);

  if (authState === "loading") {
    return <div className="text-center mt-20 text-black">Checking...</div>;
  }

  if (authState === "unauthorized") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
