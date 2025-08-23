import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { decryptPassword, encryptPassword } from "../utils/EncryptPassword";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const jwt_token = Cookies.get("jwt_token");

const apiURL = import.meta.env.VITE_URL;

const handleGetPassword = async (id) => {
  Swal.fire({
    title: "Get Password",
    html: `
    <input type="password" id="key" class="swal2-input" placeholder="Enter encrypt key....">
  `,
    confirmButtonText: "Decrypt",
    focusConfirm: false,
    preConfirm: () => {
      const encryptKey = document.getElementById("key").value;
      if (!encryptKey) {
        Swal.showValidationMessage(`Enter encrypt key.`);
      }
      axios
        .get(`${apiURL}/passwords/get-password/${id}`, {
          headers: {
            Authorization: `${jwt_token}`,
          },
        })
        .then(function (response) {
          const encrypted_password = response.data.Password.password;
          const decrypted_password = decryptPassword(
            encrypted_password,
            encryptKey
          );
          Swal.fire({
            title: "Here's your password!",
            text: decrypted_password,
            icon: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
};

const handleUpdatePassword = async (id, service) => {
  Swal.fire({
    title: "Update Password",
    html: `
      <p class="text-orange-500">Warning : Don't forget your encrypt key!</p>
    <input type="password" id="new_password" class="swal2-input" placeholder="Enter new password....">
    <input type="password" id="key" class="swal2-input" placeholder="Enter new encrypt key....">
  `,
    confirmButtonText: "Update",
    focusConfirm: false,
    preConfirm: () => {
      const newPassword = document.getElementById("new_password").value;
      const encryptKey = document.getElementById("key").value;
      if (!encryptKey || !newPassword) {
        Swal.showValidationMessage(`Enter encrypt key and new password.`);
      }
      axios
        .post(
          `${apiURL}/passwords/update-password`,
          {
            id: id,
            service: service,
            new_password: encryptPassword(newPassword, encryptKey),
          },
          {
            headers: {
              Authorization: `${jwt_token}`,
            },
          }
        )
        .then(function (response) {
          Swal.fire({
            title: "Your password Updated !",
            icon: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
};

const handleDeletePassword = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert your password!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${apiURL}/passwords/delete-password`, {
          headers: {
            Authorization: `${jwt_token}`,
          },
          data: { id: id },
        })
        .then(function (response) {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            showConfirmButton: true
          }).then((result) => {
            if (result.isConfirmed){
                window.location.reload()
            }
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
};

const PasswordComponent = (props) => {
  return (
    <div className="flex flex-col gap-3 items-center bg-gray-800 min-h-50 min-w-40 rounded-lg pt-4 text-white px-4 py-2 w-fit">
      <h2 className="text-2xl">{props.title}</h2>
      <button
        className="h-8 w-36 rounded-lg bg-green-500 hover:bg-green-700 duration-300 cursor-pointer"
        onClick={() => handleGetPassword(props.id)}
      >
        Watch <FontAwesomeIcon icon={faRightToBracket} className="text-xl" />
      </button>

      <button
        className="h-8 w-36 rounded-lg bg-yellow-500 hover:bg-yellow-700 duration-300 cursor-pointer"
        onClick={() => handleUpdatePassword(props.id, props.service)}
      >
        Edit <FontAwesomeIcon icon={faPencil} className="text-xl" />
      </button>

      <button
        className="h-8 w-36 rounded-lg bg-red-500 hover:bg-red-700 duration-300 cursor-pointer"
        onClick={() => handleDeletePassword(props.id)}
      >
        Delete <FontAwesomeIcon icon={faTrash} className="text-xl" />
      </button>
    </div>
  );
};

export default PasswordComponent;
