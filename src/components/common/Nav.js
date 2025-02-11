import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DateTimeBadge from './DateTimeBadge';
import { FaSignInAlt,FaHome  } from 'react-icons/fa';
import { IoMdExit } from "react-icons/io";

const Nav = ({onLogout, loggedIn}) => {
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (path) => {
    setActive(path);
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    {/* <div onClick={() => handleSidebarToggle()} className={`backdrop ${isOpen ? 'z-20' : '-z-20'}`}></div> */}
    <div className={`h-[60px] md:h-[60px] ease-in-out transition-all bg-white/50 shadow-lg border-2 border-white rounded-full backdrop-blur-xl fixed z-30 flex justify-between items-center top-5 left-0 right-0  max-w-3xl w-[96%] mx-auto`}>
      
      <div className={`mt-0 ml-2 transform z-20 ease-in-out transition-all duration-300`}>
        <div
          className={`flex items-center justify-center w-12 h-10 cursor-pointer group py-[2px] px-[0]  ${isOpen ? '' : ''}`}
          onClick={handleSidebarToggle}
        >
          <div className={`w-10 h-10 px-[8px] flex flex-col justify-center gap-1 ease-in-out transition-all ${isOpen ? 'bg-slate-200' : 'bg-slate-900'}  rounded-full relative`}>
            <span className={` w-[22px] h-[4px] rounded-full absolute top-[12px] left-0 right-0 mx-auto ease-in-out transition-all ${!isOpen ? 'bg-indigo-400' : 'bg-rose-600 rotate-45 top-[18px]'}`}></span>
            <span className={` w-[22px] h-[4px] rounded-full absolute top-0 bottom-0 my-auto mx-auto left-0 right-0 ease-in-out transition-all ${!isOpen ? 'bg-indigo-400 scale-100' : 'bg-transparent scale-0'}`}></span>
            <span className={` w-[22px] h-[4px] rounded-full absolute bottom-[12px] left-0 right-0 mx-auto ease-in-out transition-all ${!isOpen ? 'bg-indigo-400' : 'bg-rose-600 -rotate-45 top-[18px]'}`}></span>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'h-auto translate-y-24 opacity-100' : 'h-0 translate-y-24 opacity-0'
        } transform bg-slate-900 rounded-xl backdrop-blur-md overflow-y-auto ease-in-out transition-all duration-300 absolute z-20 w-full`}
      >
        <div className="p-[2px] flex">
          <ul className="flex flex-col gap-2 min-h-full w-full p-4">
            <li>
              <Link
                to="/"
                onClick={() => {
                  handleClick('/');
                  handleSidebarToggle();
                  
                }}
                className={`px-5 w-full block py-2 text-sm font-medium rounded-sm tracking-wider uppercase text-gray-300 hover:bg-rose-500 transition-all ease-in-out duration-150 ${
                  active === '/' ? 'bg-rose-500  text-slate-800' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/weather"
                onClick={() => {
                  handleClick('/weather');
                  handleSidebarToggle();
                }}
                className={`px-5 py-2 w-full block text-sm font-medium  rounded-sm tracking-wider uppercase text-gray-300 hover:bg-indigo-500 transition-all ease-in-out duration-150 ${
                  active === '/weather' ? 'bg-indigo-500  text-slate-800' : ''
                }`}
              >
                Weather
              </Link>
            </li>
           
            {/* <li>
              <Link
                to="/contact"
                onClick={() => {
                  handleClick('/contact');
                  handleSidebarToggle();
                }}
                className={`px-5 py-2 w-full block text-sm font-medium rounded-sm tracking-wider uppercase text-gray-300 hover:bg-teal-500 transition-all ease-in-out duration-150 ${
                  active === '/contact' ? 'bg-teal-500   text-slate-800' : ''
                }`}
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
      <div className={` justify-center items-center ml-1`}>
        <Link to={'/'} className='w-10 h-10 px-[8px] flex items-center justify-center gap-1 ease-in-out transition-all bg-slate-100/50 rounded-full' onClick={() => setIsOpen(false)}>
        <FaHome className='text-indigo-600 text-2xl' />
        </Link>
      </div>

      <DateTimeBadge />

      <div className="flex items-center justify-center mr-3">
        {loggedIn ? (
          <button className="text-slate-600 rounded-full w-10 h-10 bg-slate-900 p-[5px] flex items-center justify-center shadow-lg" onClick={onLogout}>
            <IoMdExit className='text-red-400 text-2xl' />
          </button>
        ) : (
          <Link to="/login" className="text-slate-500 rounded-full w-10 h-10 bg-slate-950 p-[5px] flex items-center justify-center shadow-lg">
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </div>

    {/* Conditionally render login/logout icons */}
   
    </>
  );
};

export default Nav;
