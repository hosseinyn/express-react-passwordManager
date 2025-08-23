import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const useAuthCheck = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);

  const apiURL = import.meta.env.VITE_URL;

  useEffect(() => {
    const jwt_token = Cookies.get("jwt_token");

    if (!jwt_token) {
      setIsSignedIn(false);
      return;
    }

    axios
      .get(`${apiURL}/auth/validate-token`, {
        headers: { Authorization: `${jwt_token}` },
      })
      .then(() => {
        setIsSignedIn(true);
      })
      .catch(() => {
        setIsSignedIn(false);
      });
  }, []);

  return isSignedIn;
};

const NoSignedInRoute = () => {
  const [authState, setAuthState] = useState("loading");
  const jwt_token = Cookies.get("jwt_token");

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
    return <Outlet />;
  }

  return <Navigate to="/dashboard" />;
};


export default NoSignedInRoute;
