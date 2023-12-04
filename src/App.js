
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavigationBar } from './Features/NavigationBar/NavigationBar';
import { Feed } from './Features/Feed/Feed';
import { ControlBar } from './Features/ControlBar/ControlBar';
import { Menu } from './Features/Menu/Menu';
import { Error } from './Components/Error/Error';
import { LoadSplashScreen } from './Components/LoadSplashScreen/LoadSplashScreen';
import React from 'react';
import { Helmet } from 'react-helmet';
import { HiddenLinks } from './Components/HiddenLinks/HiddenLinks';

function App() {

    return (
      <div  className="App">
        <HiddenLinks />
        <Helmet>
          <meta name='og:link' content={window.location.href} />
          <meta name='twitter:link' content={window.location.href} />
        </Helmet>
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
