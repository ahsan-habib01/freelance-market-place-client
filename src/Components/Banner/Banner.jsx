import { motion } from 'framer-motion';
import { Link } from 'react-router';
import bannerImg from '../../assets/banner.svg'

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white py-20">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Empower Your Work with{' '}
            <span className="text-amber-400">Freelify</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8">
            A trusted freelance marketplace where talent meets opportunity.
            Build your career, connect with clients, and grow with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/allJobs"
              className="px-8 py-3 bg-[#ffb600] text-green-900 font-semibold rounded-lg hover:bg-amber-500 transition"
            >
              Explore Jobs
            </Link>
            <Link
              to="/add-job"
              className="px-8 py-3 border-2 border-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-green-900 transition"
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
          className="flex-1"
        >
          <img
            src={bannerImg}
            alt="Freelancer"
            className="w-full max-w-md mx-auto drop-shadow-2xl rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
