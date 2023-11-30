
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavigationBar } from './Features/NavigationBar/NavigationBar';
import { Feed } from './Features/Feed/Feed';
import { ControlBar } from './Features/ControlBar/ControlBar';
import { Menu } from './Features/Menu/Menu';
import { Error } from './Components/Error/Error';

function App() {
    return (
      <div  className="App">
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
          </div>
      </div>
    );
}

export default App;
