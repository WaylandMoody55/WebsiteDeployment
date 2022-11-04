import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Inventory from './components/Inventory';
import ViewEditMenu from './components/ViewEditMenu';
import ManagerSide from './components/ManagerSide';
import RestockReport from './components/RestockReport';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Inventory' element={<Inventory/>}/>
            <Route path='/ViewEditMenu' element={<ViewEditMenu/>}/>
            <Route path='/RestockReport' element={<RestockReport/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/ManagerSide' element={<ManagerSide/>}/>
          </Routes>
        </BrowserRouter>
      </>

    </div>
  );
}

export default App;
