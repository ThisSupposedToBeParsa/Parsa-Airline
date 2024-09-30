"use client";

import Image from "next/image";
import PopupBackdrop from "./PopupBackdrop";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingComponent from "../loading/LoadingComponent";

const Modal = ({
  src,
  handleClose,
}: {
  src: string;
  handleClose: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <PopupBackdrop onClick={handleClose}>
      <motion.div
        initial={{ translateY: "-100vh" }}
        animate={{ translateY: "0" }}
        exit={{ translateY: "-100vh" }}
        onClick={(e) => e.stopPropagation()}
        className="w-[750px] h-[550px] bg-slate-800 rounded-lg flex flex-row justify-center items-center p-5"
      >
        <Image
          src="/icons/x.svg"
          width={30}
          height={30}
          alt="X"
          onClick={handleClose}
          className="cursor-pointer z-40 absolute top-3 left-3 bg-white p-1 rounded-md"
        />
        {!imageLoaded && <LoadingComponent />}
        <Image
          alt="Image FS"
          src={src}
          width={720}
          height={520}
          className={`max-w-[750px] max-h-[550px] object-contain relative p-5 rounded-lg cursor-pointer`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>
    </PopupBackdrop>
  );
};

export default Modal;
