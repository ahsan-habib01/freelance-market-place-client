import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Logo from '../Navbar/Logo';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-200 via-green-100 to-green-100 text-green-900">
      <div className="w-11/12 mx-auto  py-8 grid md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <Logo></Logo>
          <p className="text-sm text-green-800 mt-2 mr-5">
            Freelify connects skilled freelancers with clients worldwide. A
            trusted marketplace where projects turn into possibilities.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="hover:text-green-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-green-600">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              <FaPinterest size={22} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              <FaXTwitter size={22}/>
            </a>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto border-t border-green-300 text-center py-3 text-sm text-green-800">
        © 2025 <span className="font-semibold">Freelify</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
