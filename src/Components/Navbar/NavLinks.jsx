import React from 'react';
import { NavLink } from 'react-router';

const NavLinks = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'All Jobs', path: '/allJobs' },
    { name: 'Add a Job', path: '/addJob' },
    { name: 'My Accepted Tasks', path: '/my-accepted-tasks' },
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
                   ? 'text-green-700 after:w-full after:scale-x-100 after:opacity-100'
                   : 'text-green-900 hover:text-green-700'
               } 
               after:content-[""] after:absolute after:left-0 after:-bottom-1 
               after:h-[2px] after:bg-gradient-to-r after:from-green-400 after:via-green-600 after:to-green-700 
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
