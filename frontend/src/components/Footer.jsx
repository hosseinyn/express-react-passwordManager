import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm dark:bg-gray-700">
      <div className="mx-aut p-4 omd:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Password Manager
            </span>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <ScrollLink to="features" smooth={true} duration={200} className="hover:underline me-4 md:me-6 cursor-pointer">
                Features
              </ScrollLink>
            </li>
            <li>
              <Link to="/login" className="hover:underline me-4 md:me-6">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://github.com/hosseinyn" className="hover:underline">
            Hosseinyn
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};


export default Footer;