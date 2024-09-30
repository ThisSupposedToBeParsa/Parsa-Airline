import { galleryItems } from "@/utils/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import Modal from "./popup/Modal";

const Gallery = () => {
  const [imageState, setImageState] = useState<number>(3);
  const [imageClickedFS, setImageClickedFS] = useState<string>("");
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
    if (!isInView) mainControls.start("hidden");
  });

  return (
    <>
      <section
        className="relative w-full px-7 m-0 flex flex-col justify-center items-center gap-[25px] py-[75px]"
        id="gallery"
        ref={galleryRef}
      >
        <div className="flex flex-col justify-center items-center gap-[25px] w-full">
          <motion.h1
            variants={{
              hidden: { opacity: 0, translateY: "70px" },
              visible: { opacity: 1, translateY: "0px" },
            }}
            initial="hidden"
            animate={mainControls}
            exit="hidden"
            transition={{ duration: 1, type: "spring" }}
            className="text-[48px] text-center font-[800] w-fit text-rose-600 hover:drop-shadow-md cursor-pointer duration-500"
          >
            See us More Clear.
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, translateY: "70px" },
              visible: { opacity: 1, translateY: "0px" },
            }}
            initial="hidden"
            animate={mainControls}
            exit="hidden"
            transition={{ duration: 2, type: "spring" }}
            className="text-white text-[20px] font-[100] pb-5"
          >
            If your not interested yet, just take a look to our gallery!
          </motion.p>
        </div>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={mainControls}
          exit="hidden"
          transition={{ duration: 2, type: "spring" }}
          className="w-full h-fit lg:px-[50px] md:px-[30px] sm:px-[10px] max-sm:px-[10px] py-[20px] flex flex-row justify-center items-start gap-[15px] flex-wrap relative"
        >
          {galleryItems.map((i, index) => (
            <motion.div
              className="relative"
              variants={{
                hidden: { opacity: 0, translateY: i.translate },
                visible: { opacity: 1, translateY: "0px" },
              }}
              initial="hidden"
              animate={mainControls}
              exit="hidden"
              transition={{
                duration: i.transition,
                type: "spring",
                damping: 7,
                stiffness: 150,
              }}
              key={index}
            >
              <Image
                src={i.image}
                alt="Gallery Item"
                width={240}
                height={500}
                onClick={() => setImageState(i.state)}
                id={`gallerystate-${i.state}`}
                draggable={false}
                className={`object-contain cursor-pointer p-2 transition-all duration-200 ${
                  i.state === imageState
                    ? "w-[250px] h-[400px] border-[2px] border-rose-500 rounded-[15px] bg-slate-700 gallery-image-hover"
                    : "w-[200px] h-[250px] border-[2px] border-slate-500 rounded-[15px] bg-slate-900 grayscale-[75%]"
                }`}
              />
              <div
                className="w-full transition-all duration-500 p-[20px] absolute bottom-0 left-0 flex flex-row justify-start gap-[5px] items-center h-[45px] cursor-pointer"
                onClick={() => setImageState(i.state)}
              >
                {i.state === imageState && (
                  <div className="lg:flex flex-col justify-center items-center max-sm:hidden sm:hidden md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="transition-all outline-none"
                        asChild
                      >
                        <Button
                          variant="imageMore"
                          className="transition-all outline-none w-fit p-0 pb-3"
                        >
                          <Image
                            src="/icons/more.svg"
                            width={30}
                            height={30}
                            alt="More"
                            className="p-2 bg-rose-100 rounded-md cursor-pointer object-cover transition-all outline-none"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="z-20 w-fit transition-all overflow-hidden outline-none rounded-2xl border-[1px] border-slate-600">
                        <DropdownMenuItem className="bg-[#110c2b] py-2 px-2 transition-all outline-none pl-3 z-20">
                          <Link
                            target="_blank"
                            href={`_next/image?url=${i.image}&w=256&q=75`}
                            className="text-slate-500 transition-all mr-7 outline-none hover:text-rose-500"
                          >
                            Show Image in New Tab
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="border-slate-600 border-[1px] rounded-full" />
                        <DropdownMenuItem className="bg-[#110c2b] py-2 px-2 transition-all outline-none pl-3">
                          <p
                            className="text-slate-500 transition-all mr-7 outline-none hover:text-rose-500 cursor-pointer"
                            onClick={() => setImageClickedFS(i.image)}
                          >
                            Show In Full Screen
                          </p>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {imageClickedFS !== "" && (
        <Modal handleClose={() => setImageClickedFS("")} src={imageClickedFS} />
      )}
    </>
  );
};

export default Gallery;
