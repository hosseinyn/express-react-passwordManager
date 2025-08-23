import ParticlesBg from "particles-bg";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const jwt_token = Cookies.get("jwt_token");

const schema = Yup.object().shape({
  current_password: Yup.string()
    .required("Current password is required")
    .min(7)
    .max(20),
  new_password: Yup.string()
    .required("New password is required")
    .min(7)
    .max(20),
  confirm_new_password: Yup.string().oneOf(
    [Yup.ref("new_password"), null],
    "Passwords are different"
  ),
});

const ChangePassword = () => {
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_URL;

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setFormErrors({});
      await axios
        .post(
          `${apiURL}/auth/change-password`,
          {
            current_password: formData.current_password,
            new_password: formData.new_password,
          },
          {
            headers: { Authorization: `${jwt_token}` },
          }
        )
        .then(function (response) {
          if (response.data.message) {
            Cookies.remove("jwt_token");
            navigate("/login");
          } else if (response.data.error == "Current password is not corrent"){
            setFormErrors({login: "Current password is not correct"})
          } else {
            console.log(response.data.error)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (errors) {
      const newErrors = {};
      errors.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setFormErrors(newErrors);
    }
  };

  return (
    <>
      <section>
        <ParticlesBg type="tadpole" bg={true} />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md text-black sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl text-center">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5 change-password-form"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="current_password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Current Password :
                </label>
                <input
                  type="password"
                  name="current_password"
                  id="current_password"
                  className="bg-white border-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your current password"
                  onChange={handleChange}
                  required
                />
                {formErrors.current_password && (
                  <p className="text-red-500 text-sm">{formErrors.current_password}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  placeholder="Enter the new password..."
                  className="bg-white border-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={handleChange}
                  required
                />
                {formErrors.new_password && (
                  <p className="text-red-500 text-sm">{formErrors.new_password}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm_new_password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm_new_password"
                  id="confirm_new_password"
                  placeholder="Repeat the new password"
                  className="bg-white border-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={handleChange}
                  required=""
                />
                {formErrors.confirm_new_password && (
                  <p className="text-red-500 text-sm">{formErrors.confirm_new_password}</p>
                )}
              </div>
              {formErrors.login && <p className="text-red-500 text-sm animate__animated animate__tada ">{formErrors.login}</p>}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 duration-300 cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset passwod
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
