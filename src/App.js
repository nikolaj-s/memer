
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavigationBar } from './Features/NavigationBar/NavigationBar';
import { Feed } from './Features/Feed/Feed';
import { ControlBar } from './Features/ControlBar/ControlBar';
import { Menu } from './Features/Menu/Menu';
import { Error } from './Components/Error/Error';
import { LoadSplashScreen } from './Components/LoadSplashScreen/LoadSplashScreen';
import React from 'react';
import { fetchLocalData } from './Util/LocalData';
import { useDispatch } from 'react-redux';
import { toggleAgeVerification } from './Features/Feed/FeedSlice';
import { MetaTags } from './Components/Metatags/MetaTags';

function App() {

    const dispatch = useDispatch();

    React.useEffect(() => {

      const verified = fetchLocalData();

      if (verified) {

        dispatch(toggleAgeVerification(verified?.age_verified));

      }
    // eslint-disable-next-line
    }, [])

    return (
      <div  className="App">
          {window.location.pathname === '/' ? <MetaTags /> : null}
          <NavigationBar />
          <div className='application-wrapper'>
            <ControlBar />
            <Menu />
            <BrowserRouter>
              <Routes>
                <Route element={<Feed />} path='/*' />
              </Routes>
            </BrowserRouter>
            <Error />
            <LoadSplashScreen />
          </div>
      </div>
    );
}

export default App;
