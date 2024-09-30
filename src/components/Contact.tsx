"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { getLatestMessages, sendMessageToDB } from "@/actions/sendMessage";
import { DataType } from "@/types/types";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    message: "",
  });
  const [btnStatus, setBtnStatus] = useState<"Send" | "Sending..." | "Sent!">(
    "Send"
  );
  const [messages, setMessages] = useState<DataType[] | undefined>([]);

  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
    if (!isInView) mainControls.start("hidden");
  });

  useEffect(() => {
    const getLatest = async () => {
      setMessages(await getLatestMessages(5));
    };

    const interval = setInterval(() => {
      getLatest();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setBtnStatus("Sending...");
    await sendMessageToDB({
      email: formData.email,
      message: formData.message,
      name: formData.name,
      displayName: formData.username === "" ? undefined : formData.username,
    });

    setBtnStatus("Sent!");
  };

  return (
    <section
      className="flex lg:flex-row md:flex-col sm:flex-col max-sm:flex-col justify-center relative w-full lg:px-[50px] md:px-[10px] m-0 h-full items-center"
      ref={contactRef}
      id="contact"
    >
      <motion.div
        className="flex-1 h-fit py-9"
        variants={{
          hidden: { opacity: 0, translateY: "-30px" },
          visible: { opacity: 1, translateY: "0" },
        }}
        initial="hidden"
        animate={mainControls}
        exit="hidden"
        transition={{ duration: 1, type: "tween" }}
      >
        <h1 className="text-[48px] text-left font-[800] w-fit text-rose-600 hover:drop-shadow-md cursor-pointer duration-500">
          Be In Touch With Us.
        </h1>
        <motion.div
          className="w-full h-full mt-5 p-4 bg-slate-800 bg-opacity-[0.5] border-rose-600 rounded-md backdrop-blur-[15px] z-20 relative"
          variants={{
            hidden: { opacity: 0, translateY: "-30px" },
            visible: { opacity: 1, translateY: "0" },
          }}
          initial="hidden"
          animate={mainControls}
          exit="hidden"
          transition={{ duration: 1, type: "tween" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-5 mt-2">
              <Label className="text-[20px] cursor-pointer ml-2" htmlFor="Name">
                <span className="text-rose-600 font-bold">*</span>Name :
              </Label>
              <Input
                placeholder="Parsa"
                className="text-[20px] px-5 py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent mt-3 font-thin placeholder:text-slate-700"
                type="text"
                id="Name"
                name="Name"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                value={formData.name}
              />
            </div>
            <div className="mb-5 mt-2">
              <Label
                className="text-[20px] cursor-pointer ml-2"
                htmlFor="Username"
              >
                Username :
              </Label>
              <Input
                placeholder="thissupposedtobeparsa"
                className="text-[20px] px-5 py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent mt-3 font-thin placeholder:text-slate-700"
                type="text"
                id="Username"
                name="Username"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                value={formData.username}
              />
            </div>
            <div className="mb-5 mt-2">
              <Label
                className="text-[20px] cursor-pointer ml-2"
                htmlFor="Email"
              >
                <span className="text-rose-600 font-bold">*</span>Email :
              </Label>
              <Input
                placeholder="someone@example.com"
                className="text-[20px] px-5 py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent mt-3 font-thin placeholder:text-slate-700"
                type="email"
                id="Email"
                name="Email"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                value={formData.email}
              />
            </div>
            <div className="w-full h-[2px] rounded-2xl bg-rose-600 opacity-[.6] my-5 mt-8" />
            <div className="mb-5 mt-2">
              <Label
                className="text-[20px] cursor-pointer ml-2"
                htmlFor="Message"
              >
                <span className="text-rose-600 font-bold">*</span>Message :
              </Label>
              <Textarea
                placeholder="Enter your message here..."
                className="text-[20px] px-5 py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent mt-3 resize-y font-thin placeholder:text-slate-700"
                id="Message"
                name="Message"
                rows={7}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                value={formData.message}
              />
            </div>
            <div className="mb-5 mt-2 flex flex-row gap-2">
              <Button
                variant="outline"
                type="submit"
                className={`ml-5 ${
                  btnStatus === "Sent!" &&
                  "bg-slate-200 text-black cursor-not-allowed"
                }`}
                disabled={
                  btnStatus === "Sent!" || (btnStatus === "Sending..." && true)
                }
              >
                {btnStatus}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-2 items-center ml-5 h-full flex-1 justify-between transition-all"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        exit="hidden"
        transition={{ duration: 1, type: "tween" }}
      >
        <h1 className="text-[36px] text-center font-[800] w-fit text-blue-600 hover:drop-shadow-md cursor-pointer duration-500">
          What You Think About Us.
        </h1>
        {messages?.length !== 0 ? (
          messages?.map((i, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, translateY: "70px" },
                visible: { opacity: 1, translateY: "0" },
              }}
              initial="hidden"
              animate={mainControls}
              exit="hidden"
              transition={{ duration: 1, type: "tween" }}
              className="flex flex-col justify-end items-center p-3 bg-slate-800 rounded-lg h-fit w-[75%] transition-all gap-5 cursor-pointer hover:translate-x-[-30px] hover:bg-slate-700 hover:scale-[5px]"
            >
              <div className="h-[50%] w-full flex flex-row justify-start items-center gap-2">
                <div className="flex flex-col w-full justify-start items-start">
                  <h4 className="text-[18px] font-bold cursor-pointer hover:text-rose-500 transition-all">
                    {i.name}
                  </h4>
                  <p className="text-slate-600 text-[12px] cursor-pointer hover:text-white transition-all">
                    @{i.displayName}
                  </p>
                </div>
                <p className="text-slate-600 text-[12px] w-[75px] whitespace-nowrap">
                  {`${new Date(i.createdAt).getFullYear()}/${new Date(
                    i.createdAt
                  ).getMonth()}/${new Date(i.createdAt).getDate()}`}
                </p>
              </div>
              <p className="text-left w-full pl-3">{i.message}</p>
            </motion.div>
          ))
        ) : (
          <h4 className="text-[18px] font-bold cursor-pointer text-slate-600 transition-all">
            No messages yet...
          </h4>
        )}
      </motion.div>
    </section>
  );
};

export default Contact;
