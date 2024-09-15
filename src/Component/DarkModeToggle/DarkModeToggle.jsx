import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  // State to track the theme (dark/light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On component mount, check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Function to handle toggle switch
  const handleThemeChange = (event) => {
    const darkModeEnabled = event.target.checked;
    setIsDarkMode(darkModeEnabled);

    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <label className="grid cursor-pointer place-items-center">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={handleThemeChange}
        className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
      />
      {/* Sun icon for light mode */}
      <svg
        className="stroke-base-100 fill-base-100 col-start-1 row-start-1 w-[10px] h-[10px] md:w-[12px] md:h-[12px]"
        xmlns="http://www.w3.org/2000/svg"
        
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>

      {/* Moon icon for dark mode */}
      <svg
        className="stroke-base-100 fill-base-100 col-start-2 row-start-1 w-[10px] h-[10px] md:w-[12px] md:h-[12px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </label>
  );
};

export default DarkModeToggle;
