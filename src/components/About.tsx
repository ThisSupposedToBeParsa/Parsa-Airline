"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { aboutItems } from "@/utils/utils";

const About = () => {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
    if (!isInView) mainControls.start("hidden");
  });

  return (
    <section
      className="relative w-full px-7 m-0 flex flex-col justify-center items-center gap-[25px] py-[75px]"
      id="about"
      ref={aboutRef}
    >
      <div className="flex flex-row-reverse justify-center items-center gap-[25px] w-full">
        <motion.h1
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={mainControls}
          exit="hidden"
          transition={{ duration: 1, type: "spring" }}
          className="text-[48px] text-center font-[800] w-fit text-rose-600 hover:drop-shadow-md cursor-pointer duration-500"
        >
          Know More About Our Company.
        </motion.h1>
      </div>
      <motion.div
        className="px-9 transition-all"
        variants={{
          hidden: { opacity: 0, translateY: "70px" },
          visible: { opacity: 1, translateY: "0" },
        }}
        initial="hidden"
        animate={mainControls}
        exit="hidden"
        transition={{ duration: 2, type: "spring" }}
      >
        <Accordion
          type="multiple"
          className="lg:w-[900px] bg-slate-900 p-2 rounded-[15px] border border-stone-700 text-white transition-all md:w-[650px] sm:w-[500px] max-sm:w-[370px]"
        >
          {aboutItems.map((i, index) => (
            <AccordionItem
              value={i.value}
              className="transition-all"
              key={index}
            >
              <AccordionTrigger className="text-rose-500 w-[100%] text-left px-4 py-2 text-[24px] border-b border-b-stone-600 transition-all">
                - {i.title}
              </AccordionTrigger>
              <AccordionContent
                className={`transition-all pl-9 pb-8 pt-2 animate-accordion-down opacity-1 text-[20px]`}
              >
                {i.desc}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default About;
