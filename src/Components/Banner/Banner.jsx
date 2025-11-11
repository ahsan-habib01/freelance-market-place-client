import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { GoDotFill } from 'react-icons/go';
import bannerImg from '../../assets/banner.avif';
import bannerSpin from '../../assets/banner-shape-2.svg';

const Banner = () => {
  return (
    <section
      className="py-20 text-gray-900 dark:text-white 
  bg-gradient-to-r from-[#fff3ea] to-[#fffdfb] 
  dark:from-[#0f172a] dark:to-[#020617]"
    >
      <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center md:text-left"
        >
          <span className="bg-white dark:bg-black p-3 rounded-sm relative">
            <GoDotFill
              color="#ff6900"
              className="absolute -left-1.5 -top-1 animate-ping"
            />
            Freelance Marketplace
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 py-5">
            Empower Your Work with{' '}
            <span className="text-[#ff6900]">Freelify</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8">
            A trusted freelance marketplace where talent meets opportunity.
            Build your career, connect with clients, and grow with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/allJobs"
              className="px-8 py-3 bg-[#ff6900]  font-semibold rounded-lg hover:bg-[#ff5506] transition"
            >
              Explore Jobs
            </Link>
            <Link
              to="/addJob"
              className="px-8 py-3 border-2 border-[#ff6900] font-semibold rounded-lg hover:bg-[#ff5506] transition"
            >
              Create a Job
            </Link>
          </div>
        </motion.div>

        {/* Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 relative"
        >
          <img
            src={bannerImg}
            alt="Freelancer"
            className="w-full h-130 object-cover max-w-md mx-auto drop-shadow-2xl rounded-lg "
          />
          <img
            src={bannerSpin}
            alt=""
            className="absolute -top-10  animate-spin [animation-duration:10s]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
