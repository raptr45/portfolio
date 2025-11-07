import { motion } from "framer-motion";

export default function heroRight() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative flex justify-center lg:justify-end order-first lg:order-last"
    >
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

        {/* Static shapes */}
        {/* Green rounded square - top left */}
        <div
          className="absolute w-32 h-32 bg-linear-to-br from-emerald-400 to-emerald-500 rounded-3xl"
          style={{ top: "15%", left: "10%" }}
        />

        {/* Blue circle - top right */}
        <div
          className="absolute w-40 h-40 bg-linear-to-br from-blue-400 to-blue-500 rounded-full"
          style={{ top: "5%", right: "5%" }}
        />

        {/* Green circle - bottom right */}
        <div
          className="absolute w-36 h-36 bg-linear-to-br from-emerald-400 to-emerald-500 rounded-full"
          style={{ bottom: "10%", right: "15%" }}
        />

        {/* Blue rounded square - bottom left */}
        <div
          className="absolute w-36 h-36 bg-linear-to-br from-blue-400 to-blue-500 rounded-3xl"
          style={{ bottom: "15%", left: "5%" }}
        />

        {/* Small blue circle - center left */}
        <div
          className="absolute w-16 h-16 bg-linear-to-br from-blue-300 to-blue-400 rounded-full"
          style={{ top: "45%", left: "5%" }}
        />

        {/* Available for Work badge - centered with animations */}
        <motion.div
          className="relative z-10 bg-linear-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 px-6 py-3 rounded-full shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: [0.9, 1, 0.95, 1],
            opacity: 1,
            y: [0, -5, 0],
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: 0.5,
            },
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-white font-semibold text-sm sm:text-base">
              Available for Work
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
