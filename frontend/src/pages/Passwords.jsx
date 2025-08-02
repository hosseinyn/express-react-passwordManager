import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import PasswordComponent from "../components/PasswordComponent";
import ParticlesBg from "particles-bg";
import Swal from "sweetalert2";
import { encryptPassword } from "../utils/EncryptPassword";

const jwt_token = Cookies.get("jwt_token");

const Passwords = () => {
  const [passwordList, setPasswordList] = useState([]);
  const [isPasswordAvailable, setIsAvailable] = useState(false);

  const handleAddPassword = () => {
    Swal.fire({
      title: "Add Password",
      html: `
      <p class="text-orange-500">Warning : Don't forget your encrypt key!</p>
    <input type="text" id="service" class="swal2-input" placeholder="Enter service name...">
    <input type="password" id="password" class="swal2-input" placeholder="Enter password ....">
    <input type="password" id="key" class="swal2-input" placeholder="Enter ecncrypt key...">
  `,
      confirmButtonText: "Add",
      focusConfirm: false,
      preConfirm: () => {
        const serviceName = document.getElementById("service").value;
        const passwordValue = document.getElementById("password").value;
        const encryptKey = document.getElementById("key").value;
        if (!serviceName || !passwordValue || !encryptKey) {
          Swal.showValidationMessage(`Enter service,password and encrypt key.`);
        }
        axios
          .post(
            "http://localhost:4001/passwords/add-password",
            {
              service: serviceName,
              encrypted_password: encryptPassword(passwordValue, encryptKey),
            },
            {
              headers: {
                Authorization: `${jwt_token}`,
              },
            }
          )
          .then(function (response) {
            handleGetPasswords();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });
  };

  const handleGetPasswords = async () => {
    await axios
      .get("http://127.0.0.1:4001/passwords/all-passwords", {
        headers: { Authorization: `${jwt_token}` },
      })
      .then((res) => {
        if (res.data.Passwords) {
          setPasswordList(JSON.parse(res.data.Passwords));
          setIsAvailable(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetPasswords();
  }, []);

  return (
    <>
      <ParticlesBg type="tadpole" bg={true} />
      <h1 className="mt-10 text-center text-3xl">Passwords</h1>

      <center>
        <button
          className="h-9 w-40 rounded-lg mt-3 bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer text-white"
          onClick={handleAddPassword}
        >
          Create a password
        </button>
      </center>

      {!isPasswordAvailable && (
        <h1 className="mt-23 text-blue-500 text-center">
          Create a password or refresh the page!
        </h1>
      )}

      <ul className="flex gap-10 mt-10 mb-30 ms-5 flex-row flex-wrap w-full max-w-screen-md">
        {passwordList.map((password) => (
          <PasswordComponent title={password.service} id={password.id} service={password.service} />
        ))}
      </ul>
    </>
  );
};

export default Passwords;
