"use client";

import Topnav from "@/components/Topnav";
import Home from "@/components/Home";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";

function Page() {
  return (
    <div className="p-0 h-full w-full m-0">
      <Topnav />
      <span id="home" />
      <div className="flex flex-col justify-evenly items-center w-full h-full min-h-[100vh] bg-[#130f2b] py-[150px]">
        <div className="flex flex-col w-full h-full relative justify-center items-center gap-[500px]">
          <Home />
          <Gallery />
          <About />
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default Page;
