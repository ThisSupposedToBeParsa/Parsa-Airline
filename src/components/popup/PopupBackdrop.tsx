import { AnimatePresence, motion } from "framer-motion";

const PopupBackdrop = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <motion.div
      className="top-0 left-0 m-0 p-0 flex flex-row justify-center items-center w-full h-[100vh] bg-[#0000004b] backdrop-blur-[3px] fixed z-30"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence initial onExitComplete={() => null} mode="popLayout">
        {children}
      </AnimatePresence>
    </motion.div>
  );
};

export default PopupBackdrop;
