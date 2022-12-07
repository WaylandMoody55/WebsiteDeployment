import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Inventory from './components/Inventory';
import ViewEditMenu from './components/ViewEditMenu';
import ManagerSide from './components/ManagerSide';
import ServerSide from './components/ServerSide';
import Login from './components/Login';
import RestockReport from './components/RestockReport';
import ExcessReport from './components/ExcessReport';
import PairSales from './components/PairSales';
import SalesReport from './components/SalesReport';
import CustomerSide from './components/CustomerSide';

import { createContext } from "react";
import { useState } from 'react';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
  
    <div className="App" id={theme}>
    <div className="switch">
      <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
    <ReactSwitch onChange={toggleTheme} checked={theme==="dark"} />
    </div>
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path = '/ManagerSide' element ={<ManagerSide/>}/>
            <Route path='/Inventory' element={<Inventory/>}/>
            <Route path='/ViewEditMenu' element={<ViewEditMenu/>}/>
            <Route path='/ServerSide' element={<ServerSide/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/RestockReport' element={<RestockReport/>}/>
            <Route path='/ExcessReport' element={<ExcessReport/>}/>
            <Route path='/PairSales' element={<PairSales/>}/>
            <Route path='/SalesReport' element={<SalesReport/>}/>
            <Route path='/CustomerSide' element = {<CustomerSide/>}/>
          </Routes>
        </BrowserRouter>
      </>
    </div>
    </ThemeContext.Provider>
  );
  
}

export default App;
