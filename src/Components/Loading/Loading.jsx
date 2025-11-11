import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff5ec] via-[#fff0e5] to-[#ffebe0] dark:from-[#0f1116] dark:via-[#14181f] dark:to-[#1a1f27] transition-colors duration-500">
      {/* Spinner */}
      <motion.div
        className="relative w-20 h-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-[#ff9346]" />
        <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-[#ff6900]" />
      </motion.div>

      {/* Text Animation */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="mt-6 text-xl font-semibold text-[#ff6900] dark:text-[#ff9346]"
      >
        Loading...
      </motion.h2>
    </div>
  );
};

export default Loading;
