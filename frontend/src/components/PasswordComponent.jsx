import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faRightToBracket , faPencil } from '@fortawesome/free-solid-svg-icons';
import { decryptPassword } from "../utils/EncryptPassword";
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const jwt_token = Cookies.get("jwt_token")

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
          .get(
            `http://localhost:4001/passwords/get-password/${id}`,
            {
              headers: {
                Authorization: `${jwt_token}`,
              },
            }
          )
          .then(function (response) {
            const encrypted_password = response.data.Password.password;
            const decrypted_password = decryptPassword(encrypted_password , encryptKey)
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

const PasswordComponent = (props) => {
    return(
        <div className="flex flex-col gap-3 items-center bg-gray-800 min-h-38 min-w-40 rounded-lg pt-4 text-white px-4 py-2 w-fit">
                <h2 className="text-2xl">{props.title}</h2>
                <button className="h-8 w-36 rounded-lg bg-green-500 hover:bg-green-700 duration-300 cursor-pointer" onClick={() => handleGetPassword(props.id)}>Watch <FontAwesomeIcon icon={faRightToBracket} className="text-xl" /></button>

                <button className="h-8 w-36 rounded-lg bg-yellow-500 hover:bg-yellow-700 duration-300 cursor-pointer"><Link to={props.link}>Edit <FontAwesomeIcon icon={faPencil} className="text-xl" /></Link></button>
            </div>
    );
}


export default PasswordComponent;