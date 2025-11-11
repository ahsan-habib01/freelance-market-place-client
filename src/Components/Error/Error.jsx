import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff5ec] via-[#fff0e5] to-[#ffebe0] dark:from-[#0f1116] dark:via-[#14181f] dark:to-[#1a1f27] text-center  px-6">
      {/* Icon Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="mb-6"
      >
        <AlertTriangle className="w-20 h-20 text-[#ff6900]" />
      </motion.div>

      {/* Error Message */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
      >
        Oops! Something Went Wrong
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8"
      >
        The page you’re looking for doesn’t exist or an unexpected error has
        occurred. Don’t worry — let’s get you back home.
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#ff9346] to-[#ff6900] hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;
