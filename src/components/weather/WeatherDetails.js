import React from 'react'
import { FaWind, FaTint, FaThermometerHalf } from 'react-icons/fa';

const WeatherDetails = () => {
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
  
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
  
  
  
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


  return (
    <div>
        {weather &&
                weather.days.slice(0, 10).map((day, index) => (
                  <div key={index} className="bg-indigo-100/50 p-0 shadow-md rounded-lg overflow-hidden flex-initial">
                    <p className="text-indigo-300 flex justify-between font-bold p-4 border-slate-800 cursor-pointer mb-0" onClick={() => handleDayClick(index)}>
                      <span>{moment(day.datetime).format('MMM D, Y')}</span>
                      <span><FaThermometerHalf className="mr-[0px] -mt-[3px] text-rose-500 inline-block text-[14px]" /> {Math.round(day.tempmax)}<sup className='text-[10px]'>°C</sup> - <FaThermometerHalf className="mr-[0px] -mt-[3px] text-sky-500 inline-block text-[14px]" /> {Math.round(day.tempmin)}<sup className='text-[10px]'>°C</sup></span>
                    </p>
                    <div className={`overflow-x-auto w-full transition-all duration-100`}>
                      <table className="text-slate-400 text-center w-full  rounded-b-md table-auto">
                        <thead className='text-[10px] md:text-[15px]'>
                          <tr>
                            <th className='text-center bg-gray-950 py-2 px-3 font-medium w-[50px]'>Time</th>
                            <th className='text-center bg-gray-950 py-2 px-3 font-medium w-[70px]'>Temp</th>
                            <th className='text-center bg-gray-950 py-2 px-3 font-medium w-[80px]'>Humidity </th>
                            <th className='text-center bg-gray-950 py-2 px-3 font-medium w-[90px]'>Wind Speed</th>
                            <th className='text-left bg-gray-950 py-2 px-3 font-medium w-[150px]'>Weather Condition</th>
                          </tr>
                        </thead>
                        <tbody className='bg-slate-100/20 text-[10px] md:text-[15px] font-extrabold divide-solid divide-white'>
                          {day && day.hours.slice(0, 25).map((hour, hourIndex) => (
                            <tr key={hourIndex} className={`${hourIndex === currentHour ? ' bg-gradient-to-r from-sky-600 to-yellow-700 text-slate-900' : ''}`} onClick={() => handleRowClick(hourIndex)}>
                              <td className='py-2 px-3  w-[50px]'>
                              {hourIndex}:00
                              </td>
                              <td className='py-2 px-3  w-[70px]'><FaThermometerHalf className="mr-[2px] -mt-[1px] text-rose-500 inline-block text-[11px] md:text-[15px]" /> {Math.round(hour.temp)}<sup className='text-[7px]'>°C</sup></td>
                              <td className='py-2 px-3  w-[80px]'><FaTint className="mr-[3px] -mt-[2px] text-sky-300 inline-block text-[11px] md:text-[15px]" /> {hour.humidity} %</td>
                              <td className='py-2 px-3  w-[90px]'><FaWind className="mr-[3px] -mt-[2px] text-sky-300 inline-block text-[11px] md:text-[15px]" /> {hour.windspeed} <sup className='font-light text-[7px]'>km/h</sup></td>
                              <td className='py-2 px-3  w-min-[150px] text-center flex items-center justify-start'>
                                
                                <span>
                                {hour.conditions === 'Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/cloudy-day-2.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                {hour.conditions === 'Overcast' && <img src={`${process.env.PUBLIC_URL}/cloudy.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                {hour.conditions === 'Clear' && <img src={`${process.env.PUBLIC_URL}/day.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                {hour.conditions === 'Rain, Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/rainy-3.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                {hour.conditions === 'Rain, Overcast' && <img src={`${process.env.PUBLIC_URL}/rainy-6.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                </span>
                                <span className='text-[11px] md:text-[15px] font-normal'>{hour.conditions}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
    </div>
  )
}

export default WeatherDetails