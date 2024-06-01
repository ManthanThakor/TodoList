import React, { useState, useEffect } from 'react';
import { MdModeNight, MdOutlineLightMode } from 'react-icons/md';

const DarkMode = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {theme === 'light' ? (
        <MdModeNight onClick={toggleTheme} className="cursor-pointer" />
      ) : (
        <MdOutlineLightMode onClick={toggleTheme} className="cursor-pointer" />
      )}
    </>
  );
};

export default DarkMode;
