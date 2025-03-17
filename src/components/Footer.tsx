import Image from "next/image";
import NextjsIcon from "../../public/nextjs_icon_dark.svg";
import TailwindIcon from "../../public/tailwindcss.svg";

export const FooterBar = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center mt-auto border-t border-gray-200 dark:border-gray-800 p-7">
      <div className="w-full mx-auto max-w-screen-lg flex flex-col md:flex-row items-center justify-between gap-y-1">
        <div className="text-sm">
          <span className="text-transparent bg-gradient-to-r from-cyan-600 to-purple-500 bg-clip-text mr-2">
            © {currentYear}
          </span>
          Creado con ❤️️ por{" "}
          <a className="underline" href="https://github.com/bautista225">
            Juan Bautista
          </a>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 flex flex-row items-center gap-x-1">
          Desarrollado con{" "}
          <Image src={NextjsIcon} alt={""} width={20} height={20} /> Next.js y
          <Image src={TailwindIcon} alt={""} width={20} height={20} /> Tailwind
        </span>
      </div>
    </footer>
  );
};
