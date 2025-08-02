import ParticlesBg from "particles-bg";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required").min(4).max(10),
  password: Yup.string().required("Password is required").min(7).max(20),
  confirmPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords are different')
});

const Signup = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
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
      axios
        .post("http://localhost:4001/auth/register", {
          username: formData.username,
          password: formData.password,
        })
        .then(function (response) {
          console.log(response)
          if (response.data.message) {
            navigate("/login")
          } else if (response.data.error){
            setFormErrors({login : response.data.error})
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
      <ParticlesBg type="tadpole" bg={true} />

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl text-center">
              Sign Up
            </h1>
            <form
              className="space-y-4 md:space-y-6 login-form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-white border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                  placeholder="Enter your username..."
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <p className="text-red-500 text-sm">{formErrors.username}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password..."
                  className="bg-white border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                  onChange={handleChange}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm">{formErrors.password}</p>
                )}
              </div>


              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Repeat your password..."
                  className="bg-white border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                  onChange={handleChange}
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-500 cursor-pointer hover:bg-blue-800 duration-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign up
              </button>

                {formErrors.login && <p className="text-red-500 text-sm animate__animated animate__tada ">{formErrors.login}</p>}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do you have an account? {""}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
