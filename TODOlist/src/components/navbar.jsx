import React from 'react';
import DarkMode from './darkmode';

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav className='flex justify-around bg-slate-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <DarkMode theme={theme} setTheme={setTheme} />
    </nav>
  )
}
export default Navbar;