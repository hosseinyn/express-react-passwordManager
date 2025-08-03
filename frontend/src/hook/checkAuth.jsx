import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useAuthCheck = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const jwt = Cookies.get("jwt_token");

    if (!jwt) {
      setIsSignedIn(false);
      return;
    }

    axios
      .get("http://localhost:4001/auth/validate-token", {
        headers: {
          Authorization: `${jwt}`
        }
      })
      .then(() => setIsSignedIn(true))
      .catch(() => setIsSignedIn(false));
  }, [location.pathname]);

  return isSignedIn;
};

export default useAuthCheck;
