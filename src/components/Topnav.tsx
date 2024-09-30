"use";

import { navItems } from "@/utils/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react/";
import { useState } from "react";

const Topnav = () => {
  const scrollById = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const [isMenuClicked, setIsMenuClicked] = useState(false);

  return (
    <div className="w-full h-[75px] flex flex-row bg-transparent border-b-[.5px] border-b-rose-500 justify-between px-[75px] items-center backdrop-blur-[5px] z-20 fixed left-0 top-0">
      <div className="flex flex-2 flex-row w-full h-full justify-start items-center">
        <Link
          href="/"
          className="text-[24px] hover:text-rose-500 font-bold duration-200 text-slate-300"
        >
          Parsa Airline
        </Link>
      </div>
      <div className="lg:flex md:flex flex-1 flex-row w-full h-full justify-evenly items-center gap-5 sm:hidden max-sm:hidden">
        {navItems.map((i, index) => (
          <span
            onClick={() => scrollById(i.title.toLowerCase())}
            key={index}
            className={`text-[18px] hover:text-rose-500 font-bold duration-200 text-slate-400 cursor-pointer focus:text-rose-400`}
          >
            {i.title}
          </span>
        ))}
      </div>
      <div className="lg:hidden md:hidden sm:flex max-sm:flex flex-col gap-2 w-fit p-1 h-full relative items-end justify-center">
        <button>
          {!isMenuClicked ? (
            <Menu
              className={`transition-all ${
                !isMenuClicked ? "opacity-[1]" : "opacity-0"
              }`}
              onClick={() => {
                setIsMenuClicked(!isMenuClicked);
              }}
            />
          ) : (
            <X
              className={`transition-all ${
                isMenuClicked ? "opacity-[1]" : "opacity-0"
              }`}
              onClick={() => {
                setIsMenuClicked(!isMenuClicked);
              }}
            />
          )}
        </button>
        <div
          className={`transition-all duration-500 ${
            isMenuClicked
              ? "flex opacity-[1] translate-y-[10px]"
              : "hidden opacity-0 translate-y-[-10px]"
          } absolute mt-[175px] w-fit h-fit p-3 rounded-lg bg-slate-800 flex-col gap-2 justify-center items-start`}
        >
          {navItems.map((i, index) => (
            <span
              onClick={() => scrollById(i.title.toLowerCase())}
              key={index}
              className={`text-[18px] hover:text-rose-500 font-bold duration-200 text-slate-400 cursor-pointer focus:text-rose-400`}
            >
              {i.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topnav;
