import Link from "next/link";
import ToggleThemeButton from "./ToggleThemeButton";

export default function Navbar() {
  return (
    <nav className="bg-white/40 dark:bg-gray-950/40 backdrop-blur-sm fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto py-4 px-6">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            meteo4sport
          </span>
        </Link>

        <div className="md:order-2">
          <ToggleThemeButton />
        </div>
      </div>
    </nav>
  );
}
