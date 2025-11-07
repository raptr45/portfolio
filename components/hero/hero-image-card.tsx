import data from "@/lib/assets";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroImageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative flex justify-center lg:justify-end order-first lg:order-last"
    >
      <div className="relative mt-14 md:mt-8 lg:mt-12">
        <motion.div
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ duration: 0.3 }}
          className="w-64 h-80 sm:w-72 sm:h-[360px] md:w-80 md:h-96 lg:w-96 lg:h-[500px] rounded-3xl bg-linear-to-br from-indigo-700 via-blue-500 to-sky-600 p-1 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
        >
          <div className="w-full h-full rounded-3xl overflow-hidden bg-linear-to-br from-indigo-700 via-blue-500 to-sky-700 flex items-end justify-center relative">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent rounded-3xl z-10" />
              <Image
                src={data.profile}
                alt="Abid Al Wassie"
                fill
                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 20rem, 24rem"
                className="object-cover object-top rounded-3xl transition-transform duration-300 hover:scale-110"
                priority
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full bg-linear-to-br from-cyan-400 to-teal-500 blur-xl opacity-60"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-linear-to-br from-fuchsia-400 to-indigo-500 blur-lg opacity-50 z-50"
          animate={{
            y: [0, 15, 0],
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-linear-to-r from-cyan-400/20 to-blue-600/20 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </motion.div>
  );
}
