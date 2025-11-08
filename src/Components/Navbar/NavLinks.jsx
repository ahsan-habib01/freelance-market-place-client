import React from 'react';
import { NavLink } from 'react-router';

const NavLinks = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'All Jobs', path: '/all-jobs' },
    { name: 'Add a Job', path: '/add-job' },
    { name: 'My Accepted Tasks', path: '/my-accepted-tasks' },
  ];

  return (
    <ul className="flex gap-5">
      {links.map(link => (
        <li key={link.name}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `relative font-medium transition-colors duration-300 ${
                isActive
                  ? 'text-green-700 after:w-full'
                  : 'text-green-900 hover:text-green-700'
              } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full`
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
