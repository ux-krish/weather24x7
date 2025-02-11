


import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Home from './components/home/Home';
import Weather from './components/weather/Weather';
//import Contact from './components/contact/Contact';
//import Nav from './components/common/Nav';
//import LoginPage from './components/auth/LoginPage';

const App = () => {

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let playForward = true;

    const handleTimeUpdate = () => {
      if (playForward && video.currentTime >= video.duration) {
        playForward = false;
        video.currentTime = video.duration;
        video.playbackRate = -1;
      } else if (!playForward && video.currentTime <= 0) {
        playForward = true;
        video.currentTime = 0;
        video.playbackRate = 1;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);


  // const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  // const handleLogin = () => {
  //   setLoggedIn(true);
  //   localStorage.setItem('loggedIn', 'true');
  // };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   localStorage.removeItem('loggedIn');
  // };
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <div className='min-h-dvh flex flex-wrap items-stretch justify-center'>
    
      <div className='bg-neutral-100 w-full md:min-h-100 p-3'>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className='w-full min-h-screen object-cover aspect-video fixed top-0 left-0 right-0 bottom-0 opacity-20 blur-md'
      >
        <source src={`${process.env.PUBLIC_URL}/0_Clouds_Sky_3840x2160.mp4`}></source>
      </video>
      {/* <Nav /> */}
        {/* <Nav loggedIn={loggedIn} onLogout={handleLogout} /> */}
        <Routes>
        <Route
            exact
            path="/"
            element={<Weather />}
          />
          {/* <Route
            path="/weather"
            element={<Weather />}
          /> */}
          {/* <Route
            exact
            path="/"
            element={loggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/weather"
            element={loggedIn ? <Weather /> : <Navigate to="/login" />}
          /> */}
          {/* <Route
            path="/contact"
            element={<Contact />}
          /> */}
          {/* <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          /> */}
        </Routes>
      </div>
    </div>
  </Router>
  );
};

export default App;
