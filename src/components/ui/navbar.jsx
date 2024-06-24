import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const Navbar = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { children, classname = "md:h-20 h-16 px-14" } =
    props;
  return (
    <div
      className={`flex justify-between bg-primaryBackground dark:bg-secondaryGreen text-primaryForeground text-xl font-medium items-center text-center ${classname}`}>
      <img
        src="https://ucarecdn.com/88e77a97-1b4e-40b8-84c7-75cc09b65226/HJHJHJmin1.png"
        className="h-full object-contain"
        alt="Logo"
      />
      <p className="hidden md:block">Eruca's Vapestore</p>
      <div className="flex-grow flex justify-end items-center text-center">
        {children}
      </div>
      <button
        onClick={toggleTheme}
        className={`ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition duration-500 ease-in-out transform ${
          theme === "light"
            ? "bg-yellow-500 text-white"
            : "bg-gray-700 text-yellow-500"
        }`}>
        <span
          className={`transition duration-500 ease-in-out transform ${
            theme === "light" ? "rotate-0" : "rotate-180"
          }`}>
          {theme === "light" ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
};

export default Navbar;
