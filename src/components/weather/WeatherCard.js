import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from 'react-modal'; // Import react-modal
import { FaWind, FaTint, FaThermometerHalf, FaLocationArrow ,FaMapPin   } from 'react-icons/fa';
import { IoCloseCircleSharp } from "react-icons/io5";
import { GiPositionMarker } from 'react-icons/gi'
import LoadingUi from '../common/LoadingUi';
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaArrowUpLong } from "react-icons/fa6";



const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [currentTempFeel, setCurrentTempFeel] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [windDir, setWindDir] = useState('');
  const [cloudCover, setCloudCover] = useState('');
  const [weatherDesc, setWeatherDesc] = useState('');
  const [currentConditions , setCurrentConditions] = useState('');
  const [currentMinTemp , setCurrentMinTemp] =useState('');
  const [currentMaxTemp, setCurrentMaxTemp] = useState('');
  const [currentDew, setCurrentDew] = useState('');

  const [sunrise, setSunrise ] = useState('');
  const [sunset, setSunset] = useState('');

  const [backgroundImage, setBackgroundImage] = useState('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState(null);

  //const [currentHour, setCurrentHour] = useState(new Date().getHours());



  useEffect(() => {
    fetchGeolocationWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherData = async (location) => {
    const apiKey = '3HFR2ZDMXKY4WATWKALPE5EXT';
  
    // Check if location is coordinates or name
    const isCoordinates = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(location);
    let apiUrl;
  
    if (isCoordinates) {
        // If location is coordinates, directly fetch weather data
        apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;
    } else {
        // If location is name, fetch coordinates first using geocoding API
        const geocodingApiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
        
        try {
            const response = await fetch(geocodingApiUrl);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon, display_name } = data[0];
                setLocation(display_name); // Update location state with actual address
                apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}`;
            } else {
                console.error('No location found.');
                setLoading(false);
                return;
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
            setLoading(false);
            return;
        }
    }
  
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Convert sunset and sunrise times to 12-hour format
        const convertTo12HourFormat = (timeString) => {
            const time = new Date(`1970-01-01T${timeString}`);
            return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase();
        };
        console.log(data);
        setWeather(data);
        setCurrentTemp(data.currentConditions.temp);
        setCurrentTempFeel(data.currentConditions.feelslike);
        setHumidity(data.currentConditions.humidity);
        setWindSpeed(data.currentConditions.windspeed);
        setWindDir(data.currentConditions.winddir);
        setCloudCover(data.currentConditions.cloudcover);
        setWeatherDesc(data.days[0].description);
        setCurrentConditions(data.currentConditions.conditions);
        setCurrentDew(data.currentConditions.dew);
        setCurrentMinTemp(data.days[0].tempmin);
        setCurrentMaxTemp(data.days[0].tempmax);
        setSunrise(convertTo12HourFormat(data.currentConditions.sunrise));
        setSunset(convertTo12HourFormat(data.currentConditions.sunset));
        setLoading(false);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
    }
};

  
   
  const fetchGeolocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchReverseGeocoding(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const fetchReverseGeocoding = async (latitude, longitude) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        const address = data.display_name;
        setLocation(address);
        fetchWeatherData(`${latitude},${longitude}`);
      } else {
        console.error('Reverse geocoding error:', data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      setLoading(true);
      setLocation(searchInput); // Update location state with the search input
      fetchWeatherData(searchInput);
      setSearchInput(''); // Reset search input after search
    }
  };
  

  const updateBackground = () => {
    const hour = new Date().getHours(); // Get the current hour
    let background;

    if (hour >= 6 && hour < 12) {
      // Morning
      background = 'morning.jpg';
    } else if (hour >= 12 && hour < 18) {
      // Noon
      background = 'noon.jpg';
    } else if (hour >= 18 && hour < 24) {
      // Evening
      background = 'evening.jpg';
    } else {
      // Night
      background = 'night.jpg';
    }

    setBackgroundImage(background);
  };

  useEffect(() => {
    updateBackground();
    const interval = setInterval(updateBackground, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  
  
  const handleDayClick = (index) => {
    setSelectedDayData(weather.days[index]);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDayData(null);
  };


  // const handleRowClick = (hourIndex) => {
  //   setCurrentHour(hourIndex === currentHour ? null : hourIndex);
  // };
  

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* <h1 className="text-2xl mb-4 text-slate-200 font-semibold">Weather Updates</h1> */}
      <div className="flex items-center my-4 gap-2">
      <button
          className="w-12 h-12 flex items-center justify-center bg-neutral-100 border-2 border-white shadow-lg hover:bg-indigo-950/60 text-white rounded-md group focus:outline-none"
          onClick={fetchGeolocationWeather}
        >
          <GiPositionMarker className="text-xl text-indigo-500 group-hover:text-green-200" />
        </button>
        <input
          type="text"
          placeholder="Enter location..."
          className="px-4 h-12 flex-grow bg-neutral-100 border-2 border-white shadow-lg rounded-md focus:outline-none text-slate-500"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="px-4 h-12 bg-neutral-100 border-2 border-white shadow-lg hover:bg-indigo-950/60 text-white rounded-md group focus:outline-none"
          onClick={handleSearch}
        >
          <FaLocationArrow className="text-xl text-indigo-500 group-hover:text-indigo-200" />
        </button>
       
      </div>
      {loading ? (
        <LoadingUi />
      ) : (
        <>
          <p className="mb-4 text-slate-500 font-medium flex items-start"><span className='font-bold mr-2 ms-2 relative top-[3px]'><FaMapPin  /></span> {location}</p>
          <div
            style={{
              width: '100%',
              minHeight: '300px',
              background: `url(${process.env.PUBLIC_URL}/${backgroundImage}) no-repeat center center fixed`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} 
            className="flex w-full overflow-hidden rounded-md shadow-xl border-2 border-white">

              <div className='flex flex-wrap items-center justify-between p-4  min-h-full bg-gray-950/70 w-full relative'>
                <div className="flex gap-3 flex-wrap grow flex-col mb-auto">
                  <p className="text-slate-200 flex flex-wrap items-start text-6xl font-extrabold mt-2 w-full grow justify-between">
                    <span className='block w-full font-light text-sm px-4 mb-1'>Real Feel : <span className='font-bold'>{currentTempFeel}</span><sup className='text-[8px] relative -top-[4px] font-bold'>°C</sup></span>
                    <span className='flex items-center'>
                      <FaThermometerHalf className="mr-1 text-rose-600 text-5xl relative top-[2px]" /> 
                      {Math.round(currentTemp)} 
                      <sup className='text-[20px] relative -top-[12px] left-0'>°C</sup>
                      <span className='flex items-center text-[18px] relative -top-[12px] ms-4'>
                        <FaTint className="mr-[4px] text-sky-300 text-[14px]" />
                        {currentDew}<sup className='text-[8px] relative -top-[3px]'>°C</sup>
                      </span>
                    </span>
                    <span className='flex items-center w-full sm:w-auto text-[13px] mt-4 sm:mt-1 sm:absolute sm:right-10 relative ms-3'>
                      Max <FaThermometerHalf className="ms-1 mr-1 text-rose-500 relative  text-[10px]" /> {Math.round(currentMaxTemp)}<sup className='text-[5px] relative -top-[4px]'>°C</sup>
                      
                      <span className='mx-3'>-</span> 
                      Min <FaThermometerHalf className="ms-1 mr-1 text-sky-300 relative text-[10px]" /> {Math.round(currentMinTemp)} <sup className='text-[5px] relative -top-[4px]'>°C</sup> 
                       
                    </span>
                  </p>
                  <p className='px-3 md:text-3xl text-lg font-medium text-white'>
                    {currentConditions}
                    {currentConditions === 'Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/cloudy-day-2.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                    {currentConditions === 'Overcast' && <img src={`${process.env.PUBLIC_URL}/cloudy.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                    {currentConditions === 'Clear' && <img src={`${process.env.PUBLIC_URL}/day.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                    {currentConditions === 'Rain, Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/rainy-3.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                    {currentConditions === 'Rain, Overcast' && <img src={`${process.env.PUBLIC_URL}/rainy-6.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                  </p>
                  <div className='flex flex-wrap items-start px-3'>
                  <p className="text-slate-200 flex items-center mb-1 mr-4">
                    <FaWind className="mr-[6px] text-sky-300" /> {windSpeed} km/h
                  </p>
                  <p className="text-slate-200 flex items-center mb-1 mr-4">
                    Wind Dir : <FaArrowUpLong className="relative ms-1 top-[0px]" style={{ transform : `rotate(${windDir}deg)`, transformOrigin : 'center' }} />
                  </p>
                  <p className="text-slate-200 flex items-center mb-1 mr-4">
                    <FaTint className="mr-[4px] text-sky-300" /> {humidity}%
                  </p>
                  <p className="text-slate-200 flex items-center justify-start -mt-[4px] -ms-[10px] mr-4">
                    <img src={`${process.env.PUBLIC_URL}/cloudy.svg`} className='w-9 h-8 object-cover' alt="cloudcover" /> {cloudCover}%
                  </p>
                  <p className='text-slate-200 flex items-center mb-1 mr-4'><FiSunrise className='text-yellow-400 mr-2 text-[15px]' /> {sunrise}</p>
                  <p className='text-slate-200 flex items-center mb-1 mr-4'><FiSunset className='text-orange-600 mr-2 text-[15px]' /> {sunset}</p>
                  </div>
                </div>
                <div className='mt-2 w-full'>
                  <details className='mt-2 w-full cursor-pointer'>
                    <summary className='select-none text-[12px] text-slate-300'>Weather Note.</summary>
                    <p className='text-slate-400 flex items-center text-[10px] px-2'>{weatherDesc}</p>
                  </details>
                </div>
              </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 mb-10">
              <div className='flex flex-wrap justify-between items-start gap-4'>
                <h2 className='text-lg md:text-3xl font-bold tracking-wider p-5 basis-full text-center text-neutral-600'>15-Days <span className='text-indigo-400 border-t border-t-rose-400 border-b border-indigo-400 py-2'>24x7</span> Forcast</h2>
                <div className='flex flex-wrap justify-between items-start gap-5'>
                {weather &&
                weather.days.slice(0, 15).map((day, index) => (
                  <div key={index} className="border-4 flex-auto w-full md:w-1/3 lg:w-1/4 border-white p-0 shadow-lg rounded-md  overflow-hidden">
                    <p className="text-neutral-500 bg-gradient-to-r from-blue-100 to-sky-50 flex justify-between font-bold p-4 border-indigo-800 cursor-pointer mb-0" onClick={() => handleDayClick(index)}>
                      <span>{moment(day.datetime).format('MMM D, Y')}</span>
                      <span><FaThermometerHalf className="mr-[0px] -mt-[3px] text-rose-500 inline-block text-[14px]" /> {Math.round(day.tempmax)}<sup className='text-[10px]'>°C</sup> - <FaThermometerHalf className="mr-[0px] -mt-[3px] text-sky-500 inline-block text-[14px]" /> {Math.round(day.tempmin)}<sup className='text-[10px]'>°C</sup></span>
                    </p>
                  </div>
                ))}
                </div>
              </div>
          </div>
          {selectedDayData && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Weather Details"
              className="modal"
              overlayClassName="modal-overlay"
            >
              <div className='flex justify-between items-center mb-4'>
                <h2 className="text-lg font-bold">{moment(selectedDayData.datetime).format('MMM D, Y')}</h2> <button onClick={closeModal} className=""><IoCloseCircleSharp className=' text-rose-600 text-2xl' /></button>
              </div>
              <table className="text-slate-400 text-center w-full table-fixed rounded-md absolute h-full bottom-0 top-16 left-0 right-0 overflow-y-auto">
                <thead className='text-[10px] md:text-[15px]'>
                  <tr>
                    <th className='text-center bg-indigo-50 py-2 px-3 font-medium w-[80px]'>Time</th>
                    <th className='text-center bg-indigo-50 py-2 px-3 font-medium' colSpan="4">Condition</th>
                  </tr>
                </thead>
                <tbody className='bg-slate-100/20 text-[10px] md:text-[15px] font-extrabold divide-solid divide-white divi absolute w-full left-0 right-0 flex  flex-col bottom-16 top-10 overflow-y-auto'>
                  {selectedDayData.hours.slice(0, 25).map((hour, hourIndex) => (
                    <tr key={hourIndex} className='w-full flex'>
                      <td className='py-2 px-3 w-[80px] text-[11px] md:text-[13px]'>{hourIndex}:00</td>
                      <td colSpan="4" className='py-0 px-1 flex-1'>
                        <span className='flex flex-wrap gap-1 items-start'>
                          <span className='rounded-sm bg-neutral-50 text-left px-0 py-[10px] flex items-center w-[46%] md:w-[24.5%] h-9 font-medium text-[12px] align-middle'>
                            <FaThermometerHalf className="mr-[2px] text-rose-500 inline-block text-[11px] md:text-[13px] align-middle" /> <span className='align-middle inline-block'>{Math.round(hour.temp)}<sup className='text-[7px]'>°C</sup></span>
                          </span>
                          <span className='rounded-sm bg-neutral-50 text-left px-0 py-[10px] flex items-center w-[46%] md:w-[24.5%] h-9 font-medium text-[13px]'>
                            <FaTint className="mr-[3px] text-sky-300 inline-block text-[11px] md:text-[13px] align-middle" /> <span className='align-middle inline-block'>{hour.humidity} %</span>
                          </span>
                          <span className='rounded-sm bg-neutral-50 text-left px-0 py-[10px] flex items-center w-[46%] md:w-[24.5%] h-9 font-medium text-[13px] align-middle'>
                            <FaWind className="mr-[3px] text-sky-300 inline-block text-[11px] md:text-[13px] align-middle" /> <span className='align-middle inline-block'>{hour.windspeed} <sup className='font-light text-[7px] align-middle'>km/h</sup></span>
                          </span>
                          <span className='rounded-sm bg-neutral-50 text-left px-0 py-[10px] flex w-auto md:w-[24.5%] h-9 items-center justify-start'>
                            <span className='inline-block align-middle'>
                              {hour.conditions === 'Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/cloudy-day-2.svg`} className='w-9 h-8 mx-0 object-cover' alt="cloudcover" />}
                              {hour.conditions === 'Overcast' && <img src={`${process.env.PUBLIC_URL}/cloudy.svg`} className='w-9 h-8 mx-0 object-cover' alt="cloudcover" />}
                              {hour.conditions === 'Clear' && <img src={`${process.env.PUBLIC_URL}/day.svg`} className='w-9 h-8 mx-0 object-cover' alt="cloudcover" />}
                              {hour.conditions === 'Rain, Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/rainy-3.svg`} className='w-9 h-8 mx-0 object-cover' alt="cloudcover" />}
                              {hour.conditions === 'Rain, Overcast' && <img src={`${process.env.PUBLIC_URL}/rainy-6.svg`} className='w-9 h-8 mx-0 object-cover' alt="cloudcover" />}
                            </span>
                            <span className='text-[11px] md:text-[13px] font-normal inline-block'>{hour.conditions}</span>
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherCard;

