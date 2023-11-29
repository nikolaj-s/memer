
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavigationBar } from './Features/NavigationBar/NavigationBar';
import { LineSpacer } from './Components/LineSpacer/LineSpacer';
import { SortOptions } from './Features/SortOptions/SortOptions';
import { Feed } from './Features/Feed/Feed';

function App() {
    return (
      <div  className="App">
          <NavigationBar />
          <div className='application-wrapper'>
            <LineSpacer />
            <BrowserRouter>
              <Routes>
                <Route element={<Feed />} path='/*' />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    );
}

export default App;
