import Swal from "sweetalert2";
import ParticlesBg from "particles-bg";
import { useNavigate, useViewTransitionState } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const jwt_token = Cookies.get("jwt_token");

const DeleteAccount = () => {
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_URL;

  useEffect(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${apiURL}/auth/delete-account`, {
            headers: {
              Authorization: `${jwt_token}`,
            },
          })
          .then(function (response) {
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <>
      <ParticlesBg type="tadpole" bg={true} />
      <div className="mb-96"></div>
    </>
  );
};

export default DeleteAccount;
