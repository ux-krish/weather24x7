import React, { useState, useEffect } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { FaDove } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi"; // Using icons from react-icons/fi

const DateTimeBadge = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = currentDateTime.getHours();
  const minute = currentDateTime.getMinutes();

  // Define conditions for different periods of the day
  let icon;
  if (hour >= 0 && hour < 6) {
    icon = <FiSunrise className='text-slate-900' />;
  } else if (hour >= 6 && hour < 12) {
    icon = <FaDove className='text-slate-900' />;
  } else if (hour >= 12 && hour < 18) {
    icon = <IoSunnyOutline className='text-slate-900' />;
  } else if (hour >= 18 && hour < 24) {
    icon = <FiSunset className='text-slate-900' />;
  } else {
    // Handle invalid hour
    icon = null;
  }

  return (
    <div className="text-white flex flex-col items-center md:gap-2 gap-1 ml-auto mr-2">
      <span className="text-[18px] flex gap-1 w-full">
        <span className='rounded-full font-medium flex bg-indigo-400 gap-[5px] px-3 h-[40px] items-center justify-center'>
          <span className='flex gap-[2px] items-center text-slate-200 -tracking-wider'>
            <span className="block text-slate-200">{hour < 10 ? '0' + hour : hour}</span> :
            <span className="block text-slate-200">{minute < 10 ? '0' + minute : minute}</span> 
          </span>
        </span>
      </span>
    </div>
  );
};

export default DateTimeBadge;
