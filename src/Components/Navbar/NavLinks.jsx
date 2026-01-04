import React from 'react';
import { NavLink } from 'react-router';

const NavLinks = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'All Jobs', path: '/all-jobs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms of Service', path: '/terms-of-service' },
  ];

  return (
    <ul className="flex gap-6">
      {links.map(link => (
        <li key={link.name}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `relative font-medium transition-all duration-300 
               ${
                 isActive
                   ? 'text-[#ff6300] dark:text-[#ff6900] after:w-full after:scale-x-100 after:opacity-100'
                   : ' dark:text-white hover:text-[#ff6900]'
               } 
               after:content-[""] after:absolute after:left-0 after:-bottom-1 
               after:h-[2px] after:bg-gradient-to-r  after:from-orange-400 after:via-orange-500 after:to-orange-600 
               after:scale-x-0 after:origin-left after:transition-transform after:duration-300
               hover:after:scale-x-100 hover:after:opacity-100
               hover:scale-105`
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
