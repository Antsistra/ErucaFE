import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingNav = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext
  const [isNavbarVisible, setIsNavbarVisible] =
    useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <nav className="border-gray-200 bg-primaryBackground dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="#main"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold text-primaryForeground whitespace-nowrap dark:text-white ">
            Eruca's Vapestore
          </span>
        </a>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primaryForeground rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded={isNavbarVisible}
          onClick={toggleNavbar}>
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            isNavbarVisible ? "block" : "hidden"
          }`}
          id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-[#748d92] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="#main"
                className="block py-2 px-3 md:p-0 text-white  rounded md:bg-transparent md:text-secondaryGreen md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-[#124E66] md:hover:bg-transparent md:border-0 md:hover:text-secondaryGreen dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Services
              </a>
            </li>
            <li>
              <a
                href="#location"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-[#124E66] md:hover:bg-transparent md:border-0 md:hover:text-secondaryGreen dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Location
              </a>
            </li>
            <li>
              <Link to="/login">
                <button className="block py-2 px-3 md:p-0   text-gray-900 rounded hover:bg-[#124E66] md:hover:bg-transparent md:border-0 md:hover:text-secondaryGreen dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className={`rounded-full focus:outline-none focus:ring-2 lg:mt-0 lg:mb-0 lg:ml-0 mt-4 mb-4 ml-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition duration-500 ease-in-out transform ${
                  theme === "light"
                    ? "bg-yellow-500 text-white lg:pr-4 pr-9"
                    : "bg-gray-700 text-yellow-500 lg:pl-4 pl-9"
                }`}>
                <span
                  className={`transition duration-500 ease-in-out transform ${
                    theme === "light"
                      ? "rotate-0"
                      : "rotate-180"
                  }`}>
                  {theme === "light" ? "🌙" : "☀️"}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
