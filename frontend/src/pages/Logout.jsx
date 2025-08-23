import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("jwt_token");
    delay(1700)
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;