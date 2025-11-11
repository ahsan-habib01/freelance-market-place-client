import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTheme = checked => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div>
      <input
        onChange={e => handleTheme(e.target.checked)}
        type="checkbox"
        defaultChecked={localStorage.getItem('theme') === 'dark'}
        className="toggle"
      />
    </div>
  );
};

export default ThemeToggle;