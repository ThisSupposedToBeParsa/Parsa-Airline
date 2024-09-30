"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [isGrabbedImage, setIsGrabbedImage] = useState(false);
  const homeRef = useRef(null);
  const isInView = useInView(homeRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
    if (!isInView) mainControls.start("hidden");
  });

  return (
    <section
      className="relative w-full px-[120px] max-sm:px-[30px] m-0"
      ref={homeRef}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, translateY: "-40px" },
          visible: { opacity: 1, translateY: "0" },
        }}
        initial="hidden"
        animate={mainControls}
        exit="hidden"
        transition={{ duration: 2, type: "spring" }}
        className="flex flex-row max-sm:flex-col justify-between items-center lg:gap-[50px] w-[100%] md:gap-[25px]"
      >
        <div className="flex flex-col gap-[35px] lg:w-[50%] sm:w-[100%] max-sm:w-[100%] md:w-[100%] p-0 m-0 home">
          <h1 className="text-[48px] text-left font-[800] w-full text-rose-600 hover:drop-shadow-md cursor-pointer duration-500">
            Traveling Made Easy With Us.
          </h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, translateX: "-70px" },
              visible: { opacity: 1, translateX: "0" },
            }}
            initial="hidden"
            animate={mainControls}
            exit="hidden"
            transition={{
              duration: 2,
              type: "spring",
            }}
            className="text-white lg:text-[24px] font-[100] border-b-[1px] pb-5 md:text-[22px] sm:text-[18px]"
          >
            Welcome to Parsa Airline, where exceptional air travel experiences
            await you. We are dedicated to providing top-notch service, comfort,
            and reliability to our valued passengers. With a strong emphasis on
            safety and a passion for creating unforgettable journeys, we aim to
            exceed your expectations. Whether you're traveling for business or
            leisure, trust Parsa Airline to elevate your flying experience. Join
            us on board as we embark on an incredible adventure together, making
            every moment memorable. Fly with Parsa Airline and discover the joy
            of travel like never before.
          </motion.p>
          <Button
            variant="outline"
            onClick={() =>
              document.getElementById("gallery")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              })
            }
            className="sm:block md:block lg:hidden"
          >
            See More
          </Button>
        </div>
        <div className="w-[50%] max-lg:hidden lg:flex flex-col justify-center items-center sm:hidden md:hidden max-sm:hidden">
          <motion.div
            variants={{
              hidden: { opacity: 0, translateX: "80px" },
              visible: { opacity: 1, translateX: "0" },
            }}
            initial="hidden"
            animate={mainControls}
            exit="hidden"
            transition={{ duration: 2, type: "spring" }}
            drag
            dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
            className={`transition-home-image ${
              isGrabbedImage ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseDown={() => setIsGrabbedImage(true)}
            onMouseUp={() => setIsGrabbedImage(false)}
            onMouseOut={() => setIsGrabbedImage(false)}
          >
            <Image
              alt="Airport"
              src="/AirportHome.svg"
              width={400}
              height={400}
              draggable={false}
            />
          </motion.div>
          <Button
            variant="outline"
            onClick={() =>
              document.getElementById("gallery")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              })
            }
          >
            See More
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
